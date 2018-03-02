import React, {Component} from "react"
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {Typography, Grid, Avatar, Checkbox, Chip, Modal, Divider} from "material-ui/";
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from "material-ui/IconButton";
import FilterList from "material-ui-icons/FilterList";

const styles = theme => ({
  [theme.breakpoints.only('xs')]: {
    openModal: {
      top: "25%",
      minWidth: "80%",
    },
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    root: {
      flexGrow: 1,
      width: '95%',
      marginRight: '2.5%',
      marginLeft: '2.5%',
      textAlign: 'left',
    },
    filterIcon: {
      marginLeft: '2.5%',
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
    width: "20%",
    height: 525,
  },
  filterIcon: {
    marginTop: 7.5,
    marginRight: 20
  },
  filterText: {
    marginRight: 5,
  },
  characterFilterList: {
    maxHeight: 500,
    overflow: 'auto',
    textTransform: 'capitalize',
  },
  chipTopContainer: {
    textAlign: 'right',
  },
  chipContainer: {
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
  },
  chip: {
    textTransform: 'capitalize',
    marginRight: 10,
    position: 'relative',
    top: 15,
  },
  dimmed: {
    opacity: 0.4,
    filter: 'alpha(opacity=40)',
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
    const characterNames = ["dennis", "mac", "charlie", "dee", "frank",
                            "waitress", "cricket", "artemis", "lawyer", "lilkev", "countrymac",
                            "gailthesnail", "unclejack", "bonnie", "luther", "mrsmac", "barbara",
                            "benthesolider", "pondy", "maureen",
                            "liam", "ryan", "margaret", "pappy",
                            "roxy", "gladys", "z", "duncan", "maniac", "rex", "hwang", "ingrid",
                            "rubytaft",
                           ]

    return (
      <div>
        <Grid container className={classes.root} alignItems="center" spacing={0}>
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
                <List className={classes.characterFilterList}>
                  {characterNames.map(character => (
                    <ListItem key={character} onClick={toggleChar.bind(this, character)} dense button className={classes.listItem}>
                      <Avatar alt={`${character}`} src={`/images/${character}.jpg`}/>
                      <ListItemText primary={`${character}`} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          onChange={toggleChar.bind(this, character)}
                          checked={characters.includes(character)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
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
