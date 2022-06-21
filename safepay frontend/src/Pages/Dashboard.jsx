import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className='page-area'>
          <div className='breadcumb-overlay'></div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 col-sm-12 col-xs-12'>
                <div className='breadcrumb text-center'>
                  <div className='section-headline white-headline text-center'>
                    <h3>Dashboard</h3>
                  </div>
                  <ul>
                    <li className='home-bread'>Home</li>
                    <li>Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='dsahboard-area bg-color area-padding'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 col-sm-12 col-xs-12'>
                <div className='dashboard-head'>
                  <div className='row'>
                    <div className='col-md-3 col-sm-3 col-xs-12'>
                      <div className='single-dash-head'>
                        <div className='dashboard-profile'>
                          <div className='profile-content'>
                            <img
                              className='logoimg'
                              src='img/about/profile.png'
                              alt=''
                            />
                            <span className='pro-name'>Melody Ameh</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-3 col-xs-12'>
                      <div className='single-dash-head'>
                        <div className='dashboard-amount'>
                          <div className='amount-content'>
                            <i className='flaticon-028-money'></i>
                            <span className='pro-name'>
                              Total Payments: NGN1,000,250
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-3 col-xs-12'>
                      <div className='single-dash-head'>
                        <div className='dashboard-amount'>
                          <div className='amount-content'>
                            <a className='edit-icon' href='a-add-bank.html'>
                              <i className='ti-pencil-alt'></i>
                            </a>
                            <i className='flaticon-043-bank-2'></i>
                            <span className='pro-name'>
                              Total Remitted: NGN950,000
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-3 col-xs-12'>
                      <div className='single-dash-head'>
                        <div className='dashboard-amount'>
                          <div className='amount-content'>
                            <a className='edit-icon' href='a-card-number.html'>
                              <i className='ti-pencil-alt'></i>
                            </a>
                            <i className='flaticon-050-credit-card-2'></i>
                            <span className='pro-name'>Balance: NGN50,250</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-3 col-sm-3 col-xs-12'>
                <aside className='sidebar'>
                  <div className='dashboard-side'>
                    <ul>
                      <li className='active'>
                        <a href='a-dashboard.html'>
                          <i className='ti-dashboard'></i>Dashboard
                        </a>
                      </li>
                      <li>
                        <a href='a-transection-log.html'>
                          <i className='ti-new-window'></i>Transactions
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='ti-receipt'></i>Payouts
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='ti-import'></i>Personal Info
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='ti-wallet'></i>Business Info
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='ti-stats-up'></i>Payment Setup
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='ti-pencil-alt'></i>Create Sub Accounts
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='ti-credit-card'></i>Provide Feedback
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='ti-layout-list-thumb'></i>Audit Trail
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='ti-settings'></i>Settings
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='dashboard-support'>
                    <div className='support-inner'>
                      <div className='help-support'>
                        <i className='flaticon-107-speech-bubbles'></i>
                        <a href='contact.html'>
                          <span className='help-text'>Need Help?</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              <div className='col-md-9 col-sm-9 col-xs-12'>
                <div className='dashboard-content'>
                  <h3 style={{ textAlign: 'center' }}>
                    Graphs to be displayed here
                  </h3>
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
