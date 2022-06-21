import React, { useEffect, useState } from 'react';
import '../App.css'
import { usePaystackPayment } from 'react-paystack';


function Paystack( {pay} ) {
  const [status, setStatus] = useState(false)
  const [payreference, setReference] = useState(false)

  const config = {
    reference: (new Date()).getTime().toString(),
    email: "school@example.com",
    amount: 300000,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
  if (reference.status === 'success'){
    console.log('payment successful')
    setStatus(true)
    setReference(reference)
  }
};


// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);


    return (
      <div>
          <button className='paystack-btn' onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Continue to payment</button>
      </div>
    );
};


  useEffect(()=>{
    if (status && payreference){
      pay(payreference)
    }
      
  })
  return (
    <div className="App">
      
      <PaystackHookExample />
    </div>
  );
}

export default Paystack;