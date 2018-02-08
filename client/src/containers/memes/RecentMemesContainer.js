import { connect } from 'react-redux'
import RecentMemes from '../../components/Pages/RecentMemes'

const mapStateToProps = state => {
  return {
    memes: state.memes.recentMemes,
    user: state.auth.user.id
  }
}

const RecentMemesContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(RecentMemes);

export default RecentMemesContainer