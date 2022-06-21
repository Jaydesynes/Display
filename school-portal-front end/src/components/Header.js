import '../App.css'
import {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router'
import LoadingBar from 'react-top-loading-bar'

const Header = (props) => {
    const navigate = useNavigate()


    const ref = useRef(null)

    const startBar = () => {
        ref.current.continuousStart()
    }

    const stopBar = () => {
        ref.current.complete()
    }

   const [buttonValue, setButtonValue] = useState('Login')
   const isDashboard = props.isDashboard 
   const isLoginPage = props.isLoginPage
   const isRegistrationPage = props.isRegistrationPage

   const handleLogout = () => {
    // process.env.REACT_APP_API_LOGOUT
    // http://localhost:5000/logout
    startBar()
    fetch(process.env.REACT_APP_API_LOGOUT , {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET, POST',
        'Content-Type': 'application/json, charset=UTF-8',
      },
    })
    .then((res) => res.json())
      .then((data) => {
          stopBar()
        localStorage.removeItem('schoolUser');
        console.log(data.message)

        setTimeout(() => {
          window.location.reload()

        }, 1);
      });
  };

   const handleButton = ({target})=>{

       if (target.value === 'Register'){
           navigate('/registration')
       }else if (target.value === 'Login'){
            navigate('/login')
       }else if (target.value === 'Logout'){
            handleLogout()
       }
   }


    useEffect(() =>{
        if (isDashboard){
            setButtonValue('Logout')
        }else if (isLoginPage){
            setButtonValue('Register')
        }else if (isRegistrationPage){
            setButtonValue('Login')
        }

        

    }, [isDashboard, isLoginPage, isRegistrationPage])


    return(
        <div>
            <header>
            <LoadingBar color='#1b028a' ref={ref} />
            <div>
                <span className='logo'>Logo</span>
            </div>

            <span className='head-title'> School Registration Portal</span>

            <div>
            <input 
            className='login-btn'
            name = 'submit'
            value = {buttonValue}
            type = 'submit'
            onClick={handleButton}

            />
            </div>
        </header>
        

        </div>
    )
}

export default Header;