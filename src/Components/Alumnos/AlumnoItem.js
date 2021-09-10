import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon  from '@material-ui/icons/Delete';


const AlumnoItem = ({...props}) => {
  
  function handlerSelect(e){
    if(props.onClickEdit){
      props.onClickEdit(alumno._id);
    }
  }

  function handlerDelete(e){
    if(props.onClickDelete){
      props.onClickDelete(alumno._id,alumno.nombre + ',' + alumno.apellido);
    }
  }
 

  const alumno = props.alumno
  if(alumno){
    return (
      <ListItem button key={alumno._id} index={alumno._id}  style={{border:'1px solid #CCC',borderRadius:'3px'}}>
        <ListItemText  onClick={handlerSelect}
          primary={alumno.nombre + ', ' + alumno.apellido + ' (' + alumno.dni + ')'} 
          secondary={alumno.direccion} 
        />
        <IconButton color="primary" aria-label="delete" component="span" onClick={handlerDelete}>
          <DeleteOutlinedIcon fontSize="small" color='secondary'/>
        </IconButton>
      </ListItem>
    )
  }else{
    <></>
  }
  
}

export default AlumnoItem;