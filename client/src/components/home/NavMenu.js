import React, {Component} from 'react';
import {Button, Menu, MenuItem} from 'material-ui';
import compose from 'recompose/compose';
import {withStyles} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';

const styles = theme => ({
  desktopMenu: {
    [theme.breakpoints.between('xs', 'md')]: {
      display: 'none',
    },
  },
  picture: {
    height: 50,
    width: 50,
    borderRadius: '50%'
  },
  menuLink: {
    color: 'inherit',
    textDecoration: 'none'
  },
});

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
      <div className={classes.desktopMenu}>
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
          <MenuItem onClick={this.handleClose}><a className={classes.menuLink} href="/favorites">Favorites</a></MenuItem>
          <MenuItem onClick={this.handleClose}><a className={classes.menuLink} href="/mymemes">My Memes</a></MenuItem>
          <MenuItem onClick={this.handleClose}><a onClick={this.props.logout} className={classes.menuLink}>Logout</a></MenuItem>
        </Menu>
      </div>
    )
  }
}

export default compose(withStyles(styles), withWidth())(NavMenu);
