import './App.css';
import React, { useState, useEffect } from 'react';
import DashboardPage from './pages/DashboardPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'


function App() {

   
  const [user, setUser] = useState(false);


  
  useEffect(() => {
    const activeUser = localStorage.getItem('schoolUser')
        activeUser && JSON.parse(activeUser)
      ? setUser(JSON.parse(activeUser))
      : setUser(null);

    // if (props.data){
    //   handleAuth(props.data)
    // }
  }, []);

  const handleAuth = (data) => {
    localStorage.setItem('schoolUser', JSON.stringify(data));
    setUser(data);
  };

  return (
    
    <Router>
          <Routes>
            { !user && (
              <>
              <Route path='/login' element={<LoginPage auth={handleAuth} />} />

              <Route path='/registration' element={<RegistrationPage />} />     
              </>              
            )}

        {user && (
            <>

              <Route path='/dashboard' element ={<DashboardPage  auth={handleAuth} />} />
            </>
        )}

      <Route
          path='*'
          element={
            <Navigate
              to={
                user
                  ? '/dashboard'
                  : '/login'
              }
            />
          }
        />
          </Routes>

    </Router>


  );
}

export default App;
