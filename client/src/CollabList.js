    import React from 'react';
    import Collab from './Collab';
    import Spotify from './Spotify/Spotify';

    class CollabList extends React.Component {
    constructor() {
    super()
        this.state= {
            getAllPlaylists:{}
        }

    this.getPlaylists = this.getPlaylists.bind(this);

    
}

getPlaylists(){
    Spotify.getPlaylists().then(playlists => {
        console.log("Results???", playlists);
        this.setState({ getAllPlaylists: playlists })   
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
            <Collab playlists={this.state.getAllPlaylists} />
        </div>
    );
    }
}

    export default CollabList;
