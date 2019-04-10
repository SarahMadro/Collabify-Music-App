import axios from 'axios';


const Twilio  = {

    sendText(playlistID, phone) {
        console.log("twilios.js", phone)
        return axios.get('/sendtext', { params: { playlistID: playlistID, phone: phone }})
    }
}
export default Twilio;