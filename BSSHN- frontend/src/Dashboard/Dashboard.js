import React, {useState} from 'react'
import './Dashboard.css'
import Registration from "../components/Registration"
import EmergencyICU from '../components/EmergencyICU'
import { FaCashRegister, FaHospitalUser, FaHandHoldingMedical, FaDiagnoses, FaCapsules,
    FaBars, FaSearch, FaRegBell
} from 'react-icons/fa'
import {BsFillJournalBookmarkFill} from 'react-icons/bs'
import {GiMedicalDrip} from 'react-icons/gi'
import {BsJournalMedical} from 'react-icons/bs'
import {MdOutlineEmergency, MdPayment} from 'react-icons/md'
import Admission from '../components/Admission'
import Payment from '../components/Payment'
import Booking from '../components/Booking'
import DispenseDrugs from '../components/DispenseDrugs'
import Consultation from '../components/Consultation'
import VitalSigns from '../components/VitalSigns'
import Diagnostics from '../components/Diagnostics'
import RecurrentEntries from '../components/RecurrentEntries'
import bshn from '../Images/bshn.png'

const Dashboard = () => {
    const [reg, setReg] = useState(false)
    const [icu, setICU] = useState(false)
    const [book, setBook] = useState(false)
    const [admit, setAdmit] = useState(false)
    const [drugs, setDrugs] = useState(false)
    const [diagnose, setDiagnose] = useState(false)
    const [consult, setConsult] = useState(false)
    const [pay, setPay] = useState(false)
    const [vitals, setVitals] = useState(false)
    const [entries, setEntries] = useState(false)

    const HandleReg = () => {
      
        setReg(!reg);

       

    }

//     const reset = () => {
        
//         // manually reset all values to false for all components irrespective of what state they are in
//         const [reg, setReg] = useState(false)
//         const [icu, setICU] = useState(false)
//         const [book, setBook] = useState(false)
//         const [admit, setAdmit] = useState(false)
//         const [drugs, setDrugs] = useState(false)
//         const [diagnose, setDiagnose] = useState(false)
//         const [consult, setConsult] = useState(false)
//         const [pay, setPay] = useState(false)
//         const [vitals, setVitals] = useState(false)
//         const [entries, setEntries] = useState(false)
//     }

// //     function refreshPage() {
// //     window.location.reload(false);
// //   }
    
    return (
        <div id='body'>
            <div className="page-wrapper">
        <input type="checkbox" name="" id="menu-toggle"/>
        <div className="sidebar">
            <div className="brand">
                <h3><span><i className="icon"><img src={bshn} alt='logo' className='brandimage'/></i></span></h3>
               
            </div>

            <div className="profile-card">
                <div className="profile-info">
                    <h2>BSSHN</h2>
                    <small>Admin Page</small>
                </div>
                

            </div>

            <div className="sidebar-menu">
                <div className="menu-item" id="Reg">
                        
                        <span className="icon"><FaCashRegister/></span>
                        <span onClick={HandleReg}>Registration</span>
                    
                </div>


                <div className="menu-item" id="Emergency">
                    
                        <span className="icon"><MdOutlineEmergency/></span>
                        <span onClick={()=>setICU(!icu)}>Emergency/ICU</span>
                    
                </div>

                <div className="menu-item" id="Book">
                    
                        <span className="icon"><BsFillJournalBookmarkFill/></span>
                        <span onClick={()=>setBook(!book)}>Booking</span>
                    
                </div>

                <div className="menu-item" id="Admit">
                    
                        <span className="icon"><FaHospitalUser/></span>
                        <span onClick={()=>setAdmit(!admit)}>Admission</span>
                    
                </div>

                <div className="menu-item" id="Consult">
                    
                        <span className="icon"><FaHandHoldingMedical/></span>
                        <span onClick={()=>setConsult(!consult)}>Consultation</span>
                    
                </div>


                <div className="menu-item" id="Diagnose">
                    
                        <span className="icon"><FaDiagnoses/></span>
                        <span onClick={()=>setDiagnose(!diagnose)}>Diagnostics</span>
                    
                </div>

                <div className="menu-item" id="Drugs">
                    
                        <span className="icon"><FaCapsules/></span>
                        <span onClick={()=>setDrugs(!drugs)}>Drug Dispensation</span>
                    
                </div>

                <div className="menu-item" id="Pay">
                    
                        <span className="icon"><MdPayment/></span>
                        <span onClick={()=>setPay(!pay)}>Payment</span>
                    
                </div>

                <div className="menu-item" id="Vitals">
                    
                        <span className="icon"><GiMedicalDrip/></span>
                        <span onClick={()=>setVitals(!vitals)}>Vital Signs</span>
                    
                </div>

                <div className="menu-item" id="Entries">
                    
                        <span className="icon"><BsJournalMedical/></span>
                        <span onClick={()=>setEntries(!entries)}>Recurrent Entries</span>
                    
                </div>

            </div>

        </div>
        
        <div className="main-content">
            <header>
            <label htmlFor="menu-toggle">
                <span className="las la-bars"><FaBars/></span>
            </label>

            <div className="head-icons">
                <span className="las la-search"><FaSearch/></span>
               
                <span className="las la-bell"><FaRegBell/></span>

                
            </div>
            
        </header>
        </div>

        <main>

            <div className="page-header">
                <h1>Morning User</h1>
                <small>Have a nice day</small>
            </div>
            <div className="analytics">
                <div className="">
                    <div className="card-head">
                    {
                        reg?
                    
                        <Registration/>
                    : null }
                        
                    </div>

                    <div className="card-head">
                    {
                        icu?
                    
                        <EmergencyICU/>
                    : null }
                        
                    </div>

                    <div className="card-head">
                    {
                        admit?
                    
                        <Admission/>
                    : null }
                        
                    </div>

                    <div className="card-head">
                    {
                        consult?
                    
                        <Consultation/>
                    : null }
                        
                    </div>

                    <div className="card-head">
                    {
                        diagnose?
                    
                        <Diagnostics/>
                    : null }
                        
                    </div>

                    <div className="card-head">
                    {
                        drugs?
                    
                        <DispenseDrugs/>
                    : null }
                        
                    </div>

                    <div className="card-head">
                    {
                        pay?
                    
                        <Payment/>
                    : null }
                        
                    </div>

                    <div className="card-head">
                    {
                        vitals?
                    
                        <VitalSigns/>
                    : null }
                        
                    </div>

                    <div className="card-head">
                    {
                        book?
                    
                        <Booking/>
                    : null }
                        
                    </div>

                    <div className="card-head">
                    {
                        entries?
                    
                        <RecurrentEntries/>
                    : null }
                        
                    </div>
                    
                    <div className="card-body">
                        <div className="chart-wrapper">
                            <div id="chart"></div>
                        </div>
                    </div>
                </div>

                <div className="card emails-card">
                    <div className="card-head">
                        Patients Admitted
                    </div>
                    <div className="card-body">
                        <div id="emailChart">

                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="emails-info">
                            <div className="email-stat">
                                <span className="status bg-danger"></span>
                                <span>30 patients not documented</span>
                            </div>

                            <div className="email-stat">
                                <span className="status bg-warning"></span>
                                <span>57 patients documented</span>
                            </div>

                            <div className="email-stat">
                                <span className="status bg-success"></span>
                                <span>42 patients admitted</span>
                            </div>

                            <div className="email-stat">
                                <span className="status bg-danger"></span>
                                <span>SMTP error</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            </main>
            </div>
        </div>
    )
}

export default Dashboard




