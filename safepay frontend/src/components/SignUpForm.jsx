import React from 'react'
import { useState } from 'react'


let data = []


export default function SignUpForm() {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [password, setPassword] = useState("");
    const [registration, setRegistration] = useState({});
    const [info, setInfo] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [err, setErr] = useState("");

    const changeFunc = (e) => {
        setRegistration((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }));
    }
    
    const signUpSubmit = (e) => {
        e.preventDefault();
        if (registration.password === registration.confPassword){
            const generateRandomNumber = (min, max) =>  {
                return Math.floor(Math.random() * (max - min) + min);
                  };
                let payment_ref = generateRandomNumber(1222222222, 9222222222);
            const reg = payment_ref;
            setRegistration((prev)=>({
                ...prev,
                "refNum":reg
            }));
            
            setInfo(`SignUp Successful ${registration.name}. Your Reference Number is ${reg}`)
            setErr("");
            setDisabled(true)
            console.log(reg);
            data.push(registration)
            console.log(registration);
            console.log(data);
        }
        else{
            setInfo("");
            setErr(`Password not match. Please Ensure you enter same password as confirm password.`)
        }
    }

    return (
        <div>
            <div className="login-form signup-form">
                                    <h4 className="login-title text-center">REGISTER</h4>
                                    <div className="row">
                                        <form id="contactForm" action="/signup" className="log-form" >
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input onChange={changeFunc} value={registration.name || ""} name="name" type="text" id="name" className="form-control" placeholder="Full Name" required data-error="Please enter your name"/>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input type="email" id="email" name="email" value={registration.email} onChange={changeFunc} className="form-control" placeholder="Your Email" required data-error="Please enter your name"/>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input type="phone" id="email" className="form-control" 
                                                onChange={changeFunc}
                                                name="phone"
                                                value={registration.phone}
                                                placeholder="Phone Number" required data-error="Please enter your phone number"/>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input type="password" id="msg_subject" 
                                                name="password"
                                                onChange={changeFunc}
                                                value={registration.password}
                                                className="form-control" placeholder="Password" required data-error="Please enter your password"/>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input type="password" onChange={changeFunc} id="cmsg_subject" className="form-control" placeholder="Confirm Password" required data-error="Please enter your message subject"
                                                name="confPassword"
                                                value={registration.confPassword} />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                                                <div className="check-group flexbox">
                                                    <label className="check-box">
                                                        <input onChange={changeFunc} type="checkbox" className="check-box-input" checked/>
                                                        <span className="remember-text">I agree terms & conditions</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                                                <button disabled={disabled} type="submit" id="submit" className="slide-btn login-btn" onClick={signUpSubmit}>Signup</button>
                                                <p style={{color:"red"}}>{err}</p>
                                                <p id="info" style={{color: 'green'}}>{info}</p>
                                                <div id="msgSubmit" className="h3 text-center hidden"></div> 
                                                <div className="clearfix"></div>
                                            </div>
                                            
                                            <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                                                <div className="clear"></div>
                                                <div className="separetor text-center"><span>Or with signup</span></div>
                                                <div className="sign-icon">
                                                    <ul>
                                                        <li><a className="facebook" href="#"><i className="ti-facebook"></i></a></li>
                                                        <li><a className="twitter" href="#"><i className="ti-twitter"></i></a></li>
                                                        <li><a className="google" href="#"><i className="ti-google"></i></a></li>
                                                    </ul>
                                                    <div className="acc-not">have an account?  <a href="/login">Login</a></div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
        </div>
    )
}
