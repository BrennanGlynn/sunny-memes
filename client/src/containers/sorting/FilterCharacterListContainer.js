import {connect} from "react-redux"
import {toggleCharacter} from "../../actions"
import FilterCharacterList from "../../components/sorting/FilterCharacterList"

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

const FilterCharacterListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterCharacterList);

export default FilterCharacterListContainer
