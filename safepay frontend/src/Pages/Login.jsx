import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <div class='login-area area-padding fix'>
          <div class='login-overlay'></div>
          <div class='table'>
            <div class='table-cell'>
              <div class='container'>
                <div class='row'>
                  <div class='col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-12'>
                    <div class='login-form'>
                      <h4 class='login-title text-center'>LOGIN</h4>
                      <div class='row'>
                        <form id='contactForm' method='GET' class='log-form'>
                          <div class='col-md-12 col-sm-12 col-xs-12'>
                            <input
                              type='text'
                              id='name'
                              class='form-control'
                              placeholder='Username'
                              required
                              data-error='Please enter your name'
                              autoComplete='off'
                            />
                          </div>
                          <div class='col-md-12 col-sm-12 col-xs-12'>
                            <input
                              type='password'
                              id='msg_subject'
                              class='form-control'
                              placeholder='Password'
                              required
                              data-error='Please enter your message subject'
                            />
                          </div>
                          <div class='col-md-12 col-sm-12 col-xs-12 text-center'>
                            <div class='check-group flexbox'>
                              <label class='check-box'>
                                <input
                                  type='checkbox'
                                  class='check-box-input'
                                  checked
                                />
                                <span class='remember-text'>Remember me</span>
                              </label>

                              <a class='text-muted' href='#'>
                                Forgot password?
                              </a>
                            </div>
                          </div>
                          <div class='col-md-12 col-sm-12 col-xs-12 text-center'>
                            <button
                              type='submit'
                              id='submit'
                              class='slide-btn login-btn'
                            >
                              Login
                            </button>
                            <div
                              id='msgSubmit'
                              class='h3 text-center hidden'
                            ></div>
                            <div class='clearfix'></div>
                          </div>
                          <div class='col-md-12 col-sm-12 col-xs-12 text-center'>
                            <div class='clear'></div>
                            <div class='separetor text-center'>
                              <span>Or with Sign</span>
                            </div>
                            <div class='sign-icon'>
                              <ul>
                                <li>
                                  <a class='facebook' href='#'>
                                    <i class='ti-facebook'></i>
                                  </a>
                                </li>
                                <li>
                                  <a class='twitter' href='#'>
                                    <i class='ti-twitter'></i>
                                  </a>
                                </li>
                                <li>
                                  <a class='google' href='#'>
                                    <i class='ti-google'></i>
                                  </a>
                                </li>
                              </ul>
                              <div class='acc-not'>
                                Don't have an account?{' '}
                                <a href='/signup'>Sign up</a>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
