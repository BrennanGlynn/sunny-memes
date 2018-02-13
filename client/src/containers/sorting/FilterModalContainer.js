import { connect } from 'react-redux'
import {toggleCharacter} from "../../actions"
import FilterModal from '../../components/FilterModal'

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

const FilterModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterModal);

export default FilterModalContainer