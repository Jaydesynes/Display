import React, { useState , useEffect} from 'react'
import '../App.css';
// import bcrypt from 'bcryptjs'
import {useNavigate} from 'react-router-dom'


const UserLogin = ( { auth, startBar, stopBar } ) => {

    
    const [userLoginInfo, setUserLoginInfo] = useState({})
    const [displayMessage, setDisplayMessage] = useState(false)
    // const [hashed_password, setHashed_password] = useState(false)

    let navigate = useNavigate()

    const handleInput = ({target}) =>{
        setUserLoginInfo((prev) => ({ ...prev, [target.name]: target.value }));
    }    

    useEffect(() => {

      if (displayMessage){
        setTimeout(() => {
          setDisplayMessage(false)
        }, 4000);
      }
    })

    const handleSubmit = (event) =>{
        event.preventDefault();
        // navigate('/dashboard')

        // const hashed_password = bcrypt.hashSync(userLoginInfo.password)
        // setHashed_password(hashed_password)
        const loginData =  {
          email: userLoginInfo.email,
          password : userLoginInfo.password,
        }

        startBar()
        // http://localhost:5000/login
      // process.env.REACT_APP_API_LOGIN 
        fetch(process.env.REACT_APP_API_LOGIN , {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(loginData),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json, charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
      
        stopBar()
        if (data.status === true){
          auth(data.data);
          console.log("login")
          

         navigate('/dashboard')
        }else{
          setDisplayMessage("Invalid email or password. Please check your login details and try again")
        }
      })
      .catch((err) => {
        stopBar()
        console.log(`Error during login: ${err}`);
      });
    }

    return(
        <div className='form-container login-form'>
          <div>
              
            </div>
                <p className='login-heading'>Login</p>
                <form method='POST' onSubmit={handleSubmit}>
                {
                displayMessage ?
                <small style={{color: 'red'}}>{displayMessage}</small> 
                : null
              }
                    <br />
                    <label>Email Address</label>
                    <input 
                    className='field'
                    type = 'email'
                    name = 'email'
                    placeholder='Enter your email address'
                    value = {userLoginInfo.email || ''}
                    onChange={handleInput}
                    autoComplete='off'
                    required
                    />
                    <br />

                    <label>Password</label>
                    <input 
                    className='field'
                    type = 'password'
                    name = 'password'
                    placeholder='Enter your password'
                    value={userLoginInfo.password || ''}
                    onChange={handleInput}
                    autoComplete='off'
                    required
                    />
                    <br />

                    
                    <input 
                    className='submit'
                    name = 'submit'
                    type = 'submit'
                    value= 'Login'
                    />
                    <br />


                </form>
            </div>

    )
}

export default UserLogin;