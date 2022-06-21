import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard/Dashboard';
import './index.css';
// import Payment from './components/Payment';
// import Booking from './components/Booking';
// import App from './components/Registration';
// import VitalSigns from './components/VitalSigns';
// import Consultation from './components/Consultation';
// import Admission from './components/Admission';
// import DispenseDrugs from './components/DispenseDrugs';
// import Emergency from './components/EmergencyICU';
// import Diagnostics from './components/Diagnostics';
// import WalkIns from './components/WalkIn';
import reportWebVitals from './reportWebVitals';
// import RecurrentEntries from './components/RecurrentEntries';


ReactDOM.render(
  <React.StrictMode>
  
    {/* <App />
    <Payment/>
    <Booking/>
    <VitalSigns/>
    <Consultation/>
    <Admission/>
    <DispenseDrugs/>
    <Emergency/>
    <Diagnostics/>
    <RecurrentEntries/>
    <WalkIns/>  */}
    
    <Dashboard/>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
