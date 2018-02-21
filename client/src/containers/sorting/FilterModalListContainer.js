import { connect } from 'react-redux'
import {toggleCharacter} from "../../actions"
import FilterModalList from '../../components/FilterModalList'

const mapStateToProps = state => {
  return {
    characters: state.filter.characters.slice()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleChar: (character) => {
      dispatch(toggleCharacter(character))
    }
  }
}

const FilterModalListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterModalList);

export default FilterModalListContainer
