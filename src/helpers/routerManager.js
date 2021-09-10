import React from 'react'
import {useAuth} from './auth.context';

import {Route,Switch} from 'react-router-dom';


import Home from '../Structure/Home';
import Error404 from '../Structure/Error404';
import LoginComponent from '../Components/Logueo/login';
import Cursos from '../Components/Cursos/Cursos';
import Curso from '../Components/Cursos/Curso';
import AlumnosComponent from '../Components/Alumnos/Alumnos';
import Alumno from '../Components/Alumnos/Alumno';


const RouterManager = () => {

  const {isLogin} = useAuth();

  return(
    <Switch>
      <Route exact path='/' component={Cursos}></Route>
      <Route exact path='/home' component={Home}></Route>
      {
        (!isLogin)?(
          <React.Fragment>
            <Route exact path='/login' component={LoginComponent}></Route>
          </React.Fragment>
        ):(
          <React.Fragment>
            <Route exact path='/alumnos' component={AlumnosComponent}></Route>
            <Route exact path='/alumnos/crear' component={Alumno}></Route>
            <Route exact path='/curso/crear' component={Curso}></Route>
            <Route exact path='/cursos' component={Cursos}></Route>
          </React.Fragment>
        )
      }
      <Route component={Error404}></Route>
    </Switch>
  )
}

export default RouterManager;