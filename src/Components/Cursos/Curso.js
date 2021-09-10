import React, { useState } from 'react';
import { connect } from 'react-redux'
import {createCursoRequest} from '../../Store/cursos/cursosActions'
import CursoForm from './CursoForm';
import Grid from '@material-ui/core/Grid';


const Curso = ({...props}) => {

  const [control,setControl] = useState({creando:false});

  function onCreateCurso(curso){
    props.history.push('/cursos');
 }

  async function handlerCrearCurso(curso){
    if(curso){
      setControl({creando:true});
      props.dispatch(createCursoRequest(curso))
      setControl({creando:false});
      onCreateCurso(curso);
    }
  }

  function handlerCancel(){
    props.history.push('/cursos');
  }

  function loadCurso(){
    return (
      <Grid container display='flex' alignItems='center' justifyContent='center'>
        <Grid item xs={10} sm={7} md={4} style={{ marginTop:'20px', minWidth:'400px', padding:'0px 25px', border:'1px solid #DDD'}}>
          <div style={{backgroundColor:'#DDD'}}>
            <h1>Crear Curso</h1>
          </div>
          <div>
            <CursoForm onCancel={handlerCancel} onCreateCurso={handlerCrearCurso} ></CursoForm>
          </div>
        </Grid>
      </Grid>
    )
  }


  function loadingCurso(){
    return (
      <div>
        <span>Load Curso</span>
      </div>
    )
  }


  function renderView(){
    const creando = control.creando;
    let view;
    if (creando) {
      view = loadingCurso();
    } else {
      view = loadCurso();
    }
    return (
      <div>
        {view}
      </div>
    );
  }

  return renderView();
}


const mapStateToProps  = state =>({
  cursosStore: state.cursosReducer,
});

export default connect(mapStateToProps)(Curso);
