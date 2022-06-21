import pymongo
from pymongo import MongoClient

def connection():
    try:
        cluster = MongoClient("mongodb+srv://yoila:luckyyoila@cluster0.jap1y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        # cluster = MongoClient("localhost", 27017)
        db = cluster['school']
        print("connected")
        return db
    except:
        raise Exception
    
db = connection()
