import React, {Component} from 'react';

class MemeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.memeData
        }
    }


//when using img use http://localhost:3001/memeData.url
//You can access the properties inside this.state
    //It should have the properties displayed
    //////////////////////////////////////////////
//{this.state.data.url}
    render() {
        return (
            <div>Make a meme card here {this.state.data.url} </div>
        )
    }
}

export default MemeCard;