import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
// css
import '../public/css/meanmenu.min.css';
import '../public/style.css';
import '../public/css/responsive.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/contact'>
          <Contact />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
