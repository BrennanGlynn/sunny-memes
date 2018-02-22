import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "material-ui";

const ErrorDialog = ({open, closeDialog, error}) => {
  return (
    <Dialog
      open={open}
      onClose={closeDialog.bind(this)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{error.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {error.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog.bind(this)} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  )

}

export default ErrorDialog