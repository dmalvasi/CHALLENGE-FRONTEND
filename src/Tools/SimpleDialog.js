import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  paper:{
    width:'330px'
  },
  title:{
    backgroundColor:'#ef5350',
    fontSize:'1rem',
    color:'#FFF',
    textAlign:'center'
  },
  content:{
    paddingBottom:'30px',
    paddingTop:'10px'
  }
});

function SimpleDialog({...props}) {
  const style = useStyles();
  const { onClose, selectedValue, open,title,message, ...others } = props;

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      onClose(event, reason);
    }  
  };

  const handleCancel = (value) => {
    onClose(value);
  };

  const handleOk = (value) => {
    selectedValue(value);
  };


  return (
    (open)?(
      <Dialog {...others} classes={{paper:style.paper}} keepMounted onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle className={style.title} id="simple-dialog-title">{title}</DialogTitle>
        <DialogContent className={style.content}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>


        <DialogActions style={{borderTop:'solid 1px #ccc',backgroundColor:'#ddd'}}>
          <Button autoFocus onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    ):<></>
  );
}

export default SimpleDialog;


