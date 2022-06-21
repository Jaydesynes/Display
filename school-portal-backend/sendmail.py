from app import app, api
from flask_restful import Resource, Api, reqparse
import os, smtplib, requests
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.application import MIMEApplication
from email import encoders



def send_mails(sender, receiver, subject, action, message, link="#", directory=None, filenames=None):
    sender = sender
    receiver = receiver
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = receiver

    # text = "Hi how are you"
    html = """
    <head>
         
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />         
      <meta name="viewport" content="width=device-width, initial-scale=1">
         
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <style type="text/css">
        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }

        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }

        img {
          -ms-interpolation-mode: bicubic;
        }

        /* RESET STYLES */
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }

        table {
          border-collapse: collapse !important;
        }

        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }

        /* GMAIL BLUE LINKS */
        u+#body a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }

        /* SAMSUNG MAIL BLUE LINKS */
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }

        /* These rules set the link and hover states, making it clear that links are, in fact, links. */
        /* Embrace established conventions like underlines on links to keep emails accessible. */
        a {
          color: #4ab1b9;
          font-weight: 600;
          text-decoration: underline;
        }

        a:hover {
          color: #333333 !important;
          text-decoration: none !important;
        }

        /* These rules adjust styles for desktop devices, keeping the email responsive for users. */
        /* Some email clients don't properly apply media query-based styles, which is why we go mobile-first. */
        @media screen and (min-width:600px) {
          h1 {
            font-size: 48px !important;
            line-height: 48px !important;
          }

          .intro {
            font-size: 24px !important;
            line-height: 36px !important;
          }
        }
      </style>
        </head>
     

    <body style="margin: 0 !important; padding: 0 !important;">

      <!-- Some preview text. -->
      <div style="display: none; max-height: 0; overflow: hidden;">

      </div>
      <div style="display: none; max-height: 0px; overflow: hidden;">
        &nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
      </div>
      <div role="article" aria-label="An email from Tolemsoft Technologies" lang="en" style="background-color: white; color: #2b2b2b; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 18px; font-weight: 400; line-height: 28px; margin: 0 auto; max-width: 600px; padding: 40px 20px 40px 20px;">

        <header>
          <a href="https://safepay.instantdeposit.africa/" style="text-decoration: none;">
            <center><img src="cid:image1" width="50%"></center>
          </a>
        </header>
        <main>
          <div style="background-color: rgb(166,166,166); border-radius: 12px; padding: 48px;">

            <p style="font-size: 20px; margin-top: 0; margin-bottom: 24px; text-align: center;"><h4 style="background: #4ab1b9; border-radius: 13px; color:#F9F9F9; display: block; margin: 0 auto; max-width: 340px; padding: 24px 36px; text-align: center;"><a href=""" +'{}'.format(link) + """ style="text-decoration: none;">""" + ' {}'.format(action) + """</a></h4></p>

            <p style="text-align: center;">
              Details 
            </p>

            <p>
              """ + ' {}'.format(message) + """ 
            </p>

            <p style="font-size: 15px; margin-bottom: 0px;">
              If you think this email was sent in error, please <a href="https://safepay.instantdeposit.africa/contact" style="text-decoration: none;">visit our help desk</a> or send email to <a href="mailto:safepay@instantdeposit.africa" style="text-decoration: none;">contact support</a>. Thank you!
            </p>
          </div>
        </main>

        <footer style=" padding: 0px 20px;">
          <p style="font-size: 14px; font-style: italic; font-weight: 400; line-height: 24px; margin-top: 48px; margin-bottom: 24px;">
            You received this email because your account was used to subscribe to one of the services offered by Instant Deposit Ltd.
          </p>
          <address style="font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px;">
            <strong style="color: #888888;">Instant Deposit Ltd.</strong><br/> Enugu Lifestyle and Golf City,<br/> KM 7, Enugu-Port Harcourt Express Way,<br/> Enugu State, Nigeria.
          </address>
        </footer>

      </div>
    </body>
    """
    # part1 = MIMEText(text, 'plain')
    try:
        if directory and filenames:
          file_names = filenames.split(",")
          for filenamee in file_names: 
            file_path = f"{directory}/{filenamee}"
            with open(file_path, "rb") as opened:
                openedfile = opened.read()
            attachedfile = MIMEApplication(openedfile, _subtype = "pdf", _encoder = encoders.encode_base64)
            attachedfile.add_header('content-disposition', 'attachment', filename = f"{filenamee}")
            msg.attach(attachedfile)

        part2 = MIMEText(html, 'html')

        msg.attach(part2)
        fp = open('app/static/img/idl_logo.jpeg', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<image1>')
        msg.attach(msgImage)
        mail = smtplib.SMTP('smtp.gmail.com', 587)
        mail.ehlo()
        mail.starttls()
        mail.login(os.environ.get('MAIL_USERNAME'), os.environ.get('MAIL_TOKEN'))
        mail.sendmail(sender, receiver, msg.as_string())
        mail.quit()

        if mail:
            return {"message": "success", "status": True}
        else:
            return {"message": "mail failed", "status": False}
    except smtplib.SMTPAuthenticationError:
        return {"message": "network connection lost!", "status": False}


#api for sending mail from SafePAY
class SafePAYMailer(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('receiver', 
                    type=str,
                    required=True,
                    help="Enter Receiver's email address and field cannot be left blank")
    parser.add_argument('subject', 
                    type=str,
                    required=True,
                    help="Enter Subject of loginthe mail and field cannot be left blank")
    parser.add_argument('action', 
                    type=str,
                    required=True,
                    help="Enter Caption/action in the email and field cannot be left blank")
    parser.add_argument('link', 
                    type=str,
                    help="Enter link for the action and field can be left blank")
    parser.add_argument('message', 
                    type=str,
                    required=True,
                    help="Enter Message of the email and field cannot be left blank")
    parser.add_argument('directory', 
                    type=str,
                    help="Enter File_path of the email and field cannot be left blank")
    parser.add_argument('filenames', 
                    type=str,
                    help="Enter File_path of the email and field cannot be left blank")

    def post(self):
        data = SafePAYMailer.parser.parse_args()
        email_addresses = data['receiver'] #comma-separated emails
        subject = data['subject']
        action = data['action']
        link = data['link'] if data.get('link') else "#"
        directory = data['directory'] if data.get('directory') else None
        filenames = data['filenames'] if data.get('filenames') else None
        message = data['message']
        receivers = email_addresses.split(",") 
        status = {}
        for receiver in receivers:
          mailer = send_mails(sender="SafePAY", receiver=receiver, subject=subject, action=action, message=message, link=link, directory=directory, filenames=filenames)
          status[receiver]=mailer
        return {"status":True, "message":"sending completed", "data":status}
api.add_resource(SafePAYMailer, '/api/v1/safepay/mailer')
