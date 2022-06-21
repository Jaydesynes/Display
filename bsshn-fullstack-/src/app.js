import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard/Dashboard';
import UserLoginPage from './pages/UserLoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AdmissionPage from './pages/AdmissionPage';
import BillingPage from './pages/BillingPage';
import BookingPage from './pages/BookingPage';
import ConsultationPage from './pages/ConsultationPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import DispenseDrugsPage from './pages/DispenseDrugsPage';
import EmergencyICUPage from './pages/EmergencyICUPage';
import InPatientServicesPage from './pages/InPatientServicesPage';
import LaboratoryPage from './pages/LaboratoryPage';
import PaymentPage from './pages/PaymentPage';
import RadiologyPage from './pages/RadiologyPage';
import RecurrentEntriesPage from './pages/RecurrentEntriesPage';
import VitalSignsPage from './pages/VitalSignsPage';
import WalkInPage from './pages/WalkInPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const activeUser = localStorage.getItem('user');
    activeUser && JSON.parse(activeUser)
      ? setUser(JSON.parse(activeUser))
      : setUser(null);

    console.log('user', JSON.parse(activeUser));
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user))
  // }, [user])

  const handleAuth = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  return (
    <Router>
      {/* {console.log(user)} */}
      <Routes>
        {!user && (
          <Route path='/login' element={<UserLoginPage auth={handleAuth} />} />
        )}
        {user && (
          <>
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/admission' element={<AdmissionPage />} />
            <Route path='/billing' element={<BillingPage />} />
            <Route path='/booking' element={<BookingPage />} />
            <Route path='/consultation' element={<ConsultationPage />} />
            <Route path='/diagnostics' element={<DiagnosticsPage />} />
            <Route path='/pharmacy' element={<DispenseDrugsPage />} />
            <Route path='/emergency' element={<EmergencyICUPage />} />
            <Route
              path='/in-patient-services'
              element={<InPatientServicesPage />}
            />
            <Route path='/laboratory' element={<LaboratoryPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/radiology' element={<RadiologyPage />} />
            <Route
              path='/recurrent-entries'
              element={<RecurrentEntriesPage />}
            />
            <Route path='/vital-signs' element={<VitalSignsPage />} />
            <Route path='/walk-in' element={<WalkInPage />} />
          </>
        )}

        <Route
          path='*'
          element={
            <Navigate
              to={
                user
                  ? `/${user.route === 'admin' ? "dashboard" : user.route}`
                  : '/login'
              }
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
