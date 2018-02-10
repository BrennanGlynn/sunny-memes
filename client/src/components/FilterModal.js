import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Typography, Grid, Avatar, Chip, Modal, Divider } from 'material-ui/';
import IconButton from 'material-ui/IconButton';
import FilterList from 'material-ui-icons/FilterList';

const styles = theme => ({
  openModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 16,
    minWidth: '20%',
    maxWidth: '90%',
    height: 'auto',
  },
  filterText: {
    marginRight: 10,
  },
  chipContainer: {
    margin: 20,
    textAlign: 'center',
  },
  chip: {
    marginRight: 5,
  },
  dimmed: {
    opacity: 0.4,
    filter: 'alpha(opacity=40)',
  },
});

class FilterModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
  };

  render() {
    const { classes } = this.props;

    return(
      <div>
        <IconButton
          color="rgba(0, 0, 0, 0.54)"
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
            <Typography variant="caption" className={classes.filterText}>
              Filter
            </Typography>
            <FilterList/>
        </IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          disableAutoFocus={true}
        >
          <div className={classes.openModal}>
            <Typography variant="title" id="modal-title">
              Select Characters to Filter
            </Typography>
            <Divider />
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.chipContainer}>
                  <Chip
                    avatar={<Avatar src="/images/dennis.jpg" />}
                    label="Dennis"
                    onClick={this.handleClick.bind(this)}
                    className={[classes.chip, classes.dimmed].join(" ")}
                  />
                  <Chip
                    avatar={<Avatar src="/images/mac.jpg" />}
                    label="Mac"
                    onClick={this.handleClick.bind(this)}
                    className={[classes.chip, classes.dimmed].join(" ")}
                  />
                  <Chip
                    avatar={<Avatar src="/images/charlie.jpg" />}
                    label="Charlie"
                    onClick={this.handleClick.bind(this)}
                    className={[classes.chip, classes.dimmed].join(" ")}
                  />
                  <Chip
                    avatar={<Avatar src="/images/dee.jpg" />}
                    label="Dee"
                    onClick={this.handleClick.bind(this)}
                    className={[classes.chip, classes.dimmed].join(" ")}
                  />
                  <Chip
                    avatar={<Avatar src="/images/frank.jpg" />}
                    label="Frank"
                    onClick={this.handleClick.bind(this)}
                    className={[classes.chip, classes.dimmed].join(" ")}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    )
  }
}

FilterModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterModal);
