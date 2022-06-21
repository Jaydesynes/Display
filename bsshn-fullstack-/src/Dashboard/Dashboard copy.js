import React, { useState } from 'react';
import greetingTime from 'greeting-time';
import './Dashboard.css';
import Registration from '../components/Registration';
import EmergencyICU from '../components/EmergencyICU';
import {
  FaCoins,
  FaCashRegister,
  FaHospitalUser,
  FaHandHoldingMedical,
  FaDiagnoses,
  FaCapsules,
  FaUserMd,
  FaRegCommentAlt,
  FaFileInvoice,
  FaBars,
  FaSearch,
  FaRegBell,
} from 'react-icons/fa';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { GiMedicalDrip } from 'react-icons/gi';
import { BsJournalMedical } from 'react-icons/bs';
import { MdOutlineEmergency, MdPayment } from 'react-icons/md';
import Admission from '../components/Admission';
import Payment from '../components/Payment';
import Booking from '../components/Booking';
import DispenseDrugs from '../components/DispenseDrugs';
import Consultation from '../components/Consultation';
import VitalSigns from '../components/VitalSigns';
import Diagnostics from '../components/Diagnostics';
import RecurrentEntries from '../components/RecurrentEntries';
import bshn from '../Images/bshn.png';
import Welcome from '../components/Welcome';

const Dashboard = () => {
  const [reg, setReg] = useState(false);
  const [icu, setICU] = useState(false);
  const [book, setBook] = useState(false);
  const [admit, setAdmit] = useState(false);
  const [drugs, setDrugs] = useState(false);
  const [diagnose, setDiagnose] = useState(false);
  const [consult, setConsult] = useState(false);
  const [pay, setPay] = useState(false);
  const [vitals, setVitals] = useState(false);
  const [entries, setEntries] = useState(false);
  const [welcome, setWelcome] = useState(true);
  // const HandleReg = () => {
  //     setReg(!reg);
  // }

  const resetState = () => {
    setWelcome(false);
    setReg(false);
    setICU(false);
    setBook(false);
    setAdmit(false);
    setDrugs(false);
    setDiagnose(false);
    setConsult(false);
    setPay(false);
    setVitals(false);
    setEntries(false);
  };

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
      <div className='page-wrapper'>
        <input type='checkbox' name='' id='menu-toggle' />
        <div className='sidebar'>
          <div className='brand'>
            <h3>
              <span>
                <i className='icon'>
                  <img src={bshn} alt='logo' className='brandimage' />
                </i>
              </span>
            </h3>
          </div>

          <div className='profile-card'>
            {/* <div className="profile-img"></div> */}
            <div className='profile-info'>
              <h2>BSSHN</h2>
              <small>Dashboard</small>
            </div>
            <div className='profile-action'>
              <span className='las la-coins'>
                <FaCoins />{' '}
              </span>
              N2300
            </div>

            <div className='profile-icons'>
              <span className='las la-user'>
                <FaUserMd />
              </span>
              <span className='las la-comment-alt'>
                <FaRegCommentAlt />
              </span>
              <span className='las la-file-invoice'>
                <FaFileInvoice />
              </span>
            </div>
          </div>

          <div className='sidebar-menu'>
            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setReg(true);
              }}
            >
              <span className='icon'>
                <FaCashRegister />
              </span>
              <span>Registration</span>
            </div>

            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setICU(true);
              }}
            >
              <span className='icon'>
                <MdOutlineEmergency />
              </span>
              <span>Emergency/ICU</span>
            </div>

            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setBook(true);
              }}
            >
              <span className='icon'>
                <BsFillJournalBookmarkFill />
              </span>
              <span>Booking</span>
            </div>

            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setAdmit(true);
              }}
            >
              <span className='icon'>
                <FaHospitalUser />
              </span>
              <span>Admission</span>
            </div>

            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setConsult(true);
              }}
            >
              <span className='icon'>
                <FaHandHoldingMedical />
              </span>
              <span>Consultation</span>
            </div>

            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setDiagnose(true);
              }}
            >
              <span className='icon'>
                <FaDiagnoses />
              </span>
              <span>Diagnostics</span>
            </div>

            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setDrugs(true);
              }}
            >
              <span className='icon'>
                <FaCapsules />
              </span>
              <span>Drug Dispensation</span>
            </div>

            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setPay(true);
              }}
            >
              <span className='icon'>
                <MdPayment />
              </span>
              <span>Payment</span>
            </div>

            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setVitals(true);
              }}
            >
              <span className='icon'>
                <GiMedicalDrip />
              </span>
              <span>Vital Signs</span>
            </div>

            <div
              className='menu-item'
              onClick={() => {
                resetState();
                setEntries(true);
              }}
            >
              <span className='icon'>
                <BsJournalMedical />
              </span>
              <span>Recurrent Entries</span>
            </div>
          </div>

          {/* <div className='sidebar-card'>
            <h2>Hello User</h2>
            <p>You have several tasks to complete today</p>
            Get Started
          </div> */}
        </div>

        <div className='main-content'>
          <header>
            <label htmlFor='menu-toggle'>
              <span className='las la-bars'>
                <FaBars />
              </span>
            </label>

            <div className='head-icons'>
              <span className='las la-search'>
                <FaSearch />
              </span>

              <span className='las la-bell'>
                <FaRegBell />
              </span>
            </div>
          </header>
        </div>

        <main>
          <div className='page-header'>
            <h1>{greetingTime(new Date())}, John</h1>
            <small>Welcome to Hospital Information Mangament Portal </small>
          </div>
          <div className='analytics'>
            <div>
              {welcome && (
                <div className='card-head'>
                  <Welcome />
                </div>
              )}

              {reg && (
                <div className='card-head'>
                  <Registration />
                </div>
              )}

              {icu && (
                <div className='card-head'>
                  <EmergencyICU />
                </div>
              )}

              {admit && (
                <div className='card-head'>
                  <Admission />
                </div>
              )}

              {consult && (
                <div className='card-head'>
                  <Consultation />
                </div>
              )}

              {diagnose && (
                <div className='card-head'>
                  <Diagnostics />
                </div>
              )}

              {drugs && (
                <div className='card-head'>
                  <DispenseDrugs />
                </div>
              )}

              {pay && (
                <div className='card-head'>
                  <Payment />
                </div>
              )}

              {vitals && (
                <div className='card-head'>
                  <VitalSigns />
                </div>
              )}

              {book && (
                <div className='card-head'>
                  <Booking />
                </div>
              )}

              {entries && (
                <div className='card-head'>
                  <RecurrentEntries />
                </div>
              )}

              <div className='card-body'>
                <div className='chart-wrapper'>
                  <div id='chart'></div>
                </div>
              </div>
            </div>

            <div className='card emails-card'>
              <div className='card-head'>Outstanding Tasks:</div>
              <div className='card-body'>
                {/* <div id='emailChart'></div> */}
                <hr />
              </div>
              <div className='card-footer'>
                <div className='emails-info'>
                  <div className='email-stat'>
                    <span className='status bg-danger'></span>
                    <span>30 patients not documented</span>
                  </div>

                  <div className='email-stat'>
                    <span className='status bg-warning'></span>
                    <span>57 patients documented</span>
                  </div>

                  <div className='email-stat'>
                    <span className='status bg-success'></span>
                    <span>42 patients admitted</span>
                  </div>

                  <div className='email-stat'>
                    <span className='status bg-danger'></span>
                    <span>SMTP error</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
