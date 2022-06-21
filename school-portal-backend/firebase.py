# import firebase
import pyrebase

config = {
    "apiKey": "AIzaSyD9r97QP3FA8GFApSsUQMrMLrlLafgglM8",
    "authDomain": "school-application-1eaa4.firebaseapp.com",
    "projectId": "school-application-1eaa4",
    "storageBucket": "school-application-1eaa4.appspot.com",
    "messagingSenderId": "424306115698",
    "appId": "1:424306115698:web:b67fff9d61acdb6d1eaeeb",
    "measurementId": "G-4WL51M2PD7",
    "databaseURL": ""
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

# create user
email = "luckyyoila626@gmail.com"
password = "luckyyoila123"

# auth.create_user_with_email_and_password(email, password)

user = auth.sign_in_with_email_and_password(email, password)

# print(user)
# print(user['idToken'])

# get account information
# info = auth.get_account_info(user['idToken'])
# print(info)

# verify email
# auth.send_email_verification(user['idToken'])

# reset email
# auth.sent_password_reset_email(email)

# delete account 
# auth.delete_user_account_info(user['idToken'])

