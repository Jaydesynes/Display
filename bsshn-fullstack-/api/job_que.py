from datetime import date
from database import conn 
from services import update_services
import json

with open('jobs.json') as f:
  weights = json.load(f)


 
db = conn()
jobs = db['Jobs']


def calc_total_weight(document):
    today = date.today().strftime("%d/%m/%Y")
    services = document['services']
    total = 0 
    for service in services: 
        subtotal =0
        n = len(services[service][today])
        subtotal= (n+1)*weights[service]
        total+=subtotal
    return total

def add(service_id,userid,patient_no):
    #TODO(MKV) remember to add the ability to select date 
    user = jobs.find({"_id":userid})    
    user_dict={}
    for i in user:   
        user_dict = i
    len(user_dict)
    if len(user_dict) == 0:
        jobs.insert_one({
            "_id":userid,
            "total_weight": weights[service_id],
            "services":{
                str(service_id):{
                    date.today().strftime("%d/%m/%Y"):[patient_no]
                }
            }
        })
        return True
 
    else: 
        if  user_dict['services'][str(service_id)]:
            today = date.today().strftime("%d/%m/%Y")
            jobs.find_one_and_update({"_id":userid},{'$push':{f"services.{service_id}.{today}":patient_no}})
            updated_weight = calc_total_weight(user_dict)
            jobs.update_one({"_id":userid},{'$set':{"total_weight":updated_weight}})
            update_services(service_id,userid,updated_weight)
        return True

def  remove(service_id,patient_no,user_id):
    user = jobs.find({"_id":user_id})
    user_dict={}
    for i in user:   
        user_dict = i
    len(user_dict)
    today = date.today().strftime("%d/%m/%Y")
    jobs.find_one_and_update({"_id":user_id},{'$pull':{f"services.{service_id}.{today}":patient_no}})
    updated_weight = calc_total_weight(user_dict)
    jobs.update_one({"_id":user_id},{'$set':{"total_weight":updated_weight}})
    update_services(service_id,user_id,updated_weight)