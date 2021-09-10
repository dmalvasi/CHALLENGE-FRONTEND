import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Alumno from './Alumno';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  paper:{
    width:'600px'
  }
});

function AlumnoAddDialog({...props}) {
  const style = useStyles();
  const { onClose,onCancel, onCreate, open, ...others } = props;

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      if(props.onCancel)
        props.onCancel();
    }  
  };

  return (
    (open)?(
      <Dialog {...others}  classes={{paper:style.paper}} keepMounted onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <Alumno {...props}></Alumno>
      </Dialog>
    ):<></>
  );
}

export default AlumnoAddDialog;


