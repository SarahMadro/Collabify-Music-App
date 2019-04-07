    import React from 'react';
    import Collab from './Collab';
    import Spotify from './Spotify';

    class CollabList extends React.Component {
    constructor() {
    super()
        this.state= {
            currentUsersPlaylists:[]
        }

    this.getPlaylists = this.getPlaylists.bind(this);

    
}

getPlaylists(){
    Spotify.getPlaylists().then(playlists => {
        console.log("made it to CollabList", playlists);
        return this.setState({currentUsersPlaylists : playlists})
    })
}




    render() {
    return (
        <div className='Collablist'>
        <button 
            className='Playlist-get' 
            onClick={this.getPlaylists}>
            GET MY PLAYLISTS        
        </button>
            {this.state.currentUsersPlaylists.map(playlist => 
            // ALL RESULTS GO HERE
            // access to   
        // key: playlists.id,
        // collaborative: playlists.collaborative,
        // id: playlists.id,
        // name: playlists.name,
        // uri: playlists.uri,
        // image: playlists.images[0].url
            <div>{playlist.name}</div>)
            // NOT PAST HERE
            }
        </div>
    );
    }
}

    export default CollabList;
