import GlobalFunctions,{API_HOST} from '../helpers/GLOBAL'
import axios from 'axios';

import {authHeader} from '../helpers/auth-header'

const URL_CREAR_ALUMNO ='/api/alumno/crear'
const URL_OBTENER_ALUMNOS='/api/alumnos'
const URL_ELIMINAR_ALUMNO ='/api/alumno/'
const URL_OBTENER_ALUMNO ='/api/alumno/'


const alumnosService = {
  async obtenerAlumnos() {
    const requestOptions = {
      headers: authHeader()
    };
    try{
      let res = await axios.get(API_HOST + URL_OBTENER_ALUMNOS,requestOptions);
      await GlobalFunctions.WaitService();
      let data = res.data;
      return data;
    }catch(error){
      return null;
    }
  },
  async obtenerAlumno(alumnoId) {
    const requestOptions = {
      headers: authHeader()
    };

    try{
      let res = await axios.get(API_HOST + URL_OBTENER_ALUMNO + alumnoId,requestOptions);
      await GlobalFunctions.WaitService();
      let data = res.data;
      return data;
    }catch(error){
      console.error(error);
      return null;
    }
  },
  async crearAlumno(alumno) {
    const requestOptions = {
      headers: authHeader({
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      })
    };
    try{
      let res = await axios.post(API_HOST + URL_CREAR_ALUMNO,{alumno:alumno},requestOptions);
      let data = res.data;
      await GlobalFunctions.WaitService();
      return data;
    }catch(error){
      return null;
    }
  },
  async eliminarAlumno(id) {
    const requestOptions = {
      headers: authHeader({
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': 'application/json',
      })
    };
    try{
      let res = await axios.delete(API_HOST + URL_ELIMINAR_ALUMNO + id,requestOptions);
      let data = res.data;
      await GlobalFunctions.WaitService(500);
      return data;
    }catch(error){
      return null;
    }
  },

}

export default alumnosService;