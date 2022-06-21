import React from 'react'
import SignUpForm from '../components/SignUpForm'

export default function SignUp() {
    return (
        <div>
            <div className="login-area area-padding fix">
            <div className="login-overlay"></div>
            <div className="table">
                <div className="table-cell">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-12">
                                <SignUpForm/>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
        </div>
        
    )
}
