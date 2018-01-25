import { connect } from 'react-redux'
import MemePage from '../components/MemePage'

const mapStateToProps = state => {
  return {
    memes: state.memes.memes,
    user: state.auth.user.id
  }
}

const MemesContainer = connect(
  mapStateToProps,
)(MemePage);

export default MemesContainer