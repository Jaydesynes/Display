import { useRef } from "react";
import Register from "../components/Register";
import Header from "../components/Header";
import LoadingBar from 'react-top-loading-bar'


const RegistrationPage = () => {

    const ref = useRef(null)

    const startBar = () => {
        ref.current.continuousStart()
    }

    const stopBar = () => {
        ref.current.complete()
    }

    const isRegistrationPage = true
    return(

        <div>
            <LoadingBar color='#1b028a' ref={ref} />
            <Header isRegistrationPage={isRegistrationPage}/>
            <Register startBar={startBar} stopBar={stopBar}/>
        </div>
    )
}

export default RegistrationPage;