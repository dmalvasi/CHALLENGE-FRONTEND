import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import serviceAlumnos from '../../Services/alumnos.service'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SimpleDialog from '../../Tools/SimpleDialog'
import AlumnoHeader from './AlumnoHeader';
import AlumnoAddDialog from './AlumnoAddDialog';
import AlumnoItem from './AlumnoItem'
import DMDialogWait from '../../Tools/DMDialogWait'


const useStyles = makeStyles({
  root:{
    color:'black',
  },
  detail:{
    padding: '10px 30px',
    border:'1px solid #d50000',
    borderTop:'none',
  }
});



const Alumnos = ({props})=>{

  const style = useStyles();

  const [itemSelected,setItemSelected] = useState();
  const [alumnos,setAlumnos] = useState([]);
  const [cargandoAlumnos,setCargandoAlumnos] = useState(false);
  const [openDialogDelete,setOpenDialogDelete] = useState(false);
  const [openDialogDeleting,setOpenDialogDeleting] = useState(false);
  const [openAlertDelete,setOpenAlertDelete] = useState(false);
  const [control,setControl] = useState({
    close:false,
    alumnoToDelete:null,
    openAddAlumno : false,
  });

  useEffect(()=> {
    loadingAlumnos();
  }, []);


  async function loadingAlumnos(){
    setCargandoAlumnos(true);
    await loadAlumnos();
    setCargandoAlumnos(false);
  }

  async function loadAlumnos(){
    const alumnosLoad = await serviceAlumnos.obtenerAlumnos();
    setAlumnos(alumnosLoad);
  }
    
  function handlerCloseAddAlumno(){
    setControl((controlOld)=>{
        return {...controlOld,openAddAlumno:false}
    });
  }
  
  async function onCreateAlumno(){
    await loadAlumnos();
    handlerCloseAddAlumno();
  }

  function handlerAddAlumno(){
    setControl({...control,openAddAlumno:true});
  }

  async function handlerDialogDeleteAlumno(value){
    handlerDialogDeleteAlumnoClose(); 
    if(itemSelected){
      setOpenDialogDeleting(true);
      const alumnoEliminado = await serviceAlumnos.eliminarAlumno(itemSelected);;
      await loadAlumnos();
      setOpenDialogDeleting(false);
      setOpenAlertDelete(true);
      setItemSelected(null);
    }
  }

  function handlerDialogDeleteAlumnoClose(){
    setOpenDialogDelete(false);
  }

  function handlerCloseAlertDelete(){
    setOpenAlertDelete(false);
  }

  function handlerDeleteAlumno(_id,detalle){
    if(_id){
      setItemSelected(_id);
      setOpenDialogDelete(true);
      setControl({...control,alumnoToDelete:detalle});
    }
  }






  function showPopupDeleteConfirm(){
    return (
      (openDialogDelete)?(
        <div style={{overflowY:'auto'}}>
          <SimpleDialog title='Eliminacion de Alumno' message={`Desea elimina a ${control.alumnoToDelete}`} selectedValue={handlerDialogDeleteAlumno} open={openDialogDelete} onClose={handlerDialogDeleteAlumnoClose} />
        </div>
      ):(<></>)
    )
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="outlined" {...props} />;
  }

  function showPopupDeleteAlert(){
    return(openAlertDelete)?(
      <Snackbar 
        open={openAlertDelete} 
        anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
        onClose={handlerCloseAlertDelete}
        key={28}
      >
        <ClickAwayListener onClickAway={handlerCloseAlertDelete}>
          <Alert onClose={() => {handlerCloseAlertDelete()}} severity="error" style={{width:'300px',backgroundColor:'#f8bbd0'}}>
            Se elimino el Alumno!
          </Alert>
        </ClickAwayListener>
      </Snackbar>
    ):(<></>)
  }


  function showPopupAlumnoDeleting(){
    return (openDialogDeleting)?(
      <DMDialogWait text='Eliminando alumno ...' open={openDialogDeleting}></DMDialogWait>
    ):<></>
  }


  function showCrearAlumno(){
    return (
      (control.openAddAlumno)?(
        <AlumnoAddDialog key='key-alumno-add-dialog' open={control.openAddAlumno} onCreate={onCreateAlumno} onCancel={handlerCloseAddAlumno} ></AlumnoAddDialog>
      ):(<></>)
    )
  }

  function showCargandoAlumno(){
    return (
      (cargandoAlumnos)?(
        <DMDialogWait text='Cargando los alumnos ...' open={cargandoAlumnos}></DMDialogWait>
      ):(<></>)
    )
  }
  

  function view(){
    return  (
      <Grid className={style.root} container justifyContent='center' style={{paddingTop:'10px'}}>
        <Grid item xs={12} sm={10} md={8}>
          <AlumnoHeader onAddAlumno={handlerAddAlumno}></AlumnoHeader>
          {
            (alumnos && alumnos.length > 0)?(
              <Box className={style.detail}>
                <ul>
                  {
                    alumnos.map((value, index) => {
                      return <AlumnoItem alumno={value} onClickDelete={handlerDeleteAlumno} key={index}></AlumnoItem>
                    })  
                  }
                </ul>
              </Box>
            ):<div>No hay alumnos</div>
          }
        </Grid>
      </Grid>
    )
  }

  return ( 
    <React.Fragment>
      {view()}
      {showPopupDeleteConfirm()}
      {showPopupAlumnoDeleting()}
      {showPopupDeleteAlert()}
      {showCrearAlumno()}
      {showCargandoAlumno()}
    </React.Fragment>
  )

}

export default Alumnos;