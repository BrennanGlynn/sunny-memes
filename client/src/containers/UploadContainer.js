import { connect } from 'react-redux'
import { uploadedMeme } from "../actions"
import UploadForm from '../components/upload/UploadForm'

const mapDispatchToProps = dispatch => {
  return {
    onUpload: (meme) => {
      dispatch(uploadedMeme(meme))
    }
  }
}

const UploadContainer = connect(
  mapDispatchToProps
)(UploadForm);

export default UploadContainer