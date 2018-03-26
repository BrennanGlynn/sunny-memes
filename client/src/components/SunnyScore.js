import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Typography} from 'material-ui';
import WbSunnyIcon from 'material-ui-icons/WbSunny';
import IconButton from 'material-ui/IconButton';

const styles = {
  sunnyStatus: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  sunnyScore: {
    marginRight: 2.5,
    color: 'gold',
  },
  sunnyScoreNumber: {
    color: '#fff',
    marginLeft: 5,
  },
}

class SunnyScore extends Component {
  render() {
    const {classes} = this.props;
    return(
      <div>
        <IconButton aria-label="Sunny Score">
          <WbSunnyIcon className={classes.sunnyScore} />
          <Typography type={'body2'} className={classes.sunnyScoreNumber}>
            345
          </Typography>
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles) (SunnyScore);
