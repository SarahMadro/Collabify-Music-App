    import React, { Component } from 'react';
    import twilio from '../../Twilio/twilio';

    class SMSForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
        playlistID: this.props.playlistID,
        phone: ''
    };
    }

    sendText = (playlistID, phone) => {
    console.log(playlistID);
    console.log(phone);
    };

    onHandleChange = event =>{
        this.setState ({
            phone: event.target.value 
        })
    }

    sendText = (event) => {
        event.preventDefault();
        twilio.sendText(this.state.playlistID, this.state.phone)
    };

    render() {
    return (
        <div>
        <form>
            <input id='phoneNumber' onChange={this.onHandleChange} value={this.state.phone}  />
            <button onClick={this.sendText} >Sent Text</button>
        </form>
        </div>
    );
    }
    }

    export default SMSForm;