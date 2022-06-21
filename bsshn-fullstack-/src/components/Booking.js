import React, { useState } from 'react';
import './Registration.css';

const services = [
  {
    name: 'registration',
    code: '101',
    amount: 1000,
  },
  {
    name: 'consultation',
    code: '201',
    amount: 2000,
  },
  {
    name: 'admission_deposit',
    code: '301',
    amount: 7000,
  },
  {
    name: 'in_patient_service',
    code: '401',
    amount: 3000,
  },
  {
    name: 'medication',
    code: '501',
    amount: 3000,
  },
  {
    name: 'diagnostics',
    code: '601',
    amount: 2500,
  },
  {
    name: 'laboratory',
    code: '701',
    amount: 4000,
  },
  {
    name: 'emergency',
    code: '801',
    amount: 3200,
  },
  {
    name: 'radiology',
    code: '111',
    amount: 2400,
  },
  {
    name: 'Walk-In',
    code: '411',
    amount: 2100,
  },
];

const Booking = () => {
  const [response, setResponse] = useState(null);
  const [show, setShow] = useState(false);
  const [invoiceServices, setInvoiceServices] = useState([]);
  const [invoiceInfo, setInvoiceInfo] = useState(null);

  const handleMatch = (data) => {
    // let match = services.filter((service) =>
    //   data.some((x) => service.name === x)
    // );
    // setInvoiceServices(match);
    // console.log(match);
    const service_list = Object.keys(data)
    setInvoiceServices(service_list)
    console.log(service_list)
  };

  const [message, setMessage] = useState('');
  const handleCheck = ({ target }) => {
    target.value.length === 19 &&
      fetch('http://localhost:5000/booking/verify', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          invoice: target.value,
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
          if (data.status) {
            console.log(data.data);
            setShow(true);
            setMessage(data.message);
            setInvoiceInfo(data.data);
            handleMatch(data.data.services);
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
    const invoice_service_codes = invoiceServices.map((service) =>
      parseInt(service.code)
    );
    const _data = {
      patientId: invoiceInfo.patient_number,
      services: invoiceServices,
    };

    fetch('http://localhost:5000/booking', {
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
      })
      .catch((err) => {
        console.log(`Error booking patient: ${err}`);
      });
  };

  //2699133019226991330
  return (
    <div>
      <div className='container'>
        <div className='title'>Booking</div>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Patient Invoice No.</span>
                <input
                  type='text'
                  placeholder='Enter appropriate detail'
                  required
                  onChange={handleCheck}
                />
                {message && <small>{message}</small>}
                {<br />}
                {invoiceInfo && (
                  <small>Patient No. {invoiceInfo.patient_number}</small>
                )}
              </div>

              {show && (
                // <div className='input-box'>
                //   <span className='details'>Queue for In-patient Services</span>
                //   <input
                //     type='text'
                //     placeholder='Enter queue number'
                //     required
                //   />
                // </div>
                <div>
                  <h3>Registered Services:</h3>
                  <ol>
                    {invoiceServices.map((service, key) => (
                      <li key={key}>{service.name}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
            
            <h5 style={{color:"green"}}>{response || ""}</h5>
            <div className='button'>
              <input type='submit' value='Book' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
