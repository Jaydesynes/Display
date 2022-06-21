import React from 'react';
import Payment from '../components/Payment';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className='slide-area fix'>
          <div className='display-table'>
            <div className='display-table-cell'>
              <div className='container'>
                <div className='row'>
                  <div className='slide-text-inner'>
                    <div className='col-md-6 col-sm-12 col-xs-12'>
                      <div className='slide-content'>
                        <h2 className='title2'>
                          Make payments in two easy secure steps
                        </h2>
                        <p>
                          The safe payment is alternative to power your payments
                          without need for long queues in banking halls or
                          exposing your card details.
                        </p>
                        <div className='layer-1-3'>
                          <a href='contact.html' className='ready-btn'>
                            START HERE
                          </a>
                        </div>
                      </div>
                    </div>

                    <div
                      id='payment-component'
                      className='col-md-6 col-sm-12 col-xs-12'
                    >
                      <div>
                        <Payment />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='about-area bg-color2 area-padding'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 col-sm-6 col-xs-12'>
                <div className='about-image'>
                  <img src='img/about/vd.jpg' alt='' className='ab-first-img' />
                  <img
                    src='img/about/vd1.jpg'
                    alt=''
                    className='ab-second-img'
                  />
                </div>
                <div className='about-image'>
                  <img
                    src='img/about/vd2.jpg'
                    alt=''
                    className='ab-first-img'
                  />
                </div>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                  <div className='about-content'>
                    <h3>
                      Why choose our secure, fast and seamless payment platform?
                    </h3>
                    <p className='hidden-sm'>
                      Would you rather not make and receive payments anywhere
                      and at any time? Why spend time in long queues in banking
                      halls? Why expose your debit card details? We provide you
                      with secure, quick, efficient and seamless financial
                      transactions
                    </p>
                    <div className='about-details'>
                      <div className='single-about'>
                        <a href='#'>
                          <i className='flaticon-079-graphic'></i>
                        </a>
                        <div className='icon-text'>
                          <h5>Accurate Payments</h5>
                          <p>
                            There is no overpayment or underpayment when you use
                            our seamless platform; you pay exactly what you need
                            to
                          </p>
                        </div>
                      </div>
                      <div className='single-about'>
                        <a href='#'>
                          <i className='flaticon-007-document-2'></i>
                        </a>
                        <div className='icon-text'>
                          <h5>Safe & Secure</h5>
                          <p>
                            Your payments on our platform will not expose your
                            sensitive financial information online. Generate
                            your payment reference and use your bank's USSD to
                            pay
                          </p>
                        </div>
                      </div>
                      <div className='single-about'>
                        <a href='#'>
                          <i className='flaticon-107-speech-bubbles'></i>
                        </a>
                        <div className='icon-text'>
                          <h5>Available to anyone</h5>
                          <p>
                            Now, your friends and relatives can now help you pay
                            those fees from anywhere. Just send them your
                            payment reference
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='services-area bg-color area-padding-2'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 col-sm-12 col-xs-12'>
                  <div className='section-headline white-headline text-center'>
                    <h3>The safe payment alternative is here</h3>
                    <p>
                      All your cash transactions have now been made seamless and
                      effortless. Go ahead and enjoy!
                    </p>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-3 col-sm-4 col-xs-12'>
                  <div className='single-service '>
                    <div className='service-img'>
                      <a className='service-icon' href='#'>
                        <i className='flaticon-048-atm'></i>
                      </a>
                    </div>
                    <div className='main-service'>
                      <div className='service-content'>
                        <h4>24/7 Cash Deposit</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-3 col-sm-4 col-xs-12'>
                  <div className='single-service '>
                    <div className='service-img'>
                      <a className='service-icon' href='#'>
                        <i className='flaticon-103-buildings'></i>
                      </a>
                    </div>
                    <div className='main-service'>
                      <div className='service-content'>
                        <h4>Pay School Fees</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-3 col-sm-4 col-xs-12'>
                  <div className='single-service '>
                    <div className='service-img'>
                      <a className='service-icon' href='#'>
                        <i className='flaticon-067-shopping-cart-1'></i>
                      </a>
                    </div>
                    <div className='main-service'>
                      <div className='service-content'>
                        <h4>Shop with ease</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-3 col-sm-4 col-xs-12'>
                  <div className='single-service '>
                    <div className='service-img'>
                      <a className='service-icon' href='#'>
                        <i className='flaticon-040-mobile-phone-4'></i>
                      </a>
                    </div>
                    <div className='main-service'>
                      <div className='service-content'>
                        <h4>Send money to phone</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-offset-3 col-md-3 col-sm-4 col-xs-12'>
                  <div className='single-service '>
                    <div className='service-img'>
                      <a className='service-icon' href='#'>
                        <i className='flaticon-109-credit-card'></i>
                      </a>
                    </div>
                    <div className='main-service'>
                      <div className='service-content'>
                        <h4>Enjoy Rewards</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-3 col-sm-4 col-xs-12'>
                  <div className='single-service '>
                    <div className='service-img'>
                      <a className='service-icon' href='#'>
                        <i className='flaticon-091-mobile-phone-2'></i>
                      </a>
                    </div>
                    <div className='main-service'>
                      <div className='service-content'>
                        <h4>Pay any Bill</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='overview-area bg-color fix area-padding'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 col-sm-6 col-xs-12'>
                <div className='overview-content'>
                  <div className='overview-images'>
                    <img src='img/about/ladypay2crop.jpg' alt='' />
                  </div>
                </div>
              </div>
              <div className='col-md-6 col-sm-6 col-xs-12'>
                <div className='overview-text'>
                  <h3>
                    SafePAY can benefit your organization in several ways you
                    may not have imagined
                  </h3>
                  <p>
                    We understand the unique challenges facing organizations
                    regarding receiving payments. Payments need not be a hassle
                    for you and your stakeholders.
                  </p>
                  <ul>
                    <li>
                      <a href='#'>
                        We save you the stress of manually tracking payments
                        from bank statements and WhatsApp messages
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        For every payment made to you, we send you instant
                        notification with all relevant details
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        We give you executive dashboard to monitor all your
                        payments
                      </a>
                    </li>
                  </ul>
                  <a className='overview-btn' href='signup.html'>
                    Signup today
                  </a>
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

export default Home;
