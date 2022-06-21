import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Contact extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div id='contact-page-area'>
          <div className='breadcumb-overlay'></div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 col-sm-12 col-xs-12'>
                <div className='breadcrumb text-center'>
                  <div className='section-headline white-headline text-center'>
                    <h3>Contact</h3>
                  </div>
                  <ul>
                    <li className='home-bread'>Home</li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='contact-area bg-color area-padding'>
          <div className='container'>
            <div className='row'>
              <div className='contact-inner'>
                <div className='col-md-4 col-sm-4 col-xs-12'>
                  <div className='contact-icon text-center'>
                    <div className='single-icon'>
                      <i className='fa fa-mobile'></i>
                      <p>
                        Call our 24/7 call center on
                        <br />
                        <span>+234 700 SAFEPAY</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-md-4 col-sm-4 col-xs-12'>
                  <div className='contact-icon text-center'>
                    <div className='single-icon'>
                      <i className='fa fa-envelope-o'></i>
                      <p>
                        Email :safepay@instantdeposit.africa
                        <br />
                        <span>Web: www.instantdeposit.africa</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-md-4 col-sm-4 col-xs-12'>
                  <div className='contact-icon text-center'>
                    <div className='single-icon'>
                      <i className='fa fa-map-marker'></i>
                      <p>
                        Location : Genesys Tech Hub, KM7, <br />
                        <span>Enugu-Port Harcourt Expressway, Enugu</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 col-sm-6 col-xs-12'>
                <div className='contact-images'>
                  <img src='img/background/sitting.png' alt='' />
                </div>
              </div>
              <div className='col-md-6 col-sm-6 col-xs-12'>
                <div className='contact-form'>
                  <div className='row'>
                    <form
                      id='contactForm'
                      method='POST'
                      action='contact.php'
                      className='contact-form'
                    >
                      <div className='col-md-6 col-sm-6 col-xs-12'>
                        <input
                          type='text'
                          id='name'
                          className='form-control'
                          placeholder='Name'
                          required
                          data-error='Please enter your name'
                        />
                        <div className='help-block with-errors'></div>
                      </div>
                      <div className='col-md-6 col-sm-6 col-xs-12'>
                        <input
                          type='email'
                          className='email form-control'
                          id='email'
                          placeholder='Email'
                          required
                          data-error='Please enter your email'
                        />
                        <div className='help-block with-errors'></div>
                      </div>
                      <div className='col-md-12 col-sm-12 col-xs-12'>
                        <input
                          type='text'
                          id='msg_subject'
                          className='form-control'
                          placeholder='Subject'
                          required
                          data-error='Please enter your message subject'
                        />
                        <div className='help-block with-errors'></div>
                      </div>
                      <div className='col-md-12 col-sm-12 col-xs-12'>
                        <textarea
                          id='message'
                          rows='7'
                          placeholder='Massage'
                          className='form-control'
                          required
                          data-error='Write your message'
                        ></textarea>
                        <div className='help-block with-errors'></div>
                      </div>
                      <div className='col-md-12 col-sm-12 col-xs-12 text-center'>
                        <button
                          type='submit'
                          id='submit'
                          className='add-btn contact-btn'
                        >
                          Send Message
                        </button>
                        <div
                          id='msgSubmit'
                          className='h3 text-center hidden'
                        ></div>
                        <div className='clearfix'></div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
