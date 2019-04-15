import React, { Component } from 'react';
import twilio from '../../Twilio/twilio';
import './SMSForm.css';

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: this.props.playlistID,
      phone: '',
      textSent: false
    };
  }

  onHandleChange = event => {
    this.setState({
      phone: event.target.value
    });
  };

  sendText = event => {
    event.preventDefault();
    twilio.sendText(this.state.playlistID, this.state.phone);

    this.showMsg();
    this.resetState();
  };

  showMsg = () => {
    this.setState({
      textSent: true
    });
  };

  resetState = () => {
    setTimeout(() => {
      this.setState({
        textSent: false
      });
    }, 3500);
  };
  render() {
    return (
      <div>
        <h4 className='TextHeader'>Share your music:</h4>
        <form>
          <input
            id='phoneNumber'
            className='TextInput'
            onChange={this.onHandleChange}
            value={this.state.phone}
            placeholder='Enter phone number'
          />
          <button className='TextButton btn btn-success' onClick={this.sendText}>
            Send Text
          </button>
        </form>
        {this.state.textSent ? <p className='message'>Your friend has been texted, keep sharing!</p> : ''}
      </div>
    );
  }
}

export default SMSForm;
