import CursosServices from '../../Services/cursos.service'
import * as CursosActions from '../cursos/cursosActions'

export const SELECT_CURSO = 'SELECT_CURSO'
export const SELECT_CURSO_FAILURE = 'SELECT_CURSO_FAILURE'
export const DESELECT_CURSO = 'DESELECT_CURSO'
export const UPDATE_CURSO = 'UPDATE_CURSO'
export const SET_NOTA = 'SET_NOTA'

export const ADD_ALUMNO_CURSO = 'ADD_ALUMNO_CURSO'
export const REMOVE_ALUMNO_CURSO = 'REMOVE_ALUMNO_CURSO'

export const deselectCurso = () =>  ({
  type:DESELECT_CURSO,
  payload: null,
});

export const selectCurso = curso =>  ({
    type:SELECT_CURSO,
    payload: {
      curso,
      errors:null
    },
});

export const addAlumnoCurso = (alumno) =>  ({
  type:ADD_ALUMNO_CURSO,
  payload: {
    alumno,
  },
});

export const removeAlumnoCurso = (alumnoId) =>  ({
  type:REMOVE_ALUMNO_CURSO,
  payload: {
    alumnoId,
  },
});

export const selectCursoFailure = (errors) =>  ({
  type:SELECT_CURSO_FAILURE,
  payload: {
    curso:null,
    errors
  },
});


export const setNota = (alumnoId,nota) =>  ({
  type:SET_NOTA,
  payload: {alumnoId,nota},
});


export function updateCursosNotaRequest(curso) {
  return (dispatch) => {
    return CursosServices.obtenerCurso(curso)
      .then( curso => {
                        dispatch(selectCurso(curso))
                      }
      ).catch( errors => dispatch(selectCursoFailure(errors)))
   }
}

export function selectCursosRequest(id) {
  return (dispatch) => {
    return CursosServices.obtenerCurso(id)
      .then( curso => {
                        dispatch(selectCurso(curso))
                      }
      ).catch( errors => dispatch(selectCursoFailure(errors)))
   }
}


async function addingAlumnosCurso(cursoId,alumnosId) {
  alumnosId.map(async (alumnoId) => {
    await CursosServices.agregarAlumnoCurso(cursoId,alumnoId);
  })
}

export function addAlumnosCursoRequest(cursoId,alumnosId) {
  return async (dispatch) => {
    if(cursoId && alumnosId){
      await addingAlumnosCurso(cursoId,alumnosId);
      return dispatch(CursosActions.selectCursoRequest(cursoId));
    }
  }
}

export function removeAlumnoCursoRequest(cursoId,alumnoId) {
  return async (dispatch) => {
    if(cursoId && alumnoId){
      await CursosServices.eliminarAlumnoCurso(cursoId,alumnoId);
      return dispatch(CursosActions.selectCursoRequest(cursoId));
    }
  }
}


export function addAlumnoCursoRequestOK(alumno) {
  return (state,dispatch) => {
    if(state.curso && alumno){
      return CursosServices.agregarAlumnosCurso(state.curso._id,alumno._id)
        .then( async () => {
                        await dispatch(selectCursosRequest(state.curso._id));
                      }
        ).catch(()=> null)
    }else{
      return null;
    }
  }
}
