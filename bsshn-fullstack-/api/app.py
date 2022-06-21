from flask import Response
import radiology
# import job_que
from flask import Flask, make_response, jsonify, request, session
import database
from datetime import date
from random import randint
# cors
from flask_cors import CORS
from passlib.apps import custom_app_context as pwd_context
from flask_httpauth import HTTPBasicAuth

import uuid
import jwt

auth = HTTPBasicAuth()

app = Flask(__name__, static_folder="../build", static_url_path="/")
# app = Flask(__name__)

app.secret_key = '049f12b15d2f707e47da7d6a4fe2c72a27b72cb108a0bb'
cors = CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})

db = database.db

# today
today = str(date.today())

# J O S H U A ============================================
# collections
patients = db["patients"]
users = db["users"]
invoices = db["invoices"]
invoiceByDate = db["invoice_by_date"]
paidInvoices = db["paid_invoices"]
laboratoryCollection = db["laboratory"]
admissions = db["admissions"]
pharmacyCollection = db["pharmacy"]
consultations = db["consultation"]
vitalsCollection = db["vitals"]
inPatient = db["in_patient"]
radiology  = db["radiology"]



@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def handleErrors(e):
    return app.send_static_file('index.html')

@app.route("/verify", methods=["POST"])
def verify():
    patientId = request.json['patientId']
    user = request.json['userId']
    y = users.find_one({"_id": user})
    patients = y["patients"]
    if str(patientId) in patients:
        return jsonify({"status": True, "message": "Patient Available", "data": patientId})
    # services = y['services']
    # for service in services:
    #     # print(services[service])
    #     if service == "001":
    #         print(services[service])

    #         if patientId in services[service]:
    #           return jsonify({"status": True, "message": "Patient Available", "data": patientId})  

    else:
        return jsonify({"status": False, "message": "Patient Unavailable", "data": None})


@app.route("/queue", methods=["POST"])
def queue():
    user = request.json["userId"]

    Users = users.find_one({"_id": user})

    services = Users['services']

    return jsonify(services)


# vitals api
@app.route("/vitals", methods=["POST"])
def vitals():
    try:
        user = request.json["userId"]
        patientId = int(request.json["patientId"])
        height = request.json["height"]
        weight = request.json["weight"]
        bmi = request.json["bmi"]
        respiration = request.json["respiration"]
        bp = request.json["bp"]
        temperature = request.json["temperature"]
        pulse = request.json['pulse']
        invoice = request.json['invoice']
        vitals = {
            "height": height,
            "weight": weight,
            "bmi": bmi,
            "respiration": respiration,
            "bp": bp,
            "temperature": temperature,
            "pulse": pulse
        }
        vitalsData = {
            "_id": invoice,
            "patientId": patientId,
            "user": user,
            "height": height,
            "weight": weight,
            "bmi": bmi,
            "respiration": respiration,
            "bp": bp,
            "temperature": temperature,
            "pulse": pulse,
            "date": today
        }

        

        # selectedInvoice = invoices.find_one({"_id": invoice})
        # print(selectedInvoice['services'])

        # this line is ought to update service status on the invoice....
        # invoices.update_one({"_id": invoice}, {"$set": {"services.vitals": 1}})
        try:
            vitalsCollection.insert_one(vitalsData)
        except:
            return jsonify({"status": False, "message": "Data Exists Already"})

         # this part deletes patient from the queue
        user_found = users.find_one({'_id':user})
        patients_queued = user_found["patients"]
        print(patients_queued)
        user_found["patients"].remove(patientId)
        print(patients_queued)
        users.update_one({"_id": user}, {
                        "$set": {"patients": patients_queued}})

        patients.update_one({"_id": int(patientId)}, {"$set": {"vitals": vitals}})
        patient = patients.find_one({"_id": patientId})
        return jsonify({"status": True, "message": "Vitals Successfully Added", "data": patient})
    except BaseException as err:
        return jsonify({"status": False, "message": err, "data": None})


@app.route("/admission", methods=["POST"])
def admission():
    try:
        isFound = False
        user = request.json["userId"]
        patientId = int(request.json["patientId"])
        invoice = request.json["invoice"]
        wardNumber = request.json["wardNumber"]
        bedNumber = request.json["bedNumber"]
        isDischarged = request.json['discharged']
        remarks = request.json['remark']

        # verifying patient_id, invoice _id and user_id
    # if invoices.get(invoice)['status'] and verify(patientId)['status']:
        ward = {
            "wardNumber": wardNumber,
            "bedNumber": bedNumber
        }
        patients.update_one({"_id": patientId}, {"$set": {"admission": {
                            "ward": ward, "isDischarged": isDischarged, "remarks": remarks, "date": today}}})
        admission = {
            "patientId":patientId,
            "ward": ward,
            "isDischarged": isDischarged,
            "remarks": remarks
        }                        
        admissionData = {
            "_id": invoice,
            "patientId":patientId,
            "ward": ward,
            "isDischarged": isDischarged,
            "remarks": remarks
        }

        
        try:
            admissions.insert_one(admissionData)
        except:
            return jsonify({"status": False, "message": "Data Exists Already"})

        # this part deletes patient from the queue
        user_found = users.find_one({'_id': int(user)})
        patients_queued = user_found["patients"]
        print(patients_queued)
        print(patientId)
        user_found["patients"].remove(str(patientId))
        print(patients_queued)
        users.update_one({"_id": user}, {
                        "$set": {"patients": patients_queued}})

        # invoices.update_one({"_id": invoice}, {
        #                     "$set": {"services.admission": 1}})
        finalInvoice = invoices.find_one({"_id": str(invoice)})
        return jsonify({"status": True, "message": "Admission Successful", "data": finalInvoice})

    
    except:
        return jsonify({"status": False, "message": "Error"})


# pharmacy
@app.route("/pharmacy", methods=["POST"])
def pharmacy():
    try:
        user = request.json["userId"]
        patientId = request.json["patientId"]
        invoice = request.json['invoice']
        medicationName = request.json["medication"]
        dosage = request.json['dosage']
        duration = request.json['duration']
        remark = request.json['remark']

        medication = {
            "medicationName": medicationName,
            "dosage": dosage,
            "duration": duration,
            "remark": remark,
            "date-issued": today
        }
        medicationData = {
            "_id": invoice,
            "user": user,
            "medicationName": medicationName,
            "dosage": dosage,
            "duration": duration,
            "remark": remark,
            "date-issued": today
        }

        # selectedInvoice = invoices.find_one({"_id":invoice})
        invoices.update_one({"_id": invoice}, {
                            "$set": {"medications": [medication]}})
        try:
            pharmacyCollection.insert_one(medicationData)
        except:
            return jsonify({"status": False, "message": "Data Exists Already"})


        invoices.update_one({"_id": invoice}, {
                            "$set": {"services.pharmacy": 1}})
        
        # this part deletes patient from the queue
        user_found = users.find_one({'_id':user})
        patients_queued = user["patients"]
        print(patients_queued)
        user_found["patients"].remove(patientId)
        print(patients_queued)
        users.update_one({"_id": user}, {
                        "$set": {"patients": patients_queued}})

        finalInvoice = invoices.find_one({"_id": invoice})
        patients.update_one({"_id": int(patientId)}, {
                            "$set": {"medication": medication}})

        return jsonify({"status": True, "message": "Drugs dispensed successfully", "data": finalInvoice})
    except:
        return jsonify({"status": 400, "message": "Error"})


@app.route("/routes", methods=["GET"])
def items():
    me = {
        'vitals': {
            'url': 'https://bsshn.herokuapp.com/vitals',
            'inputs': ['patientId', 'userId', 'invoice', 'height', 'weight', 'bmi', 'respiration', 'bp', 'temperature', 'pulse'],
            'output': {"status": True, "message": "Vitals Successfully Added", "data": "patient"},
            'method': 'POST'
        },
        'admission': {
            'url': 'https://bsshn.herokuapp.com/admission',
            'inputs': ['patientId', 'userId', 'invoice', 'wardNumber', 'bedNumber', 'discharged', 'remark'],
            'output': {"status": True, "message": "Admission Successful", "data": 'finalInvoice'},
            'method': 'POST'
        },
        'pharmacy': {
            'url': 'https://bsshn.herokuapp.com/pharmacy',
            'inputs': ['patientId', 'userId', 'invoice', 'medication', 'dosage', 'remark'],
            'output': {"status": True, "message": "Drugs dispensed successfully", "data": 'finalInvoice'}
        },
        'verify': {
            'url': 'https://bsshn.herokuapp.com/verify',
            'inputs': ['patientId', 'userId'],
            'output': {"status": True, "message": "Patient Available", "data": 'person'},
            'method': 'POST'
        },
        'consultation': {
            'url': 'https://bsshn.herokuapp.com/consultation',
            'inputs': ['patientID', 'userId', 'observation', 'prescription', 'treatment', 'notes'],
            'output': {"status": True, "message": "Consultation Added successfully", "data": "Patient Consulation Data"},
            'method': 'POST'
        },
        'in-patient-services': {
            'url': 'https://bsshn.herokuapp.com/in-patient-services',
            'inputs': ['patientID'],
            'output': {"status": True, "message": "In-Patient Service Added successfully", "data": "inpatient data"},
            'method': 'POST'
        },
        'check patient': {
            'url': 'https://bsshn.herokuapp.com/checkpatient',
            'inputs': ['patientID'],
            'output': {"status": True, "message": "Consultation Added successfully", "data": "Patient Consulation Data"},
            'method': 'POST',
            'description': 'searches if the patient Id exists',
        },
        'billing': {
            'url': 'https://bsshn.herokuapp.com/billing',
            'inputs': ['patientId', 'amount','selectedServices','notes' ],
            'output': {"status": True, "message": "In-Patient Service Added successfully", "data": 'billing details'},
            'method': 'POST',
        },
        'getinvoice': {
            'url': 'https://bsshn.herokuapp.com/payment/getinvoice',
            'inputs': ['patientID', 'amount', ],
            'output': {"status": True, "message": "In-Patient Service Added successfully", "data": 'billing details'},
            'method': 'POST',
        },
        'updatepayment': {
            'url': 'https://bsshn.herokuapp.com/payment/updatepayment',
            'inputs': ['invoice_number'],
            'output': {"status": True, "message": "updated payment successfully", "data": 'invoice details'},
            'method': 'POST',
        },
        'laboratory': {
            'url': 'https://bsshn.herokuapp.com/laboratory',
            'inputs': ['patientId', "investigation", "invoice_number", "service_description", "result", "remarks"],
            'output': {"status": True, "message": "lab data submitted", "data": 'patient lab data'},
            'method': 'POST',
        },
        'booking verify': {
            'url': 'https://bsshn.herokuapp.com/booking/verify',
            'inputs': ['invoice'],
            'output': {"status": True, "message": "booking verified", "data": 'patient data and payment status'},
            'method': 'POST',
        },
        'booking': {
            'url': 'https://bsshn.herokuapp.com/booking',
            'inputs': ['service_id', 'patientId'],
            'output': {"status": True, "message": "booking details"},
            'method': 'POST',
        },
        'radiology': {
            'url': 'https://bsshn.herokuapp.com/radiology',
            'inputs': ['notes', 'patientId', 'userId', 'serviceId'],
            'output': {"status": True, "message": "File uploaded", "data": "patient radiology data"},
            'method': 'POST',
        },
        'check': {
            'url': 'https://bsshn.herokuapp.com/check',
            'inputs': ['phone_number'],
            'output': {"status": True, "message": "phone number found", "data": "patient phone number"},
            'method': 'POST',
        },
        'registration': {
            'url': 'https://bsshn.herokuapp.com/registration',
            'inputs': ['surname', 'other_name', 'age', 'gender', 'occupation', 'phone', 'home_address', 'state', 'emergency_name', 'emergency_contact'],
            'output': {"status": True, "message": "registration successful", "data": "patient data"},
            'method': 'POST',
        },
        'walkin': {
            'url': 'https://bsshn.herokuapp.com/walkin',
            'inputs': ['patientId', 'investigation_entry', 'service_des', 'result', 'remark', 'invoice'],
            'output': {"status": True, "message": "Successful", "data": "patient data"},
            'method': 'POST',
        }

    }
    return me


# A B E L ======================================

@app.route('/consultation', methods=["POST"])
def consultation():
    try:
        patientId = request.json['patientId']
        user = request.json['userId']
        patient = patients.find_one({"_id": patientId})
        observation = request.json["observation"]
        prescription = request.json["prescription"]
        treatment = request.json["treatment"]
        notes = request.json["notes"]
        invoice = request.json["invoice"]

        consultationData = {
            '_id': patientId,
            'user': user,
            'observation': observation,
            'prescription': prescription,
            'treatment': treatment,
            'notes': notes
        }

        
        try:
            # invoices.update_one({"_id": invoice}, {
            #                     "$set": {"services.consulation": 1}})

            consultations.insert_one(consultationData)
        except:
            consultations.update_one({"_id": patientId}, {
                                     "$set": consultationData})
        


        invoiceUpdate = patients.update_one(
            {'_id': patientId}, {"$set": {"consultation": {
                'observation': observation,
                'prescription': prescription,
                'treatment': treatment,
                'notes': notes,
                'date': today
            }
            }
            })

        # updating invoice
        invoices.update_one({"_id": invoice}, {
                            "$set": {"services.consultation": 1}})


        # this part deletes patient from the queue
        user_found = users.find_one({'_id':user})
        patients_queued = user_found["patients"]
        print(patients_queued)
        user_found["patients"].remove(patientId)
        print(patients_queued)
        users.update_one({"_id": user}, {
                        "$set": {"patients": patients_queued}})
        return jsonify({"status": True, "message": "Consultation Added successfully", "data": "done"})
    except BaseException as err:
        return jsonify({"status": False, "message": err})


# in-patient-services
@app.route('/in-patient-services', methods=["POST"])
def inPatientServices():
    try:
        patientId = request.json["patientId"]
        inPatientServices = request.json["in_patient_services"]
        user = request.json["userId"]
        invoice = request.json["invoice"]

        patients.update_one(
            {'_id': patientId}, {"$set": {'inPatientServices': inPatientServices}})


        # this part deletes patient from the queue
        user_found = users.find_one({'_id':user})
        patients_queued = user_found["patients"]
        print(patients_queued)
        user_found["patients"].remove(patientId)
        print(patients_queued)
        users.update_one({"_id": user}, {
                        "$set": {"patients": patients_queued}})
        patient = patients.find_one({"_id": patientId})

        return jsonify({"status": True, "message": "In-Patient Service Added successfully", "data": patient["inPatientServices"]})
    except BaseException as err:
        return jsonify({"status": False, "message": err})

# L U C K Y ==================================================
# check for patient


@app.route('/checkpatient', methods=['GET', 'POST'])
def checkPatient():
    try:
        patientId = request.json["patientId"]
        patientFound = False
        data = patients.find_one({'_id': int(patientId)})

        if data is not None:
            patientFound = True

        if patientFound:
            return jsonify({"status": True, "message": "patient found", "data": data})
        else:
            return jsonify({"status": False, "message": "patient not found", "data": None})

    except:
        return jsonify({"status": False, "message": 'could ', "data": None})

# generate random invoice number
def invoiceGen(patientId):
    rand = randint(100, 350)
    invoice = f"{patientId}{rand}{patientId}"
    return invoice


# billing
@app.route('/billing', methods=['POST'])
def billing():
    try:
        patientId = request.json['patientId']
        selected_services = request.json['selectedServices']
        amount = request.json['amount']
        notes = request.json['notes']
        invoice_number = invoiceGen(patientId)


        # attaching used/unused status to services with registration being always used
        service_dict = {}

        for service in selected_services:
            if service == "registration":
                service_dict[service] = 1
            else:
                service_dict[service] = 0
        

        payment_doc = {
            "_id": invoice_number,
            "patient_number": patientId,
            "services": service_dict,
            "amount": amount,
            "paid": False,
            "notes": notes,
            "date": today
        }
        # add to invoice collection
        invoices.insert_one(payment_doc)

        # add to patient data the invoice number
        patients.update_one({"_id": int(patientId)}, {
                            "$push": {"invoices": invoice_number}})

        checkdate = invoiceByDate.find_one({"_id": today})

        if checkdate == None:
            # create new date and append invoice
            invoiceByDate.insert_one({"_id": today, "invoice_list": [invoice_number]})

            return jsonify({"status": True, "message": "data submitted and invoice generated successfully", "data": invoiceByDate.find_one({"_id": today})})

        else:
            # add invoice to existing current date
            invoiceByDate.update_one({"_id": today}, {"$push": {"invoice_list": invoice_number}} )

            return jsonify({"status": True, "message": "data submitted and invoice generated successfully", "data": invoice_number})

    except Exception as err:
        return jsonify({"status": False, "message": err, "data": None})


# payment
@app.route('/payment/getinvoice', methods=['POST'])
def getInvoices():
    try:
        invoice_number = request.json["invoice"]

        invoice = invoices.find_one({"_id": invoice_number})

        if invoice == None:
            return jsonify({"status": False, "message": "invoice not found", "data": None})
        else:
            return jsonify({"status": True, "message": "invoice found", "data": invoice})

    except:
        return jsonify({"status": False, "message": "an error occured", "data": None})


@app.route('/payment/updatepayment', methods=['POST'])
def updatepayment():
    try:
        invoice_number = request.json["invoice"]

        invoices.update_one({"_id": invoice_number}, {"$set": {"paid": True}})

        invoice = invoices.find_one({"_id": invoice_number})

        # check if date exists
        checkdate = invoiceByDate.find_one({"_id": today})

        if checkdate == None:
            # create today's date
            paidInvoices.insert_one({"_id": today, "invoices": [invoice_number]})
            return jsonify({"status": True, "message": "updated payment successfully", "data": invoice})
        else:
            # add to today's date
            paidInvoices.update_one({"_id": today}, {"$push": {"invoices": invoice_number} })
            return jsonify({"status": True, "message": "updated payment successfully", "data": invoice})

    except Exception as err:
        return jsonify({"status": False, "message": err, "data": None})


# laboratory
@app.route('/laboratory', methods=['POST'])
def laboratory():
    try:
        investigation = request.json["investigation"]
        invoice_number = request.json["invoice_number"]
        patient_number = request.json["patientId"]
        service_description = request.json["service_description"]
        result = request.json["result"]
        remarks = request.json["remarks"]
        user = request.json["userId"]

        labDoc = {
            "_id": patient_number,
            "invoice_number": invoice_number,
            "investigation": investigation,
            "service_description": service_description,
            "result": result,
            "remarks": remarks,
            "date": today
        }

        labDocToPatient = {
            "invoice_number": invoice_number,
            "investigation": investigation,
            "service_description": service_description,
            "result": result,
            "remarks": remarks,
            "date": today
        }
        # find date
        findDateInLab = laboratoryCollection.find_one({"_id": today})

        if findDateInLab is not None:
            # updates list for current day if the date exists
            laboratoryCollection.update_one(
                {"_id": today}, {"$push": {"day_list": labDoc}})

        else:
            # creates new date if current date doesn't exist
            laboratoryCollection.insert_one(
                {"_id": today, "day_list": [labDoc]})

        # this part deletes patient from the queue
        user_found = users.find_one({'_id':user})
        patients_queued = user["patients"]
        print(patients_queued)
        user_found["patients"].remove(patient_number)
        print(patients_queued)
        users.update_one({"_id": user}, {
                        "$set": {"patients": patients_queued}})

        # add lab record to patient data
        patients.update_one({"_id": int(patient_number)}, {
                            "$push": {f"laboratory.{today}": labDocToPatient}})

        # set lab code as used on invoice collection
        invoices.update_one({"_id": invoice_number}, {
                            "$set": {"services.laboratory": 1}})

        return jsonify({"status": True, "message": "lab data submitted", "data": labDoc})
    except Exception as err:
        return jsonify({"status": False, "message": err, "data": None})

# M A K P L A N G ==============================
@app.route("/radiology", methods=["POST"])
def radiologyfunc():
    try:
        request_data = request.get_json()
        notes = request_data["notes"]
        patient_no = request_data["patientId"]
        user_id = request_data["userId"]
        service_id = request_data["service_id"]
        invoice = request_data["invoice"]

        radiology_data = {
            '_id': invoice,
            'patientId': patient_no,
            'userId': user_id,
            'serviceId': service_id,
            'invoice': invoice,
            'note': notes
        }
        radiology_data_update = {
            'patientId': patient_no,
            'userId': user_id,
            'serviceId': service_id,
            'invoice': invoice,
            'note': notes
        }
        try:
            radiology.insert_one(radiology_data)
        
        except:
            return jsonify({"status": False, "message": "Data Exists Already"})


        # this part deletes patient from the queue
        user = users.find_one({'_id':user_id})
        patients_queued = user["patients"]
        print(patients_queued)
        user["patients"].remove(patient_no)
        print(patients_queued)
        users.update_one({"_id": user_id}, {
                        "$set": {"patients": patients_queued}})

        invoices.update_one({"_id": invoice}, {
                            "$set": {"services.radiology": 1}})
        patients.update_one({"_id": int(patient_no)}, {"$set": {"radiology": radiology_data_update}})
        return jsonify({"status": True, "message": "Data Updated", "data": radiology_data})
    except BaseException as err:
        return jsonify({"status": False, "message": err})



# J A Y D E S Y N E S

registrationCollection = db["Registration"]
walkinCollection = db["Walkin"]
checkCollection = db["phone_by_index"]

random = randint(1000000, 9999999)
femaleId = int("1" + str(random))
maleId = int("2" + str(random))
m = "male"

# @app.route('/check', methods=["POST"])


def check(num):
    try:

        existingPatient = checkCollection.find_one({"_id": num})


        if existingPatient:
            return existingPatient
        else:
            return False

    except BaseException as err:
        return jsonify({"message": err})


@app.route('/registration', methods=["POST", "GET"])
def registration():
    try:

        # getting information from JSON
        surname = request.json["surname"]
        other_name = request.json["other_name"]
        age = request.json["age"]
        gender = request.json["gender"]
        occupation = request.json["occupation"]
        phone_number = request.json["phone"]
        home_address = request.json["home_address"]
        state = request.json["state"]
        emergency_name = request.json["emergency_name"]
        emergency_contact = request.json["emergency_contact"]
        # date = request.json["date"]

        find = check(phone_number)
        if find:
            return jsonify({'status': False, 'message': 'User found in database', 'data': find})

    # derive gender Id
        if gender == "male":
            patient_id = maleId
        else:
            patient_id = femaleId

    # registration database model
        patient = {
            "_id": patient_id,
            "surname": surname,
            "other_name": other_name,
            "age": age,
            "gender": gender,
            "occupation": occupation,
            "phone_number": phone_number,
            "home_address": home_address,
            "state": state,
            "emergency_name": emergency_name,
            "emergency_contact": emergency_contact,
            "invoices": []
        }
        patientData = patients.find_one({"_id": patient_id})
        phone = {
            "_id": phone_number,
            "name": surname + " " + other_name,
            "patientId": patient_id
        }
        checkCollection.insert_one(phone)
        # registrationCollection.insert_one(patient)
        patients.insert_one(patient)
        patientData = patients.find_one({"_id": patient_id})
        return jsonify({'status': True, 'message': 'Registration Successful', 'data': patientData})

    except BaseException as err:
        return jsonify({'status': False, 'message': err})


@app.route('/walkin', methods=["POST"])
def walkin():
    try:
        patient_num = request.json["patientId"]
        investigation_entry = request.json["investigation_entry"]
        service_des = request.json["service_des"]
        result = request.json["result"]
        remark = request.json["remark"]
        invoice = request.json["invoice"]
        user = request.json["userId"]

        walkinPat = {
            "_id": invoice,
            "patient_num": patient_num,
            "investigation_entry": investigation_entry,
            "service_des": service_des,
            "result": result,
            "remark": remark
        }

        inserted = walkinCollection.insert_one(walkinPat)

        if inserted:
            # this part deletes patient from the queue
            user_found = users.find_one({'_id':user})
            patients_queued = user["patients"]
            print(patients_queued)
            user_found["patients"].remove(patient_num)
            print(patients_queued)
            users.update_one({"_id": user}, {
                        "$set": {"patients": patients_queued}})
            return jsonify({'status': True, 'message': 'Successful', 'data': walkinPat})
        else:
            return jsonify({'status': False, "message": "500 error", 'data': None})
    except BaseException as err:
        return jsonify({'status': False, "message": err})


@app.route("/service-list", methods=["GET"])
def serviceList():
    services = [
        {
            "name": 'registration',
            "code": '101',
            "amount": 1000,
        },
        {
            "name": 'consultation',
            "code": '201',
            "amount": 2000,
        },
        {
            "name": 'admission_deposit',
            "code": '301',
            "amount": 7000,
        },
        {
            "name": 'in_patient_service',
            "code": '401',
            "amount": 3000,
        },
        {
            "name": 'medication',
            "code": '501',
            "amount": 3000,
        },
        {
            "name": 'diagnostics',
            "code": '601',
            "amount": 2500,
        },
        {
            "name": 'consultation',
            "code": '701',
            "amount": 2600,
        },
        {
            "name":"radiology",
            "code":'801',
            "amount":5000
        }
    ]
    return jsonify(services)    

@app.route("/in-patient-service-list", methods=["GET"])
def inPatientServiceList():
    inServices = [
        {
            "name": 'oxygen',
            "code": '101',
            "amount": 1000,
        },
        {
            "name": 'injections',
            "code": '201',
            "amount": 2000,
        },
        {
            "name": 'bed bath',
            "code": '301',
            "amount": 7000,
        },
        {
            "name": 'laundry',
            "code": '401',
            "amount": 3000,
        },
    ]
    return jsonify(inServices)

def hash_password(password):
    return pwd_context.encrypt(password)

def verify_password(password):
    return pwd_context.verify(password, hash_password(password))

# print(hash_password("hello world"))
# print(verify_password("hello world"))

@app.route("/user/registration", methods = ["POST"])
def register():
    try:
        name = request.json["name"]
        email = request.json["email"]
        password = request.json["password"]
        patients = request.json["patients_queued"]
        department = request.json["department"]
        route = request.json["route"]
        hashed_password = hash_password(password)
        userId = randint(100, 200)
        
        user = {
            "_id":userId,
            "name": name,
            "email": email,
            "password": hashed_password,
            "patients": patients,
            "department": department,
            "route": route 
        }

        users.insert_one(user)

        return jsonify({'status': True, 'message': 'Registration Successful', 'data': user})
    
    except:
        return jsonify({'status': False, 'message': 'Error in registering user', 'data': None})



@auth.verify_password
def verify_password(userId, password):
    user = users.find_one({"_id":userId})
    if user:
        hashed_password = user["password"]
        verified = pwd_context.verify(password, hashed_password)

        if verified == True:
            return True
        else:
            return False

@app.route("/user/login", methods=["POST"])
def login():
    userId = request.json["userId"]
    password = request.json["password"]
    is_verified = verify_password(userId, password)
    # is_verified = True
    user = users.find_one({"_id":userId})
    # user = "Joshua Ajagbe"

    if is_verified == True:
        session["user"] = userId
        return jsonify({'status': True, 'message': 'Login Successful', 'data': user})
    else:
        return jsonify({'status': False, 'message': 'Incorrect User ID or Password', 'data': None})


@app.route('/user/logout')
def logout():
    session.pop("user", None)
    return jsonify({'status': True, 'message': 'Logout Successful', 'data': None})


@app.route("/session")
def check_session():
    if "user" in session:
        userId = session["user"]
        user = users.find_one({"_id":userId})
        return jsonify({"message": f"User {userId} logged in", "data":user})
    else:
        return jsonify({"message": "No user is logged in"})
# print(verify_password(110, "hello there"))


@app.route("/booking/verify", methods=["POST"])
def verify_for_booking():
    invoice_number = request.json["invoice"]
    try:
        invoice = invoices.find_one({"_id":invoice_number})
        if invoice["paid"] == True:
            return jsonify({'status': True, 'message': 'Invoice paid', 'data': invoice})
        else:
            return jsonify({'status': False, 'message': 'Invoice not paid', 'data': invoice})
    except:
        return jsonify({'status': False, 'message': 'Invoice not found', 'data': None})
    # return jsonify(invoice)
    




def mergeSort(myList):
    if len(myList) > 1:
        mid = len(myList) // 2
        left = myList[:mid]
        right = myList[mid:]

        # Recursive call on each half
        mergeSort(left)
        mergeSort(right)

        # Two iterators for traversing the two halves
        i = 0
        j = 0
        
        # Iterator for the main list
        k = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
              # The value from the left half has been used
              myList[k] = left[i]
              # Move the iterator forward
              i += 1
            else:
                myList[k] = right[j]
                j += 1
            # Move to the next slot
            k += 1

        # For all the remaining values
        while i < len(left):
            myList[k] = left[i]
            i += 1
            k += 1

        while j < len(right):
            myList[k]=right[j]
            j += 1
            k += 1

# myList = [54,26,93,17,77,31,44,55,20]
# mergeSort(myList)
# print(myList)



# booking
@app.route("/booking", methods=["POST"])
def book():
    try:
        patientId = request.json["patientId"]
        services = request.json["services"]

        found_user = {}
        

        # looping through the services
        for service in services:
            user_list = []
            service = str(service)
            for user in users.find():
                if service == user['department']:
                    user_list.append(user)
            found_user[service] = user_list
        
        for service in found_user:
            queue_lengths = []
            for item in found_user[service]:
                queue_lengths.append(len(item["patients"]))


            mergeSort(queue_lengths)
            # print(queue_lengths)

            for item in found_user[service]:
                if len(item["patients"]) == queue_lengths[0]:
                    print(item["_id"])
                    user_id = item["_id"]
                    # patients = []
                    item["patients"].append(patientId)
                    user_for_queue = users.update_one({"_id": user_id}, {"$set": {"patients":item["patients"]}})
                    # print(user_for_queue)

        return jsonify({"message":"Booked"})
    except:
        return jsonify({"message":"Not booked"})

        



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)



# install docker
# sudo docker build -f Dockerfile.api -t bssh-backend .
# sudo docker run --rm -p 5000:5000 bssh-backend
