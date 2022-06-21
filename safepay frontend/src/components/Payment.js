import React from 'react';

class Payment extends React.Component {
  state = {
    checked: false,
    message: {},
    pay_ref: null,
    send_ref: false,
    found: false,
    notFound: false,
    api_type_list: null,
  };

  UNSAFE_componentWillMount() {
    fetch('https://safe-payy.herokuapp.com/coralpay/pos/user/paymenttype', {
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'fidelity_idl-8Xrd9PAYsafX_e5CfFmq137w5',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ api_type_list: data.data });
      })
      .catch((err) => {
        console.log('error retrieving data', err);
      });
  }

  handleChecked = () => {
    this.setState({ checked: !this.state.checked });
  };

  onInputChange = ({ target }) => {
    this.setState({ ...this.state, [target.name]: target.value });
  };

  handleSendRef = ({ target }) => {
    target.value.length === target.maxLength &&
      this.setState({ send_ref: true });
  };

  handlePaymentInfo = ({ target }) => {
    target.value.length === target.maxLength &&
      fetch(
        `https://safe-payy.herokuapp.com/coralpay/verify/user/${this.state.payment_type}/${target.value}`,
        {
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'fidelity_idl-8Xrd9PAYsafX_e5CfFmq137w5',
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            // console.log(data.data);
            this.setState({
              message: data.data,
              found: true,
              notFound: false,
              pay_ref: null,
            });
          } else {
            // console.log(data.message);
            this.setState({
              found: false,
              notFound: true,
              message: {},
              pay_ref: null,
            });

            let timeoutID = setTimeout(() => {
              this.setState({ notFound: false });
            }, 10000);

            // clearTimeout(timeoutID);
          }
        })
        .catch((err) => {
          console.log('error retrieving payment_info', err);
        });
  };

  handleContinue = () => {
    let _data = {
      customer_id: this.state.message.reference,
      POS_id: this.state.payment_type,
      customer_phone: this.state.phone_no || '',
      // amount: this.state.message.reference || '',
      payment_channel: 'WEB',
    };
    fetch(
      'https://safe-payy.herokuapp.com/coralpay/pos/paymentreference/generate',
      {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(_data),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json, charset=UTF-8',
          'x-access-token': 'fidelity_idl-8Xrd9PAYsafX_e5CfFmq137w5',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          pay_ref: data,
          found: false,
        });

        let timeoutID = setTimeout(() => {
          this.setState({
            checked: false,
            send_ref: false,
            message: {},
            payment_type: '',
            phone_no: '',
            ref_no: '',
          });
        }, 10000);
      })
      .catch((err) => {
        console.log(`Error generating payment reference: ${err}`);
      });
  };

  render() {
    return (
      <div className='money-send'>
        <div className='calculator-inner'>
          <div className='single-cal'>
            <div className='inner-form'>
              <form action='/#'>
                <label>Select your payment</label>
                <select
                  className='form-select form-input'
                  style={{ color: 'black', padding: 5 }}
                  id='select-input'
                  name='payment_type'
                  value={this.state.payment_type || ''}
                  onChange={this.onInputChange}
                >
                  <option value='' disabled={true}>
                    ---
                  </option>
                  {/* {Object.keys(payment_type_api).map((type, idx) => (
                        <option key={idx} value={payment_type_api[type]}>{payment_type_api[type]}</option>
                      ))} */}
                  {(this.state.api_type_list || []).map((option, idx) => (
                    <option key={idx} value={option.POS_id}>
                      {option.business_name}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <div className='form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                style={{ marginRight: 5 }}
                id='dropdownCheck'
                checked={this.state.checked}
                onChange={this.handleChecked}
              />
              <label htmlFor='dropdownCheck' className='form-check-label'>
                Send me the payment reference
              </label>
            </div>
            <input
              className='form-control form-input'
              type='text'
              name='phone_no'
              value={this.state.phone_no || ''}
              id='text'
              placeholder='Enter Phone Number'
              style={
                this.state.checked ? { display: 'block' } : { display: 'none' }
              }
              maxLength={11}
              onChange={(ev) => {
                this.onInputChange(ev);
                this.handleSendRef(ev);
              }}
              disabled={this.state.payment_type ? false : true}
            />
            <div
              style={
                this.state.checked ? { display: 'block' } : { display: 'none' }
              }
            >
              {this.state.send_ref && 'sent...'}
            </div>

            <div className='inner-form'>
              <div action='#'>
                <label style={{ marginTop: 10 }}>
                  Enter Registration Number
                </label>
                <input
                  value={this.state.ref_no || ''}
                  name='ref_no'
                  onChange={(ev) => {
                    this.onInputChange(ev);
                    this.handlePaymentInfo(ev);
                  }}
                  style={{ color: 'black' }}
                  type='text'
                  className='form-input'
                  placeholder='Enter Ref Number'
                  maxLength={10}
                  autoComplete='off'
                  disabled={this.state.payment_type ? false : true}
                />
              </div>
            </div>

            <div
              style={{ textAlign: 'center' }}
              className='inner-form-text'
              id='payment_status'
            >
              {this.state.found && (
                <div>
                  {' '}
                  You are about to pay{' '}
                  <strong>N {this.state.message.total_amount} </strong> for{' '}
                  {this.state.message.Name} being {this.state.message.subject}{' '}
                  fees.
                </div>
              )}
              {this.state.notFound && (
                <div style={{ color: 'red' }}>
                  {' '}
                  Reference number does not exist!
                </div>
              )}
              {this.state.pay_ref && (
                <div style={{ color: 'green' }}>
                  <div>{this.state.pay_ref.message}</div>
                  <div>
                    <strong>{this.state.pay_ref.data}</strong>
                  </div>
                </div>
              )}
            </div>

            <button
              className='cale-btn'
              disabled={this.state.found ? false : true}
              onClick={this.handleContinue}
            >
              Continue
            </button>
            <div className='terms-text'>
              <p>
                By clicking continue, I am agree with{' '}
                <a href='/#'>Terms & Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
