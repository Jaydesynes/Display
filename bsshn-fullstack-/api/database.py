import pymongo
from pymongo import MongoClient



def conn():
    try:
        # cluster = MongoClient("mongodb+srv://Joepolymath:DUwrP2MDzmIn5jn6@cluster0.wbgpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        # cluster = MongoClient("mongodb://192.168.43.114:27017/BSSHN")
        cluster = MongoClient("localhost", 27017)
        db = cluster.get_database('BSSHN')
        print("connected")
        return db
    except:
        raise Exception
    
db = conn()
