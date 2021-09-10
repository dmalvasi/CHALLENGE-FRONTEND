import React, { useState,useEffect } from 'react';
import alumnosService from '../../Services/alumnos.service';
import CursoAlumnoSelectItem from './CursoAlumnoSelectItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


const CursoAlumnoSelect = ({values,...props}) => {

  const [alumnos,setAlumnos] = useState([]);

  useEffect(async ()=>{
    const alumnosLoad = await deleteAlumnosAssociados(values);
    if(alumnosLoad){
      setAlumnos(alumnosLoad)
    }
  },[])


  async function deleteAlumnosAssociados(values){
    const alumnosLoad = await alumnosService.obtenerAlumnos();
    if(values){
      const alumnosFilter = alumnosLoad.filter((alumno)=>{
        const f = values.find((v)=>
          alumno._id === v.alumnoId
        );
        if(!(typeof f === 'undefined')){
          return;
        }else{
          return alumno;
        }
      })
      return alumnosFilter;
    }
    
  }

  if(alumnos && alumnos.length > 0){
    return (
      <Grid>
        {
          alumnos.map((alumno,index)=>{
            return(
              <CursoAlumnoSelectItem {...props} alumno={alumno} index={index}></CursoAlumnoSelectItem>
            )
          })
        }
      </Grid>
    )
  }else{
    return (<Grid><Box display='flex' justifyContent='center' alignItems='center'>Cargando lista de usuarios...</Box></Grid>)
  }
}

export default CursoAlumnoSelect;



