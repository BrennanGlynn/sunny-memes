import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Paper, Grid, Typography } from 'material-ui';

const styles = {
    root: {
        paddingTop: 16,
        paddingBottom: 16,
        width: "50%"
    }
}


class FrontBanner extends Component {
    render() {
        const {classes} = this.props;
        return(
            <div>
                <Paper className={classes.root} elevation={4}>
                    <Typography type="headline" component="h1">
                        Hello Fellow American
                    </Typography>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(FrontBanner)