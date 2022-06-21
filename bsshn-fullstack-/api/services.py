from pymongo import MongoClient
from database import conn


 

db = conn()
services = db['Services']
##Schema 
## service_id: string
## consultants: Array of Array [consultant_id, total_weight]


# Remember to write function to populate and update the services collection 

def get_consultants(service_id):
    data=services.find({"_id":service_id})
    response = {}
    for i in data: 
        response = i
        
    return response

def update_services(service_id,user_id,weight):
    services.update_one({"_id":service_id},{'$set':{f"Consultants.{user_id}":weight}})