import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className='footer-1'>
          <div className='footer-area'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-4 col-sm-6 col-xs-12'>
                  <div className='footer-content logo-footer'>
                    <div className='footer-head'>
                      <div className='footer-logo'>
                        <a className='footer-black-logo' href='#'>
                          <img
                            className='logoimg'
                            src='img/logo/logo2.png'
                            alt=''
                          />
                        </a>
                      </div>
                      <p>
                        SafePAY is an innovative seamless digital payment
                        alternative designed for web and USSD. You can now
                        safely perform your financial transactions from
                        anywhere, with or without internet.{' '}
                      </p>
                      <div className='subs-feilds'>
                        <div className='suscribe-input'>
                          <input
                            type='email'
                            className='email form-control width-80'
                            id='sus_email'
                            placeholder='Type Email'
                          />
                          <button
                            type='submit'
                            id='sus_submit'
                            className='add-btn'
                          >
                            Quick Signup
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-2 col-sm-3 col-xs-12'>
                  <div className='footer-content'>
                    <div className='footer-head'>
                      <h4>Products</h4>
                      <ul className='footer-list'>
                        <li>
                          <a href='#'>Cash Deposit</a>
                        </li>
                        <li>
                          <a href='#'>Bill Payments</a>
                        </li>
                        <li>
                          <a href='#'>Cash to Phone</a>
                        </li>
                        <li>
                          <a href='#'>Withdraw Cash</a>
                        </li>
                        <li>
                          <a href='#'>Isusu Contributions </a>
                        </li>
                        <li>
                          <a href='#'>Urgent 2k </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='col-md-2 col-sm-3 col-xs-12'>
                  <div className='footer-content'>
                    <div className='footer-head'>
                      <h4>Payments</h4>
                      <ul className='footer-list'>
                        <li>
                          <a href='#'>Pay School Fees</a>
                        </li>
                        <li>
                          <a href='#'>Pay Health Insurance </a>
                        </li>
                        <li>
                          <a href='#'>Pay any Invoice</a>
                        </li>
                        <li>
                          <a href='#'>Pay for a Friend</a>
                        </li>
                        <li>
                          <a href='#'>Pay local taxes </a>
                        </li>
                        <li>
                          <a href='#'>Pay any bill </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='col-md-2 hidden-sm col-xs-12'>
                  <div className='footer-content'>
                    <div className='footer-head'>
                      <h4>Company</h4>
                      <ul className='footer-list'>
                        <li>
                          <a href='#'>About Us</a>
                        </li>
                        <li>
                          <a href='#'>Products </a>
                        </li>
                        <li>
                          <a href='#'>Payments</a>
                        </li>
                        <li>
                          <a href='#'>Subscriptions</a>
                        </li>
                        <li>
                          <a href='#'>Our Vision</a>
                        </li>
                        <li>
                          <a href='#'>Social Media</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='col-md-2 hidden-sm col-xs-12'>
                  <div className='footer-content last-content'>
                    <div className='footer-head'>
                      <h4>Support</h4>
                      <ul className='footer-list'>
                        <li>
                          <a href='#'>Customer Care</a>
                        </li>
                        <li>
                          <a href='#'>Live chat</a>
                        </li>
                        <li>
                          <a href='#'>Notification</a>
                        </li>
                        <li>
                          <a href='#'>Privacy</a>
                        </li>
                        <li>
                          <a href='#'>Terms & Condition</a>
                        </li>
                        <li>
                          <a href='#'>Contact us </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-area-bottom'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                  <div className='copyright'>
                    <p>
                      Copyright © 2020
                      <a href='https://instantdeposit.africa'>
                        Instant Deposit Ltd
                      </a>{' '}
                      All Rights Reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
