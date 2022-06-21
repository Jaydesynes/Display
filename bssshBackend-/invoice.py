from database import conn 

db = conn()

invoice = db['invoices']



def get(payment_id):
    response =invoice.find({"_id":payment_id})
    data ={}
    for i in response: 
        data = dict(i)
    if len(data) == 0:
        return {'status':False,"message":"Invoice does not exist."}
    else: 
        return {'status':True, "message":"Unpaid", "data":data}

