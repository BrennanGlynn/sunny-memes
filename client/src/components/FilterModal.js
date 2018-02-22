import React, {Component} from "react"
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {Typography, Grid, Avatar, Chip, Modal, Divider} from "material-ui/";
import IconButton from "material-ui/IconButton";
import FilterList from "material-ui-icons/FilterList";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 5,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '95%',
      marginRight: '2.5%',
      marginLeft: '2.5%',
      textAlign: 'center',
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
  filterText: {
    marginRight: 10,
  },
  chipTopContainer: {
    marginRight: 10,
    position: 'relative',
    top: 10,
  },
  chipContainer: {
    margin: 20,
    textAlign: "center",
  },
  chip: {
    textTransform: 'capitalize',
    marginRight: 5,
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
    const characterNames = ['charlie', 'dee', 'dennis', 'frank', 'mac']
    const sideCharacterNames = ['waitress','ben', 'unclejack', 'lawyer']

    return (
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
            <Typography variant="title" id="modal-title">
              Select Characters to Filter
            </Typography>
            <Divider/>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.chipContainer}>
                  <Typography variant="title" id="modal-title" gutterBottom>
                    The Gang
                  </Typography>
                  {characterNames.map(character =>
                    <Chip
                      key={character}
                      avatar={<Avatar src={`/images/characters/${character}.jpg`}/>}
                      label={character}
                      className={characters.includes(character) ? classes.chip : [classes.chip, classes.dimmed].join(" ")}
                      onClick={toggleChar.bind(this, character)}
                    />,
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.chipContainer}>
                  <Typography variant="title" id="modal-title" gutterBottom>
                    Side Characters
                  </Typography>
                  {sideCharacterNames.map(character =>
                    <Chip
                      key={character}
                      avatar={<Avatar src={`/images/characters/${character}.jpg`}/>}
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
