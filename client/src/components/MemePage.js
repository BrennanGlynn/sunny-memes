import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import MemeCard from './MemeCard';


const styles = {

}

class MemePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memes: [{
                _id: ''
            }]
        }
    }

    componentDidMount() {
        // Get the current users details from the backend server
        this.callApi('memes')
            .then(res => {
                if (this.state.memes[0]._id !== res.documents[0]._id) {
                    this.setState({memes: res.documents}, () => {
                        console.log(res.documents)
                    })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    // method to call api
    callApi = async (route) => {
        const response = await fetch(route, {credentials: 'include'});
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body
    };

    render() {
        const {classes} = this.props;

        return(<div>
            {this.state.memes.map(meme =>
                <MemeCard key={meme._id} data={meme}/>
            )}
        </div>)
    }
}

export default withStyles(styles)(MemePage);