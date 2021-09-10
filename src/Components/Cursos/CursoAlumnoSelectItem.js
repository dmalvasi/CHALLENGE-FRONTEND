import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';


const CursoAlumnoSelectItem = ({...props}) => {

  const alumno = props.alumno
  const [isAdded,setIsAdded] = useState(false);

  function handlerAssociate(event){
    if(props.onAssociate)
      props.onAssociate(props.alumno._id);
    setIsAdded(true);
  }

  function handlerRemove(event){
    if(props.onRemove)
      props.onRemove(props.alumno._id);
    setIsAdded(false);

  }

  if(alumno){
    return (
      <ListItem button key={alumno._id} index={alumno._id}  style={{border:'1px solid #CCC',borderRadius:'5px'}}>
        <ListItemText 
          primary={alumno.nombre + ', ' + alumno.apellido} 
          secondary={alumno.dni} 
        />
        {
          (!isAdded)?(
            <IconButton color="warning" aria-label="upload picture" component="span" onClick={handlerAssociate}>
              <AddIcon fontSize="large"/>
            </IconButton>
          ):(
            <IconButton color="secondary" aria-label="upload picture" component="span" onClick={handlerRemove}>
              <RemoveIcon fontSize="large"/>
            </IconButton>
          )
        }
      </ListItem>
    )
  }else{
    <></>
  }
}


export default CursoAlumnoSelectItem;




