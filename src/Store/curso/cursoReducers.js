import {SELECT_CURSO,DESELECT_CURSO,SET_NOTA,ADD_ALUMNO_CURSO,REMOVE_ALUMNO_CURSO} from './cursoActions'

const initializeCurso = 
  {
    curso:null,
  }
;


export const cursoReducer = ( state = initializeCurso , action) => {
  const {type,payload} = action;
  switch (type){
    
    case SELECT_CURSO:{
      const {curso} = payload;
      return {...state,curso:curso} 
    }

    case DESELECT_CURSO:{
      return {...state,curso:null} 
    }

    
    case SET_NOTA:{
      const {alumnoId,nota} = payload;
      if(state.curso){
        const alumnos = state.curso.alumnos;
        const alumnosUpdate = alumnos.map(
          (alumno) => alumno._id === alumnoId ? {...alumno, nota: nota} : alumno
        );
        const cursoUpdate = {...state.curso,alumnos:alumnosUpdate};
        return {...state,curso:cursoUpdate}
      }else{
        return state;
      }
    }

    case ADD_ALUMNO_CURSO:{
      const {alumno} = payload;
      const cursoUpdate = {...state.curso,alumnos:{...state.curso.alumnos,alumno}} 
      return {...state,curso:cursoUpdate}
    }

    default : {
      return state;
    }
  }

}
