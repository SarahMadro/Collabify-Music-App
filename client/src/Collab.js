import React from 'react';

class Collab extends React.Component {

    constructor(props) {
        super(props)
            }


render() {
    return (
    <div className='Collab'>
        <div className='Collab-information'>
        <h3>${this.props.playlists}</h3>
        <p>
            {/* {this.props.playlists[0].desc} */}
            Hmm.....
        </p>
        </div>
    </div>
    );
}
}

export default Collab;
