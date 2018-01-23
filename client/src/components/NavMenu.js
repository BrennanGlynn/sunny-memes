import React, {Component} from 'react';
import {Button, Menu, MenuItem} from 'material-ui';
import {withStyles} from 'material-ui/styles';

const styles = {
  picture: {
    height: 50,
    width: 50,
    borderRadius: '50%'
  },
  menuLink: {
    textDecoration: 'none'
  }
}

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {classes} = this.props;

    return(
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <img src={this.props.picture} className={classes.picture} alt="profile" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Favorites</MenuItem>
          <a className={classes.menuLink} href="/mymemes"><MenuItem onClick={this.handleClose}>My Memes</MenuItem></a>
          <a className={classes.menuLink} href="http://localhost:3001/auth/logout"><MenuItem onClick={this.handleClose}>Logout</MenuItem></a>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(NavMenu);