import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = {
};


const Admin = ({classes, onLogoutClick, auth}) => (
  <div>
    Admin Component
  </div>
)

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Admin)