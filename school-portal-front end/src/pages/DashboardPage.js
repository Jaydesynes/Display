import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import '../App.css';
import { useRef } from "react/cjs/react.development";
import LoadingBar from 'react-top-loading-bar'

const DashboardPage = ({auth}) => {
    
    const isDashboard = true
    const ref = useRef(null)

    const startBar = () => {
        ref.current.continuousStart()
    }

    const stopBar = () => {
        ref.current.complete()
    }

    return(
        <div className="dashboard-page">
            
            {/* <Header  isDashboard={isDashboard}/> */}
            <LoadingBar color='#1b028a' ref={ref}  />
            <Dashboard auth={auth} startBar={startBar} stopBar={stopBar} Header = {<Header isDashboard={isDashboard}/>}/>
        </div>  
    )
}

export default DashboardPage;