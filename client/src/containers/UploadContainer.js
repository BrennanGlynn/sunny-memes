import { connect } from 'react-redux'
import { uploadedMemes } from "../actions"
import UploadForm from '../components/upload/UploadForm'

const mapStateToProps = state => {
  return {
    myMemes: state.myMemes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpload: () => {
      dispatch(uploadedMemes())
    }
  }
}

const UploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadForm);

export default UploadContainer