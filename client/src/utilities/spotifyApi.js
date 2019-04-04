// function getHashParams() {
//   var hashParams = {};
//   var e, r = /([^&;=]+)=?([^&;]*)/g,
//     q = window.location.hash.substring(1);
//   while (e = r.exec(q)) {
//     hashParams[e[1]] = decodeURIComponent(e[2]);
//   }
//   return hashParams;
// }

// var params = getHashParams();

// var access_token = params.access_token,
//   refresh_token = params.refresh_token,
//   error = params.error;

// oauthTemplate()

// if (error) {
//   alert('There was an error during the authentication');
// } else {
//   if (access_token) {
//     // render oauth info
//     oauthPlaceholder.innerHTML = oauthTemplate({
//       access_token: access_token,
//       refresh_token: refresh_token
//     });
//   }
// }
// export default oauthTemplate