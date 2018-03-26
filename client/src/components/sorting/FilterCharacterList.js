import React, {Component} from 'react';
import {withStyles} from "material-ui/styles";
import {Avatar, Checkbox, Divider} from "material-ui/";
import List, {ListItem, ListItemSecondaryAction, ListItemText} from "material-ui/List";

const styles = theme => ({
  filterIcon: {
    marginTop: 7.5,
    marginRight: 20
  },
  filterText: {
    marginRight: 5,
  },
  characterFilterList: {
    maxWidth: 250,
    maxHeight: 500,
    overflow: 'auto',
    textTransform: 'capitalize',
    paddingBottom: 0,
    paddingTop: 0,
    color: '#43a047',
  },
  checkedSecondary: {
    color: '#2c8943',
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

class FilterCharacterList extends Component {
  render() {
    const {classes, characters, toggleChar} = this.props;
    const characterNames = {
      dennis: "Dennis",
      mac: "Mac",
      charlie: "Charlie",
      dee: "Dee",
      frank: "Frank",
      waitress: "The Waitress",
      cricket: "Cricket",
      artemis: "Artemis",
      lawyer: "Lawyer",
      lilkev: "Lil Kev",
      countrymac: "Country Mac",
      gailthesnail: "Gail the Snail",
      unclejack: "Uncle Jack",
      bonnie: "Bonnie",
      luther: "Luther",
      mrsmac: "Mrs. McDonald",
      barbara: "Barbara Reynolds",
      ben: "Ben the Soldier",
      pondy: "Pondy",
      maureen: "Maureen Ponderosa",
      therapist: "Therapist",
      liam: "Liam McPoyle",
      ryan: "Ryan McPoyle",
      margaret: "Margaret McPoyle",
      pappy: "Pappy McPoyle",
      roxy: "Roxy",
      gladys: "Gladys",
      z: "Z",
      duncan: "Duncan",
      maniac: "Da' Maniac",
      rex: "Rex",
      hwang: "Hwang",
      ingrid: "Ingrid Nelson",
      ruby: "Ruby Taft"
    }
    return(
      <List className={classes.characterFilterList}>
        {Object.keys(characterNames).map(character => (
          <ListItem key={character} onClick={toggleChar.bind(this, character)} dense button className={classes.listItem}>
            <Avatar alt={`${character}`} src={`/images/characters/${character}.jpg`}/>
            <ListItemText primary={`${characterNames[character]}`} />
            <ListItemSecondaryAction>
              <Checkbox
                classes={{
                  checkedSecondary: classes.checkedSecondary,
                }}
                onChange={toggleChar.bind(this, character)}
                checked={characters.includes(character)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
          <Divider />
      </List>
    )
  }
}

export default withStyles(styles) (FilterCharacterList);
