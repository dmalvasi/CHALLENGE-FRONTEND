import GlobalFunctions,{API_HOST,WaitService} from '../helpers/GLOBAL'
import axios from 'axios';
import {authHeader} from '../helpers/auth-header'

const URL_CREAR_CURSO='/api/curso/crear'
const URL_OBTENER_CURSOS='/api/cursos'
const URL_ELIMINAR_CURSO='/api/curso/'
const URL_AGREGAR_ALUMNO_CURSO='/api/curso/addAlumno/'
const URL_ELIMINAR_ALUMNO_CURSO='/api/curso/deleteAlumno/'
const URL_OBTENER_CURSO='/api/curso/'
const URL_OBTENER_CURSO_POR_YEAR_DURATION='/api/curso/search/'
const URL_ACTUALIZAR_CURSO ='/api/curso/'
const URL_ACTUALIZAR_CURSO_NOTAS ='/api/curso/notas/'

function test(){
  console.log('test')
}

const cursosService = {
  async obtenerCursos() {
    await GlobalFunctions.WaitService();
    const requestOptions = {
      headers: authHeader()
    };

    try{
      const value = await axios.get(API_HOST + URL_OBTENER_CURSOS,requestOptions).then(
        response =>{
          return {cursos:response.data};
        }
      ).catch(
        error => {
          return {errors:error}
        }
      )
      return value;
    }catch(error){
      return {errors:error};
    }

  },
  async obtenerCurso(cursoId) {
    const requestOptions = {
      headers: authHeader()
    };
    await GlobalFunctions.WaitService(500);
    try{
      let data = await axios.get(API_HOST + URL_OBTENER_CURSO + cursoId,requestOptions).then(
        response =>{
          return response.data;
        }
      ).catch(
        error => {
          return {errors:error}
        }
      )
      return data;
    }catch(error){
      console.error(error);
      return {errors:error};
    }
  },
  async crearCurso(curso) {
    const requestOptions = {
      headers: authHeader({
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      })
    };
    try{
      let res = await axios.post(API_HOST + URL_CREAR_CURSO,{curso:curso},requestOptions);
      let data = res.data;
      return data;
    }catch(error){
      console.error(error);
      return null;
    }
  },
  async eliminarCurso(id) {
    const requestOptions = {
      headers: authHeader({
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      })
    };
    try{
      let res = await axios.delete(API_HOST + URL_ELIMINAR_CURSO + id,requestOptions);
      let data = res.data;
      return data;
    }catch(error){
      console.error(error);
      return null;
    }
  },
  async agregarAlumnoCurso(cursoId,alumnoId) {
    const requestOptions = {
      headers: authHeader({
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      })
    };
    try{
      let res = await axios.post(API_HOST + URL_AGREGAR_ALUMNO_CURSO + cursoId,{alumnoId:alumnoId},requestOptions);
      let data = res.data;
      return data;
    }catch(error){
      console.error(error);
      return null;
    }
  },
  async eliminarAlumnoCurso(cursoId,alumnoId) {
    const requestOptions = {
      headers: authHeader({
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      })
    };
    try{
      let res = await axios.put(API_HOST + URL_ELIMINAR_ALUMNO_CURSO + cursoId,{alumnoId:alumnoId},requestOptions);
      let data = res.data;
      return data;
    }catch(error){
      console.error(error);
      return null;
    }
  },
  async agregarAlumnosCurso(cursoId,alumnosId) {
    const requestOptions = {
      headers: authHeader({
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      })
    };
    try{
      let res = await axios.post(API_HOST + URL_AGREGAR_ALUMNO_CURSO + cursoId,{alumnosId:alumnosId},requestOptions);
      let data = res.data;
      return data;
    }catch(error){
      console.error(error);
      return null;
    }
  },
  async bucarCursoYearAndDuration(year,duration) {
    const requestOptions = {
      headers: authHeader()
    };
    try{
      const vYear = Number(year);
      const vDuration = Number(duration);
      if (vYear & vYear > 0){
        const urlParams =(vDuration && vDuration>0)? (vYear + '/' + vDuration): vYear
        let data = await axios.get(API_HOST + URL_OBTENER_CURSO_POR_YEAR_DURATION + urlParams,requestOptions).then(
          response =>{
            return {cursos:response.data};
          }
        ).catch(
          error => {
            return {errors:error}
          }
        )
        return data;
      }else{
        return {errors:'El año es obligatorio y debe ser mayor que 0'}
      }
      
    }catch(error){
      console.error(error);
      return {errors:error}
    }
  },
  async guardarCurso(curso) {
    const requestOptions = {
      headers: authHeader({
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      })
    };
    try{
      if (curso && curso._id){
        let data = await axios.put(API_HOST + URL_ACTUALIZAR_CURSO + curso._id,{curso:curso},requestOptions)
        .then (
          response => {
            let data = response.data;
            return data;
          }
        ).cart
        return data;
      }else{
        return null;  
      }
    }catch(error){
      return null;
    }
  },
  async guardarCursoNotas(cursoId,alumnos) {
    const requestOptions = {
      headers: authHeader({
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      })
    };
    try{
      if (cursoId && alumnos){
          let res = await axios.put(API_HOST + URL_ACTUALIZAR_CURSO_NOTAS + cursoId,{alumnos:alumnos},requestOptions);
          let data = res.data;
          return data;
      }
      return null;
    }catch(error){
      console.error(error);
      return null;
    }
  },
}

export default cursosService;