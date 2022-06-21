
  
from database import conn
from datetime import date


db = conn()
radiology = db["Radiology"]
invoice = db["invoices"]
radiology_code = 801
def add(notes,patientId,userId):
    data ={"_id":patientId,"consultant":userId,"date":date.today().strftime("%d/%m/%Y"), "notes":notes}
    radiology.insert_one(data)
    invoice.find_one_and_update({"patientId":patientId},{"$set":{f"services.{radiology_code}":1}})
    return data