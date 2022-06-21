import React, {useState} from 'react'
import './Registration.css'

const Admission = () => {
  const [show, setShow] = useState(false)
    return (
        <body>
            <div className="container">
    <div className="title">Admission</div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Phone/Patient No. or Surname</span>
            <input type="text" placeholder="Enter appropriate detail" onClick={()=> setShow(!show)}required/>
          </div>
          </div>

        {show ?
        <div className="user-details">

          <div className="input-box">
            <span className="details">Assign Ward</span>
            <input type="text" placeholder="Enter Ward" required/>
          </div>

          <div className="input-box">
            <span className="details">Assign Bed</span>
            <input type="text" placeholder="Enter Bed" required/>
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

export default Admission
