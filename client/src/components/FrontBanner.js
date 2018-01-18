import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = {
    bannerWrapper: {
        textAlign: 'center',
        height: '250px',
        position: 'relative',
        top: '-57px',
        borderBottom: '1px',
        borderColor: '#dedede',
        backgroundColor: '#2f8a45',
    },
    h1: {
      paddingTop: '50px',
    },
}


class FrontBanner extends Component {
    render() {
        const {classes} = this.props;
        return(
            <div className={classes.bannerWrapper}>
                <h1 className={classes.h1}>Hello Fellow American</h1>
            </div>
        );
    }
}

export default withStyles(styles)(FrontBanner);
