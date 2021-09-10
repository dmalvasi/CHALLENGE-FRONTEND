import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import CursoAlumnoItem from './CursoAlumnoItem'


const CursosAlumnoList = ({...props}) => {

  if(props.alumnos){
    return (
      <Box style={{padding:'5px 10px'}}>
        <List style={{textAlign:'center',width:'100%'}}>
          {
            (props.alumnos && props.alumnos.length>0)?
              props.alumnos.map((alumno,index)=>{
                return (
                  <CursoAlumnoItem key={alumno._id + '_cai' } alumno={alumno} {...props}></CursoAlumnoItem>
                )}
              )
            :<Box>No se encontraron alumnos asignados</Box>
          }
        </List>
      </Box>
    )
  }else{
    return <></>
  }
}

CursosAlumnoList.propTypes = {
  alumnos: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  isLogin: PropTypes.bool,
};

export default CursosAlumnoList;