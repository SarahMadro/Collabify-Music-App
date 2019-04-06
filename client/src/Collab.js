import React from 'react';

class Collab extends React.Component {

render() {
    return (
    <div className='Collab'>
        <div className='Collab-information'>
        <h3>{this.props.playlists.name}</h3>
        <p>
            {this.props.playlists.desc}
            Hmm.....
        </p>
        </div>
    </div>
    );
}
}

export default Collab;
