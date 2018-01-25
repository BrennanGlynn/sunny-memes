import { connect } from 'react-redux'
import MemePage from '../components/MemePage'

const mapStateToProps = state => {
  return {
    memes: state.memes.memes
  }
}

const MemesContainer = connect(
  mapStateToProps,
)(MemePage);

export default MemesContainer