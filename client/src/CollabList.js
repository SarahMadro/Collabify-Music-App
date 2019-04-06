    import React from 'react';
    import Collab from './Collab';
    import Spotify from './Spotify/Spotify';

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
            {this.state.currentUsersPlaylists.map(playlist => <div>{playlist.name}</div>)}
        </div>
    );
    }
}

    export default CollabList;
