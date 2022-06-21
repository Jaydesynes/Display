import React, { useState, useEffect } from 'react'
import '../App.css';
import {useNavigate}from 'react-router-dom'
// import UserLogin from './Login';
// import App from '../App';

// import bcrypt from 'bcryptjs'



const Register = ({ startBar, stopBar}) => {
    const [userRegInfo, setUserRegInfo] = useState({})
    const [password2 , setPassword2] = useState('')
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(false)
    const [registered, setRegistered] = useState(false)
    // const [hashed_password, setHashed_password] = useState(false)

    let navigate = useNavigate()

    const confirmPassword = ({target}) => {
        setPassword2(target.value)

    }

    const handleInput = ({target}) => {
        setUserRegInfo((prev) => ({ ...prev, [target.name]: target.value }));
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
       const registrationData = {
         firstname : userRegInfo.firstname,
         surname : userRegInfo.surname,
         phone : userRegInfo.phone,
         email : userRegInfo.email,
         password : userRegInfo.password
       }

       const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json, charset=UTF-8',
      }
      startBar()
      //  process.env.REACT_APP_API_REGISTRATION
      //  http://localhost:5000/registration
        fetch(process.env.REACT_APP_API_REGISTRATION, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(registrationData),
      mode: 'cors',
      headers: headers,
    }).then((res) => res.json())
      .then((data) => {
        stopBar()
        console.log(data)
        
        if (data.status === true){
          console.log("registered")
          setRegistered(true)
          
         
          navigate('/login')

        }
      })
      .catch((err) => {
        console.log(`Error during registration: ${err}`);
        stopBar()
      });
    }

    useEffect(() => {

        if (displayMessage){
          setTimeout(() => {
            setDisplayMessage(false)
          }, 4000);
        }

        
        if (userRegInfo.password && password2){
          if (password2.length === userRegInfo.password.length){

            if (password2 === userRegInfo.password) {
              setPasswordMismatch(false)
              // const hashed_password = bcrypt.hashSync(userRegInfo.password)
              // setHashed_password(hashed_password)
              

            } else{
              setPasswordMismatch(true)
              
            }
            
          }else if(password2.length > userRegInfo.password.length) {
            setPasswordMismatch(true)
          }
        }

      if (passwordMismatch){
        setTimeout(() => {
          setPasswordMismatch(false)
        }, 4000);
      }
    },[displayMessage, userRegInfo.password, password2, passwordMismatch]);
    


    return (
        <div>
            <div className='form-container'>
              {
                displayMessage === false?
                <p style={{color: 'red'}}>{displayMessage}</p>
                : null
              }
              {
                registered ?
                <p>You have successfully registered. Login you in...</p>
                : null
              }
                <p className='heading'>Register</p>
                <form method='POST' onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input
                    className='field' 
                    type = 'text'
                    name = 'firstname'
                    placeholder='Enter your First Name'
                    value = {userRegInfo.firstname || ''}
                    onChange={handleInput}
                    autoComplete='off'
                    required
                    />
                    <br />

                    <label>Surname</label>
                    <input
                    className='field' 
                    type = 'text'
                    name = 'surname'
                    placeholder='Enter your Surname'
                    value = {userRegInfo.surname || ''}
                    onChange={handleInput}
                    autoComplete='off'
                    required
                    />
                    <br />

                    <label>Phone Number</label>
                    <input 
                    className='field'
                    type = 'text'
                    name = 'phone'
                    placeholder='Enter your phone number'
                    value = {userRegInfo.phone || ''}
                    onChange={handleInput}
                    autoComplete='off'
                    required
                    />
                    <br />

                    <label>Email Address</label>
                    <input 
                    className='field'
                    type = 'email'
                    name = 'email'
                    placeholder='Enter your email address'
                    value = {userRegInfo.email || ''}
                    onChange={handleInput}
                    autoComplete='off'
                    required
                    />
                    <br />


                    <label>Password</label> <small>(At least 6 characters)</small>
                    <input 
                    className='field'
                    type = 'password'
                    name = 'password'
                    placeholder='Enter your password'
                    value={userRegInfo.password || ''}
                    onChange={handleInput}
                    autoComplete='off'
                    required
                    />
                    

                    {
                        passwordMismatch  ?
                        <small style={{color: 'red'}} >Passwords do not match, try again</small> 
                        : null
                    }
                    <br />  

                    <label>Confirm Password</label>
                    <input 
                    className='field'
                    type = 'password'
                    name = 'password2'
                    placeholder='Confirm your password'
                    value = {password2 || ''}
                    onChange={confirmPassword}
                    autoComplete='off'
                    required
                    />
                    <br />

                    
                    <input 
                    className='submit'
                    name = 'submit'
                    type = 'submit'
                    value= 'Submit'
                    />
                    <br />


                </form>
            </div>
            
            <footer>
                 <div className='powered'>Powered By IDL 2022</div>
            </footer>
        </div>
    )
}

export default Register;