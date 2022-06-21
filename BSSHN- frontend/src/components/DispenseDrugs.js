import React, {useState} from 'react'
import './Registration.css'

const DispenseDrugs = () => {
  const [show, setShow] = useState(false)
    return (
        <body>
            <div className="container">
    <div className="title">Dispensation of Drugs</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Phone/Patient No. or Surname</span>
            <input type="text" placeholder="Enter appropriate detail" onClick={()=> setShow(!show)} required/>
          </div>
          </div>

        {show ?
        <div className="user-details">
          <div className="input-box">
            <span className="details">Medications Given</span>
            <input type="text" placeholder="Enter Medications Given" required/>
          </div>

          <div className="input-box">
            <span className="details">Dosage</span>
            <input type="text" placeholder="Enter Dosage" required />
          </div>

          <div className="input-box">
            <span className="details">Duration</span>
            <input type="text" placeholder="Enter Duration" required />
          </div>

          <div className="input-box">
            <span className="details">Remarks </span>
            <input type="text" placeholder="" required />
          </div>
    </div>
        :null }
        <div className="button">
          <input type="submit" value="Enter"/>
        </div>
      </form>
    </div>
  </div>   
        </body>
    )
}

export default DispenseDrugs
