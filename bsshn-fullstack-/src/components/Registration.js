import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
  const [message, setMessage] = useState("");

  const [patientRegInfo, setPatientRegInfo] = useState({});
  const handleReg = ({ target }) => {
    setPatientRegInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const _regData = patientRegInfo;

    // ${process.env.REACT_APP_API_REGISTRATION}
    fetch("http://localhost:5000/registration", {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(_regData),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json, charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      })
      .catch((err) => {
        console.log(`Error during registration: ${err}`);
      });

    // console.log(_regData)
  };

  return (
    <div>
      <div className='container'>
        <div className='title'>Registration</div>
        <div className='content'>
          <form method='POST' onSubmit={handleSubmit}>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Surame</span>
                <input
                  type='text'
                  placeholder='Enter your Surname'
                  name='surname'
                  value={patientRegInfo.surname || ''}
                  onChange={handleReg}
                  required
                />
              </div>
              <div className='input-box'>
                <span className='details'>Other names</span>
                <input
                  type='text'
                  placeholder='Enter your other names'
                  name='other_name'
                  value={patientRegInfo.other_name || ''}
                  onChange={handleReg}
                  required
                />
              </div>
              <div className='input-box'>
                <span className='details'>Age</span>
                <input
                  type='text'
                  placeholder='Enter your Age'
                  name='age'
                  value={patientRegInfo.age || ''}
                  onChange={handleReg}
                  required
                />
              </div>

              <div className='input-box'>
                <span className='details'>
                  <input
                    type='radio'
                    name='gender'
                    id='dot-1'
                    value='male'
                    onChange={handleReg}
                  />
                  <input
                    type='radio'
                    name='gender'
                    id='dot-2'
                    value='female'
                    onChange={handleReg}
                  />

                  <span className='gender-title'>Gender</span>
                  <div className='category'>
                    <label htmlFor='dot-1'>
                      <span className='dot one'></span>
                      <span className='gender'>Male</span>
                    </label>
                    <label htmlFor='dot-2'>
                      <span className='dot two'></span>
                      <span className='gender'>Female</span>
                    </label>
                  </div>
                </span>
              </div>

              <div className='input-box'>
                <span className='details'>Occupation</span>
                <input
                  type='text'
                  placeholder='Enter your occupation'
                  name='occupation'
                  value={patientRegInfo.occupation || ''}
                  onChange={handleReg}
                  required
                />
              </div>

              <div className='input-box'>
                <span className='details'>Phone Number</span>
                <input
                  type='text'
                  placeholder='Enter your number'
                  value={patientRegInfo.phone || ''}
                  onChange={handleReg}
                  name='phone'
                  required
                />
              </div>

              <div className='input-box'>
                <span className='details'>Home Address</span>
                <input
                  type='text'
                  placeholder='Enter your address'
                  name='home_address'
                  value={patientRegInfo.home_address || ''}
                  onChange={handleReg}
                  required
                />
              </div>

              <div className='input-box'>
                <span className='details'>State</span>
                <select
                  type='text'
                  placeholder='Enter your state'
                  name='state'
                  value={patientRegInfo.state || ''}
                  onChange={handleReg}
                  required
                >
                  <option>Select State</option>
                  <option>Abia</option>
                  <option>Adamawa</option>
                  <option>Akwa Ibom</option>
                  <option>Anambra</option>
                  <option>Bauchi</option>
                  <option>Bayelsa</option>
                  <option>Benue</option>
                  <option>Borno</option>
                  <option>Cross River</option>
                  <option>Delta</option>
                  <option>Ebonyi</option>
                  <option>Edo</option>
                  <option>Ekiti</option>
                  <option>Enugu</option>
                  <option>Gombe</option>
                  <option>Imo</option>
                  <option>Jigawa</option>
                  <option>Kaduna</option>
                  <option>Kano</option>
                  <option>Katsina</option>
                  <option>Kebbi</option>
                  <option>Kogi</option>
                  <option>Kwara</option>
                  <option>Lagos</option>
                  <option>Nassarawa</option>
                  <option>Niger</option>
                  <option>Ogun</option>
                  <option>Ondo</option>
                  <option>Osun</option>
                  <option>Oyo</option>
                  <option>Plateau</option>
                  <option>Rivers</option>
                  <option>Sokoto</option>
                  <option>Taraba</option>
                  <option>Yobe</option>
                  <option>Zamfara</option>
                </select>
              </div>

              <div className='input-box'>
                <span className='details'>Emergency Contact Name</span>
                <input
                  type='text'
                  placeholder='Enter emergency contact'
                  name='emergency_name'
                  value={patientRegInfo.emergency_name || ''}
                  onChange={handleReg}
                  required
                />
              </div>

              <div className='input-box'>
                <span className='details'>Emergency Contact Number</span>
                <input
                  type='text'
                  placeholder='Enter emergency number'
                  name='emergency_contact'
                  value={patientRegInfo.emergency_contact || ''}
                  onChange={handleReg}
                  required
                />
              </div>
              {/* <div className="input-box">
            <span className="details">Date</span>
            <input type="datetime-local" placeholder="Enter Date" required/>
          </div> */}
            </div>

            {message && <div>{message}</div>}

            <div className='button'>
              <input type='submit' value='Register' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
