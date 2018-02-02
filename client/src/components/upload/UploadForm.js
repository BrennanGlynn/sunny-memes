import React, {Component} from 'react'

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
  }

  handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({image: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0])
    }
  }

  render() {
    return (
      <form method="post" encType="multipart/form-data" action="/upload">
        {/*We need to have a separate input name for each character*/}

        <label>Title of post:</label><br/>
        <input type="text" name="title"/><br/>
        <label>Meme</label><br/>
        <input type="file" onChange={this.handleImageChange.bind(this)} name="file"/><br/>
        {this.state.image && <img id="target" src={this.state.image} alt="upload" />}
        <input type="checkbox" id="charlie" name="charlie" value="true"/>
        <label for="charlie">Charlie</label><br/>
        <input type="checkbox" id="mac" name="mac" value="true"/>
        <label for="charlie">Mac</label><br/>
        <input type="checkbox" id="dennis" name="dennis" value="true"/>
        <label for="charlie">Dennis</label><br/>
        <input type="checkbox" id="frank" name="frank" value="true"/>
        <label for="charlie">Frank</label><br/>
        <input type="checkbox" id="dee" name="dee" value="true"/>
        <label for="charlie">Dee</label><br/>
        <input type="submit" value="Submit"/>
      </form>);
  }
}

export default UploadForm;