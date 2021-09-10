import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = makeStyles({
  root: {
    backgroundColor:'#d50000',
    height:'100px',
    border:'1px solid #d50000',
  },
  secRight: {
    backgroundColor: '#ffcdd2',
    width: '110px'
  },
  title:{
    fontSize:'2rem',
    color:'#FFF',
    fontWeight: '900',
    paddingLeft: '20px'
  }
});



const AlumnoHeader = ({...props})=>{

  const style = useStyles();
    
  function handlerAddAlunmo(){
    if(props.onAddAlumno){
      props.onAddAlumno();
    }
  }

  return(
    <Box display='flex' justifyContent='space-between' className={style.root}>
      <Box display='flex' alignItems='center' className={style.title}>
        Gestion de Alumnos
      </Box>
      <Box className={style.secRight} display='flex' justifyContent='center' alignItems='center'>
        <IconButton onClick={handlerAddAlunmo} aria-label="upload picture" component="span" >
          <AddCircleIcon fontSize="large" color='secondary'/>
        </IconButton>
      </Box>
    </Box>
  )
  
}

export default AlumnoHeader;