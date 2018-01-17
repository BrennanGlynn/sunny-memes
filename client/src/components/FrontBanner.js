import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = {
    center: {
        textAlign: 'center'
    },
}


class FrontBanner extends Component {
    render() {
        const {classes} = this.props;
        return(
            <div>
                <h1 className={classes.center}>Banner</h1>
            </div>
        );
    }
}

export default withStyles(styles)(FrontBanner);
