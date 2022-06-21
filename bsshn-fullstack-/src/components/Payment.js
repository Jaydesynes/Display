import React, { useState, useEffect } from 'react';
import './Registration.css';

const Payment = () => {
  const [show, setShow] = useState(false);
  const [paid, setPaid] = useState(false)
  const [services, setServices] = useState(null);
  const [amount, setAmount] = useState(0);
  const [response, setResponse] = useState(null)


  // confirm invoice
  const [message, setMessage] = useState('');
  const handleCheck = ({ target }) => {

    target.value.length === 19 &&
      fetch('/payment/getinvoice', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({ invoice: target.value }),
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
            console.log("found")
            // console.log(data.data.services);

            // data.data.services && handleGetServices(data.data.services);

            // console.log(data.data.services)
            const list = data.data.services;
            setServices(Object.keys(list))
            setAmount(data.data.amount)
            // console.log(data.data.amount)
            // console.log("CHeking keys")
            // console.log(Object.keys(data.data.services));
          } else {
            setShow(false);
            setMessage(data.message);
          }
        })
        .catch((err) => {
          console.log(`Error getting invoice: ${err}`);
        });
  };

// get user services

  const handleGetServices = ({target},services) => {
    const list = services;

    fetch("http://localhost:5000/payment/getinvoice", {
      method: 'POST',
      credentials: 'same-origin',
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
        if (data) {
          // const newlist = data.filter((service) => list.includes(service.code));
          const newlist = Object.keys(services)
          // console.log(services)
          console.log(newlist)
          setServices(newlist);
          // setAmount(data.data.amount)
          console.log(data.data.amount)
          // console.log(data)
        }
      })
      .catch((err) => {
        console.log(`Error getting invoice: ${err}`);
      });
  };


  // useEffect(() => {
  //   services &&
  //     // services.map((service) =>
  //     //   setAmount((prev) => parseInt(prev) + parseInt(service.amount))
  //     // );
  //     // setAmount()
  // }, [services]);

  // handle payment
  const [invoice, setInvoice] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const _data = invoice;
    fetch('/payment/updatepayment', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ invoice: _data }),
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
        if (data.status) {
          setPaid(data.message);
        } else {
          setPaid(data.message);
        }
      })
      .catch((err) => {
        console.log(`Error during payment: ${err}`);
      });
  };
  return (
    <div>
      <div className='container'>
        <div className='title'>Payment</div>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='user-details'>
              <div className='input-box'>
                <span className='details'>Invoice Number</span>
                <input
                  type='text'
                  placeholder='Enter invoice'
                  required
                  value={invoice || ''}
                  onChange={(evt) => {
                    handleCheck(evt);
                    setInvoice(evt.target.value);
                  }}
                />
                {message && <small>{message}</small>}
              </div>
            </div>

            {show ? (
              <div className='user-details'>
                <div>
                  <ul>
                    {services &&
                      services.map((service, ikey) => (
                        <li key={ikey}>* {service}</li>
                      ))}
                  </ul>
                </div>
                <hr />
                <div className='input-box'>
                  <span className='details'>Amount (₦)</span>
                  <input
                    type='text'
                    value={`₦ ${amount}`}
                    disabled={true}
                    required
                  />
                </div>
              </div>
            ) : null}
            {paid && <small>{paid}</small>}
            <div className='button'>
              <input type='submit' value='Paid' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
