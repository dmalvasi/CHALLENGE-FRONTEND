import './login.css'
import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {useAuth} from '../../helpers/auth.context'
import { MAIN_PAGE } from '../../helpers/GLOBAL'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const LoginComponent = (props)=>{

  const {login,isLogin,loginError} = useAuth();

  const [loginData,setLoginData] = useState({user:'',password:''});

  const [pageRedirect,setPageRedirect] = useState({});
  const [errores,setErrores] = useState({});
  const [control,setControl] = useState({creando:false,isLogin});
    
  
  
  useEffect(()=>{
    setPageRedirect((props.pageRedirect)?props.pageRedirect:MAIN_PAGE);
  },[])


  function handlerChange(event) {
    setLoginData({...loginData,[event.target.name]: event.target.value});
  }

  function redirectPage(){
    props.history.push(pageRedirect?pageRedirect:MAIN_PAGE)
  }

  async function validateLogin() {
    let usr = loginData.user;
    let psw = loginData.password;
    const rta = await login(usr,psw);
    if(rta){
      setTimeout(() => {redirectPage()}, 1000);
    }
  }

  function renderView(){
    let stylesInline = {
      width: '100%',
      height: '30px',
      backgroundColor: 'green',
      color: 'white'
    };

    let loginMessage;

    if(isLogin){
        loginMessage = <div style ={stylesInline}>
                        <p>Login OK</p>
                     </div>
    }

    if(loginError){
      loginMessage = <div style ={stylesInline,{backgroundColor: 'red'}}>
                        <p>ERROR</p>
                     </div>
    }
  
    return  <div style={{height:'100vh',display: 'flex',alignItems:'center',justifyContent:'center' }}>
              <form className="loginContent" style={{width:'300px'}}>
                <div className="title">Login</div>
                <div>
                  <TextField name='user' style={{width:'90%',marginBottom:'12px'}} onChange={handlerChange} value={login.user} placeholder="usuario" type="text"></TextField>
                </div>
                <div>
                  <TextField name='password' style={{width:'90%',marginBottom:'12px'}} onChange={handlerChange} value={login.password} placeholder="password" type="password"></TextField>
                </div>
                <div style={{paddingTop:'10px', width:'100%'}}>
                  <Button style={{alignItems:'right'}} variant="contained" onClick={validateLogin} color="primary">Iniciar Sesion</Button>
                </div>
                {loginMessage}
              </form>
            </div>;
  }

  return renderView();

}

export default LoginComponent
