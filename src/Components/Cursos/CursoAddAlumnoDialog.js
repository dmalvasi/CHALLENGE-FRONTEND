import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import CursoAlumnoSelect from './CursoAlumnoSelect';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DMSearchField from '../../Tools/DMSearchField';


const useStyles = makeStyles({
  paper:{
    width:'600px'
  },
  content:{
    overflowY:'auto',
    maxHeight:'400px',
    minHeight:'200px'

  }
});

function CursoAddAlumnoDialog({...props}) {
  const style = useStyles();
  const { onClose,onCancel, onCreate, open, ...others } = props;

  const [alumnos,setAlumnos] = useState([]);

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      onClose(event, reason);
    }  
  };

  function handleCancel(){
    if(props.onCancel)
      props.onCancel();
  };

  function handleSave(){
    if(props.onAssociate)
      props.onAssociate(alumnos);
      setAlumnos([]);
  };

  function handleAssociate(alumnoId){
    setAlumnos((prevAlumnos)=>{
      return [...prevAlumnos,alumnoId]}
    );
  };


  return (
    (open)?(
      <Dialog {...others}  classes={{paper:style.paper}} keepMounted onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <Box style={{backgroundColor:'#2196f3',padding:'10px'}}>
          <DMSearchField></DMSearchField>
        </Box>
        <Box  className={style.content} >
          <CursoAlumnoSelect onCancel={handleCancel} onAssociate={handleAssociate} onClose={handleClose} values={props.values}></CursoAlumnoSelect>
        </Box>
        <Box display='flex' flexDirection='row' paddingTop='10px' paddingBottom='10px' alignItems='center' justifyContent='flex-end'>
          <Button disabled={false} style={{marginRight:'10px'}} variant="contained" color="primary" onClick={handleSave}>Guardar</Button>
          <Button disabled={false} style={{marginRight:'10px'}} variant="contained" color="secondary" onClick={handleCancel}>Cancelar</Button>
        </Box>
      </Dialog>
    ):<></>
  );
}

export default CursoAddAlumnoDialog;


