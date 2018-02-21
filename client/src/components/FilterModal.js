import React, {Component} from "react"
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {Typography, Grid, Avatar, Chip, Modal, Divider} from "material-ui/";
import IconButton from "material-ui/IconButton";
import FilterList from "material-ui-icons/FilterList";

const styles = theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '95%',
      marginRight: '2.5%',
      marginLeft: '2.5%',
      textAlign: 'left',
    },
  },
  openModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #e5e5e5",
    backgroundColor: "#fff",
    boxShadow: "0 5px 15px rgba(0,0,0,.5)",
    padding: 16,
    minWidth: "20%",
    maxWidth: "90%",
    height: "auto",
    [theme.breakpoints.only('xs')]: {
      top: "25%",
      minWidth: "80%",
    },
  },
  filterIcon: {
    marginTop: 7.5,
    marginRight: 20
  },
  filterText: {
    marginRight: 5,
  },
  chipTopContainer: {
    textAlign: 'right'
  },
  chipContainer: {
    margin: 20,
    textAlign: "center",
  },
  chip: {
    textTransform: 'capitalize',
    marginRight: 10,
    position: 'relative',
    top: 15,
  },
  dimmed: {
    opacity: 0.4,
    filter: "alpha(opacity=40)",
  },
});

class FilterModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      characters: this.props.characters
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {classes, characters, toggleChar} = this.props;
    const characterNames = ["dennis", "mac", "charlie", "dee", "frank"]

    return (
      <div>
        <Grid container className={classes.root} justify="flex-end" alignItems="center" spacing={0}>
          <Grid item xs={11} md={11} lg={11} xl={11} className={classes.chipTopContainer}>
            {characters.map(character =>
              <Chip
                key={character}
                avatar={<Avatar src={`/images/${character}.jpg`}/>}
                label={character}
                className={characters.includes(character) ? classes.chip : [classes.chip, classes.dimmed].join(" ")}
                onDelete={toggleChar.bind(this, character)}
              />,
            )}
            <IconButton
              aria-haspopup="true"
              onClick={this.handleOpen}
              className={classes.filterIcon}
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
            <Typography variant="title" id="modal-title">
              Select Characters to Filter
            </Typography>
            <Divider/>
            <Grid container justify="flex-end" spacing={0}>
              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.chipContainer}>
                  {characterNames.map(character =>
                    <Chip
                      key={character}
                      avatar={<Avatar src={`/images/${character}.jpg`}/>}
                      label={character}
                      className={characters.includes(character) ? classes.chip : [classes.chip, classes.dimmed].join(" ")}
                      onClick={toggleChar.bind(this, character)}
                    />,
                  )}
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
