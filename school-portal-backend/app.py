from flask import Flask, jsonify, request, session, render_template, make_response
import database
from datetime import date
from random import randint

# cors
from flask_cors import CORS
# import pdfkit

# for pdf
from flask_weasyprint import HTML, render_pdf

# password authentication
from passlib.apps import custom_app_context as pwd_context
from flask_httpauth import HTTPBasicAuth
db = database.db

# for email
import os, smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
# from email.mime.image import MIMEImage
from email.mime.application import MIMEApplication
from email import encoders 


# app
app = Flask(__name__) 

app.secret_key = '5472164d3d4db1c5ec81aadf437ca23992b1caf8d44d581de31fc8de22c5'

cors = CORS(app, resources={r'/*': {'origins': '*'}})

auth = HTTPBasicAuth()

# app root dir
app_root = os.path.dirname(os.path.abspath(__file__))

# collections
users = db["users"]


def generateUserId(firstName, surName):
    rand = randint(1000, 9999)
    userId = f"{surName}{firstName}{rand}"
    return userId

def hash_password(password):
    return pwd_context.encrypt(password)


@auth.verify_password
def verify_password(email, password):
    user = users.find_one({"email":email})
    if user:
        hashed_password = user["password"]
        verified = pwd_context.verify(password, hashed_password)

        if verified == True:
            return True
        else:
            return False

@app.route("/", methods=['GET'])
def home():
    return jsonify(
        { 
            "registration" : {
                "route": "/registration",
                "inputs": ['firstname', 'surname', 'email', 'phone', 'password'],
                "output": {"status": True, "message": "Registration successful", "data": 'user_data'}
            },

            "login" : {
                "route": "/login",
                "inputs": ['email', 'password'],
                "output": {"status": True, "message": "login successful", "data": 'user_data'}
            },

            "upload_result" : {
                "route": "/uploadresult",
                "inputs": ['email', 'waec/neco', 'jamb' ],
                "output": {"status": True, "message": "results submitted successfully", "data": 'user_data'}
            },

        }
    )

# REGISTRATION
@app.route("/registration", methods=['POST'])
def registration():
    try:
        firstName = request.json['firstname']
        surName = request.json['surname']
        phoneNumber = request.json['phone']
        email = request.json['email']
        password = request.json['password']

        email_exists = users.find_one({"email": email})
        number_exits = users.find_one({"phone":phoneNumber})

        if email_exists is not None :
            return jsonify({"status": False, "message": "this email has already been used", "data": None})
        elif number_exits is not None:
            return jsonify({"status": False, "message": "this number has already been used", "data": None})
        else:
            UserId = generateUserId(firstName, surName)
            hashed_password = hash_password(password)
            user = {
                "_id": UserId,
                "firstname": firstName,
                "surname": surName,
                "phone" : phoneNumber,
                "email": email,
                "password" : hashed_password
                }


            users.insert_one(user)

            return jsonify({"status": True, "message": "Registration successful", "data": user})
    except Exception as err:
        print(err)
        return jsonify({"status": False, "message": "An error Occurred", "data": None})



# LOGIN
@app.route("/login", methods=['POST'])
def login():
    try:
        email = request.json['email']
        password = request.json['password']

        loginDetails = {
            "email": email,
            "password": password
        }
        user = users.find_one({"email": email})
        if user is not None:

            isVerified = verify_password(email, password)
            
            # isVerified = (password == user["password"])

            session["user"] = user['_id']
            if isVerified == True:
                return jsonify({"status": True, "message": "user logged in successsfully", "data": user})
            else:
                return jsonify({"status": False, "message": "user not found check login details", "data": user})
        else:
            return jsonify({"status": False, "message": "user doesn't exist, check login details", "data": loginDetails})
    except Exception as err:
        return jsonify({"status": False, "message": "An error Occurred", "data": None})




# result api
@app.route('/uploadresult' , methods = ['POST'])
def uploadresult():
    try:
        email = request.json['email']
        result = request.json['result']

        user = users.find_one({'email': email})

        if user is not None:
            users.update_one({'email': email}, {'$set': {"olevel_result": result}})

            return jsonify({"status": True, "message": "result submitted successfully", "data": users.find_one({'email' : email}) })
        else:
            return jsonify({"status": False, "message": "User was not found", "data": None})
    
    except Exception as err:
        print(err)
        return jsonify({"status": False, "message": "An error Occurred", "data": None})



# LOGOUT
@app.route('/logout')
def logout():
    session.pop("user", None)
    return jsonify({'status': True, 'message': 'Logout Successful', 'data': None})


# SELECT PROGRAM
@app.route('/selectprogram', methods = ['POST'])
def selectProgram():
    try:
        email = request.json['email']
        selected_program = request.json['program']

        user = users.update_one({'email': email}, {"$set" : {'program': selected_program}})

        return jsonify({"status": True, "message": "program submitted successfully", "data": users.find_one({'email': email}) })
    except Exception as err:
        print(err)
        return jsonify({"status": False, "message": "An error Occurred", "data": None})



# UPDATE PAYMENT
@app.route('/updatepayment', methods = ['POST'])
def updatepayment():
    try:
        email = request.json['email']
        reference = request.json['reference']

        user = users.update_one({'email': email}, {"$set" : {'payment': reference}})


        return jsonify({"status": True, "message": "payment updated successfully", "data": users.find_one({'email': email}) })
    except Exception as err:
        print(err)
        return jsonify({"status": False, "message": "Failed to update payment details", "data": None})


# UPDATE BIO
@app.route('/uploadbio', methods = ['POST'])
def uploadbio():
    try:
      
      email = request.json['email']
      biodata = request.json['biodata']
      
      users.update_one({'email': email}, {"$set": {'biodata' : biodata}})

      return jsonify({"status": True, "message": "biodata uploaded successfully", "data": users.find_one({'email': email}) })
    except Exception as err:
        print(err)
        return jsonify({"status": False, "message": "An error Occurred", "data": None})



# UPLOAD USER PASSPORT
@app.route('/uploadpassport', methods = ['POST'])
def uploadpassport():
    try:

      email = request.json['email']
      passport_details = request.json['passport_details']

      user = users.find_one({'email': email})

      users.update_one({'email': email}, {'$set': {'image': passport_details}})
      # target = os.path.join(app_root, 'static/uploads/')
      # if not os.path.isdir(target):
      #     os.mkdir(target)
      # if request.method == 'POST':
        
      #   UserId = request.form.get('userId')
      #   passport = request.files.get('image')
      #   imagetype = request.form.get('type')

      #   if imagetype == 'image/jpeg':
      #       filename = f'{UserId}.jpg'
      #   else:
      #       filename = f'{UserId}.png'

      #   destination = '/'.join([target, filename])

      #   if passport:
      #      passport.save(destination)

      #      users.update_one({'_id': UserId }, {'$set': {'image': filename}})
      
      return jsonify({'status': True, 'message': 'passport details saved', 'data': None})

    except Exception as err:
        print(err)
        return jsonify({"status": False, "message": err, "data": None})


# GENERATE PDF FILE WITH WEASY-PRINT
def getpdf(email):
   user = users.find_one({'email': email})
   olevel_result = user['olevel_result']
   
   for key in olevel_result:
    if key == 'WAEC':
      exam = key
    elif key == 'NECO':
      exam = key

    html = render_template('pdf.html',

            firstname = user['firstname'],
            surname = user['surname'],
            email = email,
            phone = user['phone'],
            img = user['image']['secure_url'],
            biodata = user['biodata'],
            exam = exam,
            olevel_result = olevel_result,
            jamb = user['olevel_result']['jamb']
    )
    pdf = HTML(string=html).write_pdf()
    return pdf



# SEND PDF TO CLIENT
@app.route('/generatepdf', methods = ['POST'])
def generatePdf():
    try:
      email = request.json['email']

      pdf = getpdf(email)

      response = make_response(pdf)
      response.headers['Content-Type'] = 'application/pdf'
      response.headers['Content-Disposition'] = 'inline; filename=details.pdf'

      return response

       
    except Exception as err:
        print(err)
        return jsonify({"status": False, "message": "failed to generate pdf", "data": None})


# SEND MAIL WITH ATTACHMENT
@app.route('/sendmail', methods = ['POST'])
def sendMail():

    email = request.json['email']

    user = users.find_one({'email': email})

    firstname = user['firstname']
    surname = user['surname']
    message = "this is a test email"
    filename = f'{firstname}{surname}.pdf'



    pdf = getpdf(email)

    
    sender = 'School' 
    receiver = email
    subject = 'Your School Application'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = receiver

    html = """
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      table, td { color: #000000; } @media only screen and (min-width: 520px) {
  .u-row {
    width: 500px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 500px !important;
  }

}

@media (max-width: 520px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

</style>
  
  

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div>
    <h1>School application Notification</h1>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div>
    <p>Dear """ f"{surname} {firstname}" """,</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">This email was sent in response to your application to our prestigous school.</p>
<p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
<p style="font-size: 14px; line-height: 140%;">Find attached the details you submitted in your application</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>

    """
    # part1 = MIMEText(text, 'plain')

    # file_path = f"{directory}/pdf_files/{filename}"
    try:


# REMINDER: add ssl for smtp
        if user and pdf:
          
            attachedfile = MIMEApplication(pdf, _subtype = "pdf", _encoder = encoders.encode_base64)
            attachedfile.add_header('content-disposition', 'attachment', filename = f"{filename}")
            msg.attach(attachedfile)

        part2 = MIMEText(html, 'html')

        msg.attach(part2)
        
        mail = smtplib.SMTP("smtp.mailtrap.io", 2525)
        mail.ehlo()
        mail.starttls()
        mail.login(os.environ.get('MAILTRAP_USERNAME'), os.environ.get('MAILTRAP_TOKEN'))
        mail.sendmail(sender, receiver, msg.as_string())
        mail.quit()

        if mail:
            return jsonify({"message": "success", "status": True})
        else:
            return jsonify({"message": "mail failed", "status": False})
    except smtplib.SMTPAuthenticationError:
        return jsonify({"message": "network connection lost!", "status": False})



if __name__ == "__main__":
    app.run(debug = True)