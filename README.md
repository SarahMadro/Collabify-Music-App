# Collabify (Spotify Clone)
This Repo is for a Spotify Clone called Collabify.
It's a simple app that allows users create collaborative playlists, add and remove songs and play their playlists.
There are two parts to it, the auth-server, and the client.

## Getting Statrted

### 1) Create an App
- Visit https://developer.spotify.com/
- Log in and create an app
- Enter `http//localhost:8080/callback` as the redirect URI
- Save your changes
- Copy down the following: Redirect URI, client id, client secret


### 2)  Start Auth Server
- Navigate to the auth-server directory `cd auth-server/authorization_code`
- Install the dependencies `npm install`
- Paste in the redirect uri, client id, and client secret you copied in step 1 to a .env file *(and make sure to include that file in your .gitignore!)*
- Run the Server `node app.js`


### 3)  Start Client
- Navigate to the auth-server directory `cd client`
- Install the dependencies `npm install`
- Run the Server `npm run start-poll`

### 4)  Use the App
- Make sure you have a song playing (or paused) on a Spotify app
- Visit http://localhost:8080
- Click 'Log in with Spotify' to log in, and Authorize 
- Create a Playlist! New Playlists will only post to Spotify if there is a Playlist name. Descrption is option. The empty (collaborative) playlist instantly shows up on your Spotify account.
- Add songs! Clicking on any of the playlists on the right will open them up in the window. You can `add` or `delete` songs from within there. 


