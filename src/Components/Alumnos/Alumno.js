import React, {useState} from 'react';

import alumnoService from '../../Services/alumnos.service'
import DMDialogWait from '../../Tools/DMDialogWait'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const Alumno = ({...props})=>{

  const [alumno,setAlumno] = useState(
    { nombre:'',
      apellido:'',
      dni:'',
      direccion:'',
      estado:'',
    }
  );
  const [errores,setErrores] = useState({});
  const [control,setControl] = useState({creando:false});
    

  function validacionFormulario(alumno){
    const validacionesErrores = {};
    if(!alumno.nombre){
      validacionesErrores.errorNombre = 'el nombre es obligatorio';
    }
    if(!alumno.apellido){
      validacionesErrores.errorApellido = 'el apellido es obligatorio';
    }
    if(!alumno.dni){
      validacionesErrores.errorDni = 'obligatorio';
    }else{
      if(alumno.dni.length<7 || alumno.dni.length>8)
        validacionesErrores.errorDni = 'error formato';
    }

    if(!alumno.direccion){
      validacionesErrores.errorDireccion = 'la direccion es obligatoria';
    }
    setErrores(validacionesErrores);
    return (Object.entries(validacionesErrores).length === 0)
  }

  async function handleSubmit(event){
    event.preventDefault();
    if(validacionFormulario(alumno)){
      setControl({creando:true});
      const data = await alumnoService.crearAlumno(alumno);
      if(data){
        if(props.onCreate){
          await props.onCreate();
        }
      }      
    }
    setControl({creando:false});
  };

  function handleCancel(event){
    if(props.onCancel){
      props.onCancel();
    }
  };


  function handleChange(event){
    setAlumno({...alumno,[event.target.name]: event.target.value});
  }

  function loadingAlumno(){
    return (control.creando)?(
      <DMDialogWait text='Creando alumno ...' open={control.creando}></DMDialogWait>
    ):(<></>)

  }

  
  return (
    <Box display='flex' justifyContent='center'  flexWrap='nowrap' alignItems='stretch'>
      <Box alignItems='stretch' width='100%'>
        <div style={{backgroundColor:'#DDD', padding:'5px' , paddingLeft:'25px'}}>
          <span style={{fontSize:'2rem',fontWeight:'800'}}>Crear Alumno</span>
        </div>
        <div style={{padding :'0px 25px'}}>
          <form onSubmit={handleSubmit} style={{padding:'15px'}}>
            <div>
              <TextField label="Nombre" error={(errores && errores.errorNombre)}  helperText={errores.errorNombre} id='nombre' name='nombre' onChange={handleChange} value={alumno.nombre} placeholder="nombre" type="text" fullWidth ></TextField>
            </div>
            <div>
              <TextField style={{marginTop:'12px'}} error={(errores && errores.errorApellido)}  helperText={errores.errorApellido}  label="Apellido" id='apellido' name='apellido' onChange={handleChange} value={alumno.apellido} placeholder="apellido" type="text" fullWidth></TextField>
            </div>
            <div>
              <TextField style={{marginTop:'12px'}} error={(errores && errores.errorDni)}  helperText={errores.errorDni} label="Dni" id='dni' name='dni' onChange={handleChange} value={alumno.dni} placeholder="dni" type="text" fullWidth></TextField>
            </div>
            
            <div>
              <TextField style={{marginTop:'12px'}} error={(errores && errores.errorDireccion)}  helperText={errores.errorDireccion} label="Direccion" id='direccion' name='direccion' onChange={handleChange} value={alumno.direccion} placeholder="direccion" type="text" fullWidth></TextField>
            </div>
            <div style={{ display: 'flex',flexDirection:'row',paddingTop:'25px',paddingBottom:'10px', alignItems:'center',justifyContent:'flex-end'}}>
              <Button disabled={false} style={{marginRight:'10px'}} type="submit" variant="contained" color="primary">Crear</Button>
              <Button disabled={false} style={{marginRight:'10px'}} variant="contained" color="secondary" onClick={handleCancel}>Cancelar</Button>
            </div>
          </form>
        </div>
      </Box>
      {loadingAlumno()}
    </Box>
  )
  
}

export default Alumno;