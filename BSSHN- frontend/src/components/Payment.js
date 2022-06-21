import React, {useState} from 'react'
import './Registration.css'

const Payment = () => {
  const [show, setShow] = useState(false)
    return (
    <body>
      <div className="container">
    <div className="title">Payment</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Phone/Patient No. or Surname</span>
            <input type="text" placeholder="Enter appropriate detail" required onClick={()=>setShow(!show)}/>
          </div>
          </div>

        {show ?
        <div className="user-details">

            <div className="input-box">
            <span className="details">Select Service type being paid for</span>
            <select type="text" placeholder="Select Service Type" required>
              <option>Select Service</option>
              <option>Registration</option>
              <option>Consultation</option>
              <option>Admission Deposit</option>
              <option>In Patient Services;
                        Ward Fee
                        Nursing
                        Procedure
                        Chart File
              </option>
              <option>Medications</option>
              <option>Diagnosis</option>
              <option>Other Services</option>
              <option>Insurance Subscription</option>
              
            </select>
          </div>

          <div className="input-box">
            <span className="details">Amount</span>
            <input type="text" placeholder="Enter amount" required/>
          </div>

          <div className="input-box">
            <span className="details">Notes</span>
            <input type="text"  required/>
          </div> 
        </div>
        :null
        }
        
        <div className="button">
          <input type="submit" value="Paid"/>
        </div>
      </form>
    </div>
  </div>
</body>
      
    )
}

export default Payment
