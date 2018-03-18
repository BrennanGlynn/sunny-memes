import { connect } from 'react-redux'
import RecentMemes from '../../components/pages/RecentMemes'
import {getRecentMemes} from "../../actions";

const mapStateToProps = state => {
  return {
    memes: state.memes.recentMemes,
    user: state.auth.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMemes: () => {
      dispatch(getRecentMemes())
    }
  }
}

const RecentMemesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentMemes);

export default RecentMemesContainer