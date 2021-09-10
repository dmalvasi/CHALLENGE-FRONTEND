import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';


function DMDialogWait({...props}) {

  return(
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      open={props.open}
    >
      <DialogContent>
        <Grid container justifyContent = "center">
          <CircularProgress/>
          </Grid>
          {
            (props.text)?<div style={{marginTop:'20px',fontWeight: 500,}}>{props.text}</div>:<></>
          }
        </DialogContent>
      </Dialog>
  )
}

export default DMDialogWait;


