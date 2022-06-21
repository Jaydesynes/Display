import '../App.css';
import { useState, useEffect } from 'react';
import Paystack from './Paystack';

const Programs = (props) => {
    const [program, setProgram] = useState(false)
    const [showSummary, setShowSummary] = useState(false)
    const [user, setUser] = useState(false)
    const [message, setMessage ] = useState(false)
    const [paymentRef, setPaymentRef] = useState(false)

    const courses = [
      "ENGLISH LANGUAGE",
     "MATHEMATICS",
     "CHEMISTRY",
      "PHYSICS",
      "BIOLOGY",
      "COMMERCE",
      "AGRICULTURE SCIENCE",
      "ECONOMICS",
      "FINANCIAL ACCOUNTING",
      "LITERATURE IN ENGLISH",
      "FURTHER MATHEMATICS",
      "COMPUTER STUDIES",
      "MARKETING",
      "CIVIC EDUCATION",
      "HISTORY",
      "GOVERNMENT",
      "GEOGRAPHY",
      "YORUBA",
      "CHRISTAIN RELIGIOUS STUDIES",
      "ISLAMIC RELIGIOUS STUDIES",
      "DATA PROCESSING",
      "HOME MANAGEMENT"
    ]


    const handleSelect = ({target}) => {
        setProgram(target.value)
    }

    const handlePayment = ( payreference ) => {
      if (payreference) {


       const paymentdetails = {
          email: user.email,
          reference : payreference
        }
        props.startBar()
        //http://localhost:5000/updatepayment 
        // REACT_APP_API_UPDATE_PAYMENT
        fetch(process.env.REACT_APP_API_UPDATE_PAYMENT , {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(paymentdetails),
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
        if (data.status === true){
          console.log(data.data.payment)
          props.stopBar()
          props.payment(data)
        }
      })
      .catch((err) => {
        console.log(`Error updating payment: ${err}`);
      });


      }
      
    }

    useEffect(()=>{
      if (props.user) {
        setUser(props.user)
      }

      if (message){
        setTimeout(() => {
          setMessage(false)
        }, 4000);

      }
    
    },[props.user, message])

    const handleSubmit = (event) => {
        event.preventDefault();

      const  programData = {
          email : user.email,
          program : program
        }
        console.log(programData)
       
        if(program){
        
        props.startBar()
        // "http://localhost:5000/selectprogram"
      // process.env.REACT_APP_API_SELECT_PROGRAM
        fetch(process.env.REACT_APP_API_SELECT_PROGRAM, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(programData),
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
        if (data.status === true){
         
          setShowSummary(true)
          props.stopBar()
        }
      })
      .catch((err) => {
        
        console.log(`Error updating selected course: ${err}`);
        props.stopBar()
      });

    }else {
      setMessage(true)
    }

  }
    
    return(
        <div className='programs-comp'>
           {
          showSummary === true
          ? null
          : 
          <div>
           <p>Choose a program on offer</p>

           {
             message
             ? <small style={ {color : 'red'}}>Please select a program first</small>
             : <small></small>
           }
            <form onSubmit={handleSubmit}>
                <div className='select-course'>
                    <select defaultValue="initial" onChange={handleSelect}>
                        <option value='initial' disabled>--Select--</option>
                        <option>B.Sc Mathematics</option>
                        <option>B.Sc Biology</option>
                        <option>B.Sc Physics</option>
                        <option>B.Sc Accounting</option>
                        <option>B.Sc Computer Science</option>
                        <option>B.Sc Agricultural Science</option>
                        <option>B.Sc Economics</option>
                        <option>B.Sc Anatomy</option>
                    </select>

                </div>
       <div>
            <input
                className='submit course-submit'
                type='submit'
                value='submit and proceed to checkout'
                />
          </div>
       
            </form>
            </div>

        }
        {
          showSummary === true
          ? <div> 
              <div> 
              <h4>You selected {program}</h4>
              <p>Your registration fee is N3,000</p>
              <p>To continue your application process, proceed to checkout</p>
              

              <input
                className='submit course-submit'
                type='submit'
                value='select something else'
                onClick={() => setShowSummary(false)}
                />
          </div>
              <Paystack pay={handlePayment} />

          </div>
         : null

        }
            
        </div>

    )
}
export default Programs;