import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <header className='header-one'>
          <div className='topbar-area'>
            <div className='container'>
              <div className='row'>
                <div className=' col-md-6 col-sm-6 col-xs-12'>
                  <div className='topbar-left'>
                    <ul>
                      <li>
                        <a href='#'>
                          <i className='fa fa-envelope'></i>{' '}
                          safepay@instantdeposit.africa
                        </a>
                      </li>
                      <li>
                        <a href='#'>
                          <i className='fa fa-clock-o'></i> Live support
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                  <div className='topbar-right'>
                    <ul>
                      <li>
                        <a href='#'>
                          <img src='img/icon/w1.png' alt='' />
                          ENG
                        </a>
                        <ul>
                          <li>
                            <a href='#'>
                              <img src='img/icon/w2.png' alt='' />
                              DEU
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon/w3.png' alt='' />
                              ESP
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon/w4.png' alt='' />
                              FRA
                            </a>
                          </li>
                          <li>
                            <a href='#'>
                              <img src='img/icon/w5.png' alt='' />
                              KSA
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='sticker' className='header-area hidden-xs'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 col-sm-12'>
                  <div className='row'>
                    <div className='col-md-3 col-sm-3'>
                      <div className='logo'>
                        <a className='navbar-brand page-scroll' href='/'>
                          <img
                            className='logoimg'
                            src='img/logo/logo2.png'
                            alt=''
                          />
                        </a>
                      </div>
                    </div>
                    <div className='col-md-9 col-sm-9'>
                      <div className='header-right-link'>
                        <a className='s-menu' href='/login'>
                          Login
                        </a>
                      </div>
                      <nav className='navbar navbar-default'>
                        <div
                          className='collapse navbar-collapse'
                          id='navbar-example'
                        >
                          <div className='main-menu'>
                            <ul className='nav navbar-nav navbar-right'>
                              <li>
                                <NavLink to={'/'}>Home</NavLink>
                              </li>

                              <li>
                                <NavLink to='/contact'>Contact</NavLink>
                              </li>
                              <li>
                                <NavLink to='/dashboard'>Dashboard</NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mobile-menu-area hidden-lg hidden-md hidden-sm'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='mobile-menu'>
                    <div className='logo'>
                      <a href='index.html'>
                        <img src='img/logo/logo2.png' alt='' />
                      </a>
                    </div>
                    <nav id='dropdown'>
                      <ul>
                        <li>
                          <a className='pages' href='/'>
                            Home
                          </a>
                          <ul className='sub-menu'>
                            <li>
                              <a href='/'>Home 01</a>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a href='/contact'>contacts</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}
