import React, { Component } from 'react'

class FilterModalList extends Component {
  const { classes } = this.props;
  render() {
    return(
      <div>
        <List className={classes.root} subheader={<li />}>
          {[0, 1, 2, 3, 4].map(sectionId => (
            <li key={`section-${sectionId}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                {[0, 1, 2].map(item => (
                  <ListItem key={`item-${sectionId}-${item}`}>
                    <ListItemText primary={`Item ${item}`} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </div>
    )
  }
}

export default FilterModalList;
