import React from 'react';
import './Registration.css';

const Emergency = () => {
  return (
    <body>
      <div className='container'>
        <div className='title'>Emergency/ICU</div>
        <div className='content'>
          <form action='#'>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Surame</span>
                <input type='text' placeholder='Enter your Surname' required />
              </div>
              <div className='input-box'>
                <span className='details'>Other names</span>
                <input
                  type='text'
                  placeholder='Enter your other names'
                  required
                />
              </div>
              <div className='input-box'>
                <span className='details'>Age</span>
                <input type='text' placeholder='Enter your Age' required />
              </div>

              <div className='input-box'>
                <span className='details'>
                  <input type='radio' name='gender' id='dot-1' />
                  <input type='radio' name='gender' id='dot-2' />

                  <span className='gender-title'>Gender</span>
                  <div className='category'>
                    <label for='dot-1'>
                      <span className='dot one'></span>
                      <span className='gender'>Male</span>
                    </label>
                    <label for='dot-2'>
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
                  required
                />
              </div>

              <div className='input-box'>
                <span className='details'>Phone Number</span>
                <input type='text' placeholder='Enter your number' required />
              </div>

              <div className='input-box'>
                <span className='details'>Home Address</span>
                <input type='text' placeholder='Enter your address' required />
              </div>

              <div className='input-box'>
                <span className='details'>State</span>
                <select type='text' placeholder='Enter your state' required>
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
                  required
                />
              </div>

              <div className='input-box'>
                <span className='details'>Emergency Contact Number</span>
                <input
                  type='text'
                  placeholder='Enter emergency number'
                  required
                />
              </div>
              <div className='input-box'>
                <span className='details'>Date</span>
                <input
                  type='datetime-local'
                  placeholder='Enter Date'
                  required
                />
              </div>
            </div>

            <div className='button'>
              <input type='submit' value='Register' />
            </div>
          </form>
        </div>
      </div>
    </body>
  );
};

export default Emergency;
