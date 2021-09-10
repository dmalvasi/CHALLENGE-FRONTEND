import {
        RECEIVE_CURSOS,
        REQUEST_CURSOS,
        RECEIVE_CURSOS_SUCCESS,
        RECEIVE_CURSOS_FAILURE,
        DELETE_CURSO,
        SELECT_CURSOS,
        DESELECT_CURSOS,
        FILTER_CURSOS,
        CREATE_CURSO,
        UPDATE_CURSO,
        UPDATE_CURSO_NOTAS
} from './cursosActions'


const initializeCurso = 
  {
    query:{
      year:null,
      duration:null
    },
    cursoSelectedId:'',
    isFetching: false,
    didInvalidate: false,
    cursos:[],
  }
;


export const cursosReducer = ( state = initializeCurso , action) => {
  const {type,payload} = action;
  switch (type){
    case REQUEST_CURSOS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_CURSOS:{
      return Object.assign({}, state, {
        cursos: payload.cursos,
        lastUpdated: payload.receivedAt
      })
    }
    case RECEIVE_CURSOS_SUCCESS:{
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
      })
    }
    case RECEIVE_CURSOS_FAILURE:{
      return Object.assign({}, state, {
        error: payload.error,
        cursos:[]
      })
    }
      
    case DELETE_CURSO:
      const cursosDelete = state.cursos.filter(({ _id }) => _id !== payload.id);
      return Object.assign({}, state, {
        cursos: cursosDelete,
      })
      
    case SELECT_CURSOS:
      return {...state,cursoSelectedId:payload.cursoId}
      
    case DESELECT_CURSOS:
      return {...state,cursoSelectedId:null}

    case CREATE_CURSO:
      return {...state,cursos:[...state.cursos,payload.curso]}
      
    case UPDATE_CURSO_NOTAS:
      const {cursoId,alumnos} = payload;
      if(state.cursos){
        const cursos = state.cursos.map(
          (curso) => cursoId === curso._id ? {...curso,alumnos:alumnos} : curso
        );
        return {...state,cursos:cursos}
      }else{
        return state;
      }
      
    case UPDATE_CURSO:
      const {curso} = payload;
      if(state.cursos){
        const cursosUpdate = state.cursos.map(
          (cursoItem) => curso._id === cursoItem._id ? curso : cursoItem
        );
        return {...state,cursos:cursosUpdate}
      }else{
        return state;
      }
    
    case FILTER_CURSOS:
      if(payload && payload.year){
        return {...state,query:{year:payload.year,duration:(payload.duration)?payload.duration:null}}
      }else{
        return {...state,query:{year:null,duration:null}}
      }

    default : {
      return state;
    }
  }

}