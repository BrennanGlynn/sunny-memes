import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import {Typography, Grid, Chip, Modal, Checkbox, Avatar, Divider} from "material-ui/";
import IconButton from "material-ui/IconButton";
import FilterList from "material-ui-icons/FilterList";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

class FilterModalList extends Component {
  state = {
    checked: [0],
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { checked } = this.state;
    const newChecked = [...checked];
    const {classes, characters, toggleChar} = this.props;
    const characterNames = ["dennis", "mac", "charlie", "dee", "frank"]

    return(
      <div>
        <Grid container className={classes.root} justify="flex-end" alignItems="center" spacing={0}>
          <Grid item xs={12} md={10} lg={5} xl={4}>
            <span className={classes.chipTopContainer}>
              {characterNames.map(character =>
                <Chip
                  key={character}
                  avatar={<Avatar src={`/images/${character}.jpg`}/>}
                  label={character}
                  className={characters.includes(character) ? classes.chip : [classes.chip, classes.dimmed].join(" ")}
                  onClick={toggleChar.bind(this, character)}
                  onDelete={classes.chip}
                />,
              )}
            </span>
            <IconButton
              aria-haspopup="true"
              onClick={this.handleOpen}
            >
              <Typography variant="caption" className={classes.filterText}>
                Filter
              </Typography>
              <FilterList/>
            </IconButton>
          </Grid>
        </Grid>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          disableAutoFocus={true}
        >
          <div className={classes.openModal}>
            <List className={classes.root} subheader={<li />}>
            {[0, 1, 2, 3, 4].map(sectionId => (
                <li key={`section-${sectionId}`} className={classes.listSection}>
                  <ul className={classes.ul}>
                      <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                      <ListItem dense button className={classes.listItem}>
                        <Avatar alt="Remy Sharp" src="./images/dennis.jpg" />
                        <ListItemText primary={`Line item Dennis`} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            onChange={this.handleToggle()}
                            checked={this.state.checked.indexOf() !== -1}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                  </ul>
                </li>
            ))}
            </List>
          </div>
        </Modal>
      </div>
    )
  }
}

FilterModalList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterModalList);
