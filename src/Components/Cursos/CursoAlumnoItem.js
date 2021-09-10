import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux'
import {setNota} from '../../Store/curso/cursoActions'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';


const styleCursoAlumnoItem = makeStyles({
  textNota:{
    width:'50px',
    border:'1px solid #ddd',
    textAlign:'center',
    '& MuiInputBase-input': {
      color: 'green',
    },
  },
  input:{
    textAlign:'center'
  }
})

const CursoAlumnoItem = ({...props}) => {
  
  const style = styleCursoAlumnoItem();

  const [alumnoNota,setAlumnoNota] = useState({
    nota: '',
    prevNota: 0,
  });

  useEffect(()=>{
    setAlumnoNota({...alumnoNota,nota:props.alumno.nota,prevNota:props.alumno.nota});
  },[])

  function handlerchange(event){
    setAlumnoNota({...alumnoNota,[event.target.name]:event.target.value});
  }


  
  function handlerSelect(id){
    if(props.onSelect)
      props.onSelect(id);
  }

  function handlerDelete(){
    if(props.onDelete){
      props.onDelete(props.alumno.alumnoId);
    }
  }

  function handlerEdit(id,nota){
    props.dispatch(setNota(id,nota));
  }


  function handlerBlur(event){
    const nota = Number(event.target.value);
    if(event.target.value !==  alumnoNota.prevNota){
      setAlumnoNota((oldAlumnoNota)=>{
        handlerEdit(props.alumno._id,nota);
        return{...oldAlumnoNota,prevNota:nota}
      })
      
    }
  }

  const alumno = props.alumno;
  if(alumno){
    return (
      <ListItem index={props.alumno._id} onClick={handlerSelect} style={{border:'1px solid #CCC',borderRadius:'5px', marginTop:'5px'}}>
        <ListItemText primary={alumno.nombre} secondary={alumno.dni} />
        <InputBase 
          className={style.textNota}
          classes={{input:style.input}}
          onBlur={handlerBlur}
          type="number"
          id='nota' name='nota' label='Nota' value={alumnoNota.nota} onChange={handlerchange} placeholder="nota">
        </InputBase>
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={handlerDelete}>
          <RemoveIcon fontSize="small" color='secondary'/>
        </IconButton>
      </ListItem>
    )
  }else{
    return (<div>Alumno</div>)
  }
}

const mapStateToProps  = state =>({
  cursoStore: state.cursoReducer,
});


export default connect(mapStateToProps)(CursoAlumnoItem)
