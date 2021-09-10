import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const ColorPrimary = '#2196f3';
const ColorSecondary = '#008afd';

const useStyles = makeStyles({
  root: {
    backgroundColor:ColorPrimary,
    border:'1px solid ' + ColorPrimary,
  },
  secRight: {
    backgroundColor: ColorSecondary,
    width: '200px'
  },
  button:{
    color: ColorPrimary
  },
  title:{
    fontSize:'2rem',
    color:'#FFF',
    textAlign:'left',
    padding:'5px 10px 20px 20px'
  },
  textCurso:{
    fontWeight: '900',
  },
  textTema:{
    fontSize: '1.2rem'
  },
  textDescripcion:{
    color: '#333',
    fontSize: '0.8rem',
    padding:'6px 0px'
  },
  textAnio:{
    color: '#FFF',
    fontSize: '2rem',
    fontWeight: '800',
    paddingTop: '50px'
  },
  textDuracion:{
    color: '#FFF',
    paddingBottom:'5px'
  },
});



const CursoEditHead = ({...props}) => {
  const style = useStyles();
  return(
    <Box display='flex' justifyContent='space-between' className={style.root}>
      <Box className={style.title}>
        <Box className={style.textCurso}>Curso</Box>
        <Box className={style.textTema}>{props.curso.tema}</Box>
        <Box className={style.textDescripcion}>{props.curso.descripcion}</Box>
      </Box>
      <Box className={style.secRight} display='flex' flexDirection='column' justifyContent='space-between'>
        <Box className={style.textAnio}>
          {props.curso.anioDictado}
        </Box>
        <Box className={style.textDuracion}>
          {props.curso.duracion}
        </Box>
      </Box>
    </Box>
  )

}

export default CursoEditHead;