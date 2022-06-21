import React, { useState, useEffect } from 'react';
import '../index.css';
import '../Dashboard/Dashboard.css';
import '../components/Registration.css';

const services = [
  {
    name: 'Registration',
    code: 101,
    route: 'registration',
  },
  {
    name: 'Consultation',
    code: 201,
    route: 'consultation',
  },
  {
    name: 'Admission',
    code: 301,
    route: 'admission',
  },
  {
    name: 'In-patient',
    code: 401,
    route: 'in-patient-services',
  },
  {
    name: 'Pharmacy',
    code: 501,
    route: 'pharmacy',
  },
  {
    name: 'Diagnostics',
    code: 601,
    route: 'diagnostics',
  },
  {
    name: 'Laboratory',
    code: 701,
    route: 'laboratory',
  },
  {
    name: 'Emergency',
    code: 801,
    route: 'emergency',
  },
  {
    name: 'Payment',
    code: 901,
    route: 'payment',
  },
  {
    name: 'Radiology',
    code: 111,
    route: 'radiology',
  },
  {
    name: 'Booking',
    code: 211,
    route: 'booking',
  },
  {
    name: 'Billing',
    code: 311,
    route: 'billing',
  },
  {
    name: 'Walk-In',
    code: 411,
    route: 'walk-in',
  },
  {
    name: 'Vital Signs',
    code: 511,
    route: 'vital-signs',
  },
];

const UserRegistration = () => {
  const [message, setMessage] = useState(false);
  const [user, setUser] = useState({});
  const [route, setRoute] = useState({})
  const [response, setResponse] = useState(null);

  const handleUser = ({ target }) => {
    setUser((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleRoute = ({target}) => {
    const selected = target[target.selectedIndex]
    const { route } = selected.dataset
    setRoute(route)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    !user.department && setMessage(true);
    // const _data = { ...user, route ,services: {[user.department]: []} };
    const _data = { ...user, route , patients_queued: [] };

    fetch('http://localhost:5000/user/registration', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(_data),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET, POST',
        'Content-Type': 'application/json, charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponse(data.message)
        setUser({})
      })
      .catch((err) => {
        console.log(`Error registering new user: ${err}`);
      });

    // console.log(_data);
  };

  useEffect(() => {
    message &&
      setTimeout(() => {
        setMessage(false);
      }, 7000);
  });

  return (
    <div>
      <div className='container loginMargin'>
        <div className='title'>Register User</div>
        <div className='content'>
          <form onSubmit={handleSubmit} method='POST'>
            <div className='login-details'>
              <div className='input-box'>
                <span className='details'>Name</span>
                <input
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={user.name || ''}
                  onChange={handleUser}
                  autoComplete='off'
                  required
                />
              </div>

              <div className='input-box'>
                <span className='details'>Email</span>
                <input
                  type='email'
                  placeholder='Enter your email address'
                  name='email'
                  value={user.email || ''}
                  onChange={handleUser}
                  autoComplete='off'
                  required
                />
              </div>
              <div className='input-box'>
                <span className='details'>Department</span>
                {message && (
                  <small className='text-danger fs-6'>
                    Please Choose Department
                  </small>
                )}
                <select onChange={(evt) => { handleUser(evt); handleRoute(evt)}}  name='department' required>
                  <option value="" selected={true} disabled>
                    -Choose Department-
                  </option>
                  {services.map((service, key) => (
                    <option key={key} value={service.code} data-route={service.route}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='input-box'>
                <span className='details'>Password</span>
                <input
                  type='text'
                  placeholder='Enter password'
                  name='password'
                  value={user.password || ''}
                  onChange={handleUser}
                  autoComplete='off'
                  required
                />
              </div>
                  <h5 style={{color:"green", textAlign: "center"}}>{response || ""}</h5>
              <div className='button'>
                <input type='submit' value='Register' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
