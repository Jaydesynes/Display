import React, {useState} from 'react'
import './Registration.css'

const Booking = () => {
  const [show, setShow] = useState(false)
    return (
        <body>
            <div className="container">
    <div className="title">Booking</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Phone/Patient No. or Surname</span>
            <input type="text" placeholder="Enter appropriate detail" required onClick={()=>setShow(!show)}/>
          </div>

              {
                show? 
          <div className="input-box">
            <span className="details">Queue for In-patient Services</span>
            <input type="text" placeholder="Enter queue number" required/>
          </div> : null
        }
    </div>

          <div className="button">
          <input type="submit" value="Book"/>
        </div>

        </form>
    </div>
</div>

        </body>
    )
}

export default Booking
