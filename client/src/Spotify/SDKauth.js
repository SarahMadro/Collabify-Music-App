
// import axios from 'axios';
// //implicit grant flow
// // Get the hash of the url
// const hash = window.location.hash
//   .substring(1)
//   .split('&')
//   .reduce(function (initial, item) {
//     if (item) {
//       var parts = item.split('=');
//       initial[parts[0]] = decodeURIComponent(parts[1]);
//     }
//     return initial;
//   }, {});
// window.location.hash = '';

// // Set token
// let _token = hash.access_token;

// const authEndpoint = 'https://accounts.spotify.com/authorize';

// // Replace with your app's client ID, redirect URI and desired scopes
// const clientId = 'ab3efed3813144cba3ffa461eddaee9f';
// const redirectUri = 'http://localhost:3000';
// const scopes = [
//   'streaming',
//   'user-read-birthdate',
//   'user-read-private',
//   'user-modify-playback-state'
// ];

// // If there is no token, redirect to Spotify authorization
// if (!_token) {
//   window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
// }

// // Set up the Web Playback SDK

// window.onSpotifyPlayerAPIReady = () => {
//   const player = new Spotify.Player({
//     name: 'Web Playback SDK Template',
//     getOAuthToken: cb => {
//       cb(_token);
//     }
//   });

//   // Error handling
//   player.on('initialization_error', e => console.error(e));
//   player.on('authentication_error', e => console.error(e));
//   player.on('account_error', e => console.error(e));
//   player.on('playback_error', e => console.error(e));

//   // Playback status updates
//   player.on('player_state_changed', state => {
//     console.log(state)
//     $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
//     $('#current-track-name').text(state.track_window.current_track.name);
//   });

//   // Ready
//   player.on('ready', data => {
//     console.log('Ready with Device ID', data.device_id);

//     // Play a track using our new device ID
//     play(data.device_id);
//   });

//   // Connect to the player!
//   player.connect();
// }

// // Play a specified track on the Web Playback SDK's device ID
// function play(device_id) {
//   axios.put({
//     url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
//     data: '',
//     beforeSend: function (xhr) {
//       xhr.setRequestHeader('Authorization', 'Bearer ' + _token);
//     },
//     success: function (data) {
//       console.log(data)
//     }
//   });
// }




// export default SDKauth;