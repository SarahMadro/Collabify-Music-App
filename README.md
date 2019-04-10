# Collabify (Spotify Clone)
This repo is for a Spotify Playlist Creator and Manager called Collabify.
It's a simple app that allows users create collaborative playlists, add and remove songs and listen their playlists.
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
- Visit http://localhost:8080
- Click 'Log in with Spotify' to log in, and Authorize 

*NOTE: All users must have an account with Spotify to use this app*

- Create a Playlist! New Playlists will only post to Spotify if there is a Playlist name. Descrption is optional. The empty (collaborative) playlist instantly shows up on your Spotify account.
- Add songs! Clicking on any of the playlists on the right will open them up in the window. You can `add` or `delete` songs from within there. 
- Share with friends! Enter the phone number of a friend you want to share your playlist with! They'll receive a link which opens the playlist in their Spotify mobile app, where they can add songs.


![Landing page: Clicking this button will send you to Spotify's authorization page. Giving this app permission to read your profile information (such as name, number of followers, etc) and create and edit playlists.](https://github.com/SarahMadro/Collabify-Music-App/blob/flowCheck/docs/Home%20Screen.png?raw=true)

![Landing page: Clicking this button will send you to Spotify's authorization page. Giving this app permission to read your profile information (such as name, number of followers, etc) and create and edit playlists.](https://github.com/SarahMadro/Collabify-Music-App/blob/flowCheck/docs/Spotify%20Authorization.png?raw=true)

![Main Dashboard: Create a collaborative playlist from here. Playlists made here will be collaborative by default. The component on the right is a filtered list of all your Collaborative Playlists.](https://github.com/SarahMadro/Collabify-Music-App/blob/flowCheck/docs/Main%20Dashboard.png?raw=true)

![Playlist Room: In here the user can add or delete songs. Search will return the top five results. Click on any one of them will add them to your playlist instantly.](https://github.com/SarahMadro/Collabify-Music-App/blob/flowCheck/docs/Playlist%20Details.png?raw=true)