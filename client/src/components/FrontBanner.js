import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = {
    center: {
        textAlign: 'center',
    },
    height: {
      height: '2500',
    },
    blue: {
        color: 'blue'
    }
}


class FrontBanner extends Component {
    render() {
        const {classes} = this.props;
        return(

            <div className={classes.center + ' ' + classes.blue}>
                <h1>Banner</h1>
            </div>
        );
    }
}

export default withStyles(styles)(FrontBanner);
