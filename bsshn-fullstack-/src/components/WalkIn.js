import React, { useState } from 'react';
import './Registration.css';

const WalkIn = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);

  const [walkinInfo, setWalkinInfo] = useState({});
  const handleWalkinInfo = ({ target }) => {
    setWalkinInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleCheck = ({ target }) => {
    target.value.length === 8 &&
      fetch(`${process.env.REACT_APP_API_VERIFY}`, {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          patientId: parseInt(target.value),
          userId: parseInt('111'),
        }),
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
          // console.log(data);
          if (data.status) {
            setShow(true);
            setMessage(false);
            // console.log(data.data);
          } else {
            setShow(false);
            setMessage(data.message);
          }
        })
        .catch((err) => {
          console.log(`Error getting invoice: ${err}`);
        });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const _data = walkinInfo;
    //   `${process.env.REACT_APP_API_WALKIN`;
    fetch(`${process.env.REACT_APP_API_WALKIN}`, {
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
      })
      .catch((err) => {
        console.log(`Error updating walkin: ${err}`);
      });

    // console.log(_data);
  };

  return (
    <div>
      <div className='container'>
        <div className='title'>Others/Walk-in Services</div>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Phone/Patient No. or Surname</span>
                <input
                  type='text'
                  placeholder='Enter appropriate detail'
                  name='patientId'
                  onChange={(evt) => {
                    handleCheck(evt);
                    handleWalkinInfo(evt);
                  }}
                  required
                />
              </div>
              {message && <small>{message}</small>}
            </div>

            {show ? (
              <div className='user-details'>
                <div className='input-box'>
                  <span className='details'>Invoice</span>
                  <input
                    type="text"
                    placeholder='Enter Invoice'
                    name='invoice'
                    onChange={handleWalkinInfo}
                    value={walkinInfo.invoice || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Investigation</span>
                  <textarea
                    rows='5'
                    column='10'
                    placeholder='Enter Investigation'
                    name='investigation_entry'
                    onChange={handleWalkinInfo}
                    value={walkinInfo.investigation_entry || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Service Description</span>
                  <textarea
                    rows='5'
                    column='10'
                    placeholder='Enter Service Description'
                    name='service_des'
                    onChange={handleWalkinInfo}
                    value={walkinInfo.service_des || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Result/Outcome</span>
                  <textarea
                    rows='5'
                    column='10'
                    placeholder='Enter Result'
                    name='result'
                    onChange={handleWalkinInfo}
                    value={walkinInfo.result || ''}
                    required
                  />
                </div>

                <div className='input-box'>
                  <span className='details'>Remarks </span>
                  <textarea
                    rows='5'
                    column='10'
                    placeholder='Enter Remark'
                    name='remark'
                    onChange={handleWalkinInfo}
                    value={walkinInfo.remark || ''}
                    required
                  />
                </div>
              </div>
            ) : null}

            <div className='button'>
              <input type='submit' value='Enter' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WalkIn;
