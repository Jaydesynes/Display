import UserLogin from "../components/Login";
import Header from "../components/Header";
import { useRef } from "react";
import LoadingBar from 'react-top-loading-bar'

const LoginPage =({ auth }) => {

    const isLoginPage = true

    const ref = useRef(null)

    const startBar = () => {
        ref.current.continuousStart()
    }

    const stopBar = () => {
        ref.current.complete()
    }
    return(


        <div>
            <Header isLoginPage={isLoginPage} />
            <LoadingBar color='#1b028a' ref={ref} />
            <UserLogin  auth={auth} startBar={startBar} stopBar={stopBar}/>

        </div>
    )
}

export default LoginPage;