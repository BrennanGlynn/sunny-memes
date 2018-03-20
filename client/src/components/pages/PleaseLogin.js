import React, {Component} from 'react';
import WrapperPanels from "../home/panels/WrapperPanels";
import {Typography} from "material-ui";

class PleaseLogin extends Component {

  render() {
    return(
      <WrapperPanels>
        <Typography>You must be logged in to view this page!</Typography>
      </WrapperPanels>
    );
  }

}

export default PleaseLogin;
