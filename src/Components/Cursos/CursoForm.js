import React, { useEffect,useState } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const CursoForm = ({...props}) => {

  const [curso,setCurso] = useState(
    { 
      tema:'',
      anioDictado:new Date().getFullYear(),
	    duracion:1,
      descripcion:'',
      estado:'',
    }
  );
  const [errores,setErrores] = useState({});

  useEffect(()=>{
    if(props.curso){
      setCurso(props.curso);
    }
  },[])

  function  valicionFormulario(curso){
    const validacionesErrores = {};
    if(!curso.tema){
      validacionesErrores.errorTema = 'el tema es obligatorio';
    }
    if(!curso.anioDictado){
      validacionesErrores.errorAnioDictado = 'el año dictado es obbligatorio';
    }
    if(!curso.duracion){
      validacionesErrores.errorDuracion = 'la duracion es obbligatoria';
    }
    setErrores(validacionesErrores);
    return (Object.entries(validacionesErrores).length === 0)
  }

  function handleSubmit(event){
    event.preventDefault();
    if(valicionFormulario(curso)){
      if(props.onCreateCurso)
        props.onCreateCurso(curso)
    }
  }

  function handlerCancel(){
    if(props.onCancel)
      props.onCancel()
    
  }

  function handleChange(event){
    setCurso({...curso,[event.target.name]: event.target.value});
  }

  return(
    <form onSubmit={handleSubmit} >
      <div>
        <TextField inputProps={{ maxLength: 60 }} label="Tema" error={(errores && errores.errorTema)}  helperText={errores.errorTema} id='tema' name='tema' onChange={handleChange} value={curso.tema} placeholder="tema" type="text" fullWidth ></TextField>
      </div>
      <div>
        <TextField style={{marginTop:'12px'}}  type="number" InputLabelProps={{shrink: true,}} label="Año" error={(errores && errores.errorAnioDictado)}  helperText={errores.errorAnioDictado} id='anioDictado' name='anioDictado' onChange={handleChange} value={curso.anioDictado} placeholder="año dictado" fullWidth ></TextField>
      </div>
      <div>
        <TextField style={{marginTop:'12px'}}  type="number" InputLabelProps={{shrink: true,}} label="Duracion" error={(errores && errores.errorDuracion)}  helperText={errores.errorAnioDuracion} id='duracion' name='duracion' onChange={handleChange} value={curso.duracion} placeholder="duracion" fullWidth ></TextField>
      </div>
      <div>
        <TextField
          style={{marginTop:'20px',width:'100%'}}
          label="Descripcion"
          placeholder="descripcion"
          multiline
          variant="outlined"
          onChange={handleChange} 
          value={curso.descripcion}
          id='descripcion' 
          name='descripcion'
          rows={6}
          inputProps={{ maxLength: 300 }} 
        ></TextField>
      </div>
      <div style={{ display: 'flex',flexDirection:'row',paddingTop:'25px',paddingBottom:'10px', alignItems:'center',justifyContent:'flex-end'}}>
        <Button disabled={false} style={{marginRight:'10px'}} type="submit" variant="contained" color="primary">Crear</Button>
        <Button disabled={false} style={{marginRight:'10px'}} variant="contained" color="secondary" onClick={handlerCancel}>Cancelar</Button>
      </div>
    </form>
  )

}

export default CursoForm;