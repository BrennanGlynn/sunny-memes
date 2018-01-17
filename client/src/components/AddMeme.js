import React, {Component} from 'react'

class AddMeme extends Component {
    render() {
        return (
            <form method="post" encType="multipart/form-data" action="http://localhost:3001/upload">
                <input type="file" name="file" />
                <input type="submit" value="Submit" />
            </form>);
    }
}

export default AddMeme;