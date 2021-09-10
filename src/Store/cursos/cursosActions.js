import CursosServices from '../../Services/cursos.service'
import * as CursoActions from '../curso/cursoActions'

export const REQUEST_CURSOS = 'REQUEST_CURSOS'
export const RECEIVE_CURSOS = 'RECEIVE_CURSOS'
export const RECEIVE_CURSOS_FAILURE = 'RECEIVE_CURSOS_FAILURE';
export const RECEIVE_CURSOS_SUCCESS = 'RECEIVE_CURSOS_SUCCESS';
export const INVALIDATE_CURSOS = 'INVALIDATE_CURSO'
export const CREATE_CURSO = 'CREATE_CURSO'

export const DELETE_CURSO = 'DELETE_CURSO'
export const UPDATE_CURSO = 'UPDATE_CURSO'
export const UPDATE_CURSO_NOTAS = 'UPDATE_CURSO_NOTAS'

export const SELECT_CURSOS = 'SELECT_CURSOS'
export const DESELECT_CURSOS = 'DESELECT_CURSOS'

export const FILTER_CURSOS = 'FILTER_CURSOS'


/* ---- ACTIONS INIT ----*/
function requestCursos() {
  return {
    type: REQUEST_CURSOS,
    payload:{}
  }
}

function receiveCursosSuccess() {
  return {
    type: RECEIVE_CURSOS_SUCCESS,
    payload: null
  }
}

function receiveCursosFailure(error) {
  return {
    type: RECEIVE_CURSOS_FAILURE,
    payload: {error}
  }
}

function receiveCursos(cursos) {
  return {
    type: RECEIVE_CURSOS,
    payload: { 
      cursos,
      receivedAt: Date.now()
    }
  }
}

function deleteCusrso(id) {
  return {
    type: DELETE_CURSO,
    payload: { 
      id:id
    }
  }
}

function updateCursoNotas(cursoId,alumnos) {
  return {
    type: UPDATE_CURSO_NOTAS,
    payload: { 
      cursoId,
      alumnos
    }
  }
}

function createCurso(curso) {
  return {
    type: CREATE_CURSO,
    payload: { 
      curso: curso.curso
    }
  }
}

export const selectCurso = (cursoId) =>  ({
  type:SELECT_CURSOS,
  payload: {
    cursoId
  },
});


export const deselectCurso = () =>  ({
  type:DESELECT_CURSOS,
  payload: {},
});

export const filterCursos = (year,duration) =>  ({
  type:FILTER_CURSOS,
  payload: {
    year,
    duration:(duration)?duration:null
  },
});

/* ---- CREATE ACTIONS  END ----*/
/*Actualiza los cursos sin estado. Lo utilizo si quiro actualizar por backend*/
export function fetchCursosRequest() {
  return (dispatch) => {
    return CursosServices.obtenerCursos()
      .then( response => (response.errors)?dispatch(receiveCursosFailure(response.errors)):dispatch(receiveCursos(response.cursos)))
      .catch( errors => dispatch(receiveCursosFailure(errors)))
   }
}

function fetchCursos() {
  return async dispatch => {
    dispatch(requestCursos())
    await dispatch(fetchCursosRequest())
    dispatch(receiveCursosSuccess())
  }
}

function shouldFetchCursos(state) {
  const cursos = state.cursos;
  if (!cursos) {
    return true
  } else if (cursos.isFetching) {
    return false
  } else {
    return cursos.didInvalidate
  }
}

export function fetchCursosIfNeededs() {
  return (dispatch, getState) => {
    if (shouldFetchCursos(getState())) {
      return dispatch(fetchCursos())
    }
  }
}

export function deleteCursosRequest(id) {
  return (dispatch) => {
    return CursosServices.eliminarCurso(id)
      .then(dispatch(deleteCusrso(id)))
      .catch( errors => dispatch(receiveCursosFailure(errors)))
   }
}

export function updateCursoNotasRequest(cursoId,alumnos) {
  return async (dispatch) => {
    return await CursosServices.guardarCursoNotas(cursoId,alumnos)
      .then( () => {
        return dispatch(updateCursoNotas(cursoId,alumnos))
      })
   }
}

export function createCursoRequest(curso) {
  return (dispatch) => {
    return CursosServices.crearCurso(curso)
      .then( curso => (curso)?dispatch(createCurso(curso)):dispatch(receiveCursosFailure({errors:'problema creacion'})))
      .catch( errors => dispatch(receiveCursosFailure(errors)))
   }
}

export function selectCursoRequest(cursoId) {
  return async (dispatch) => {
    await dispatch(CursoActions.selectCursosRequest(cursoId));
    dispatch(selectCurso(cursoId));
  }
}

export function deselectCursoRequest(cursoId) {
  return async (dispatch) => {
    dispatch(CursoActions.deselectCurso());
    dispatch(deselectCurso());
  }
}

export function filterCursosRequest(year,duration) {
  return (dispatch) => {
    if(year &&  year > 0)
      CursosServices.bucarCursoYearAndDuration(year,duration).then( response => (response.errors)?dispatch(receiveCursosFailure(response.errors)):dispatch(receiveCursos(response.cursos)))
    else
      CursosServices.obtenerCursos().then( response => (response.errors)?dispatch(receiveCursosFailure(response.errors)):dispatch(receiveCursos(response.cursos)))

    dispatch(filterCursos())
  }
}
