import React, { Component } from 'react';

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: this.props.playlistID,
      phone: ''
    };
  }

  sendText = (props, phone) => {
    console.log(props);
    console.log(phone);
  };

  onKeyDown = event => {
    event.preventDefault();
    if (event.key === 'Enter' && event.target.value) {
      let phone = document.getElementById('phoneNumber');
      this.setState = {
        phone: phone.value
      };
      phone.value = '';
    }
    this.sendText(this.state.playlistID, this.state.phone);
  };

  render() {
    return (
      <div>
        <form>
          <input id='phoneNumber' />
          <button onClick={this.onKeyDown}>Sent Text</button>
        </form>
      </div>
    );
  }
}

export default SMSForm;
