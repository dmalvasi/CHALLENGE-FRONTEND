import React, {useState } from 'react';
import { connect } from 'react-redux'
import {updateCursoNotasRequest} from '../../Store/cursos/cursosActions'

import { makeStyles } from '@material-ui/core/styles';
import {addAlumnosCursoRequest,removeAlumnoCursoRequest} from '../../Store/curso/cursoActions'


import CursoEditHead  from './CursoEditHead'
import CursoAlumnosList from './CursoAlumnosList'
import CursoAddAlumnoDialog from './CursoAddAlumnoDialog'

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const ColorPrimary = '#2196f3';

const useStyles = makeStyles({
  root: {
    backgroundColor:ColorPrimary,
  },
  listaAlumno: {
    border:'1px solid ' + ColorPrimary,
    borderTop:'none',
  },
  titleListaAlumno:{
    color:'#FFF',
    backgroundColor:'#0d47a1',
    height:'40px',
    fontSize: '1.5rem'
  },
  action:{
    backgroundColor:'#cccccc29',
    height:'60px',
    borderTop:'none',
  },
  buttonAdd:{
    float:'right',
    height:'100%',
    
  },
  buttonAddIcon:{
    color:'#FFF'
  }
});

const CursoEdit = ({...props}) => {
  
  const style = useStyles();
  const {curso} = props.cursoStore;
  const cursoSelectedId = props.cursosStore.cursoSelectedId
  const [control,setControl] = useState({creando:false,openAddAlumno:false});

  async function handlerAlumnoRemove(id){
    props.dispatch(removeAlumnoCursoRequest(curso._id,id));
  }
  
  async function handlerAlumnoAssociate(alumnos){
    props.dispatch(addAlumnosCursoRequest(curso._id,alumnos));
    setControl({...control,openAddAlumno:false});
  }
  

  function handlerSave(){
    const {curso} = props.cursoStore;
    props.dispatch(updateCursoNotasRequest(curso._id,curso.alumnos));
  }

  function handlerAddAlumnoCancel(){
    setControl({...control,openAddAlumno:false})
  }

  function handlerOpenAssociateAlumno(){
    setControl({...control,openAddAlumno:true})
  }

  return(
    <Grid>
      {
        (cursoSelectedId)?
          <React.Fragment>
            <CursoEditHead curso={curso}></CursoEditHead>
            <Box className={style.listaAlumno}>
              <Box className={style.titleListaAlumno}>
                <span>Lista Alumnos</span>
                <IconButton className={style.buttonAdd} onClick={handlerOpenAssociateAlumno}>
                  <AddCircleIcon className={style.buttonAddIcon}/>
                </IconButton>
              </Box>
              <CursoAlumnosList onDelete={handlerAlumnoRemove} alumnos={curso.alumnos}></CursoAlumnosList>
            </Box>
            <Grid container  justifyContent="flex-end" alignItems="center" className={style.action}> 
              <Button disabled={false} style={{marginRight:'10px'}} variant="contained" color='primary' onClick={handlerSave}>Guardar</Button>
            </Grid>
            <CursoAddAlumnoDialog 
              onCancel={handlerAddAlumnoCancel} 
              onAssociate={handlerAlumnoAssociate} 
              open={control.openAddAlumno}
              key={curso._id}
              values={curso.alumnos}
            >
            </CursoAddAlumnoDialog>
          </React.Fragment>
        :(
          <React.Fragment>
            <span>NO EXITE CURSO</span>
          </React.Fragment>
        )
      }
    </Grid>
  )

}

const mapStateToProps  = state =>({
  cursoStore: state.cursoReducer,
  cursosStore : state.cursosReducer
});


export default connect(mapStateToProps)(CursoEdit)