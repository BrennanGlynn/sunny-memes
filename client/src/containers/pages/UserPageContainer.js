import {connect} from 'react-redux'
import {getUserPage} from "../../actions";
import UserPage from "../../components/pages/UserPage";

const mapStateToProps = state => {
  return {
    memes: state.memes.userPageMemes,
    currentUser: state.memes.userPageUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMemes: (id) => {
      dispatch(getUserPage(id))
    }
  }
}

const UserPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);

export default UserPageContainer