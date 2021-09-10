import React,{ createContext, useState,useEffect } from "react";
import ServiceLogin from "../Services/login.service";
export const AuthContext = createContext(null);



export const AuthProvider = ({children}) =>{
  
  const [currentUser,setCurrentUser] =useState({});
  const [isLogin,setIsLogin] =useState(false);
  const [loginError,setLoginError] =useState('');

  useEffect(() => {
    validate();
  }, []);

  async function login(user,password){
    if(user && password){
      console.log(user + ' - ' + password )
      const rta = await ServiceLogin.login(user,password);
      console.log(rta)
      if(rta.error){
        setLoginError(rta.error);
        setIsLogin(false);
        localStorage.removeItem('user');
        return false;
      }else{
        setLoginError('');
        const {userName,token} = rta;
        handlerLogin(userName,token);
        return true;
      }
    }
  }

  function logout(){
    handlerLogout();
  }

  function getToken(){
    const user = localStorage.getItem('user');
    return (user)?user.token:null;
  }

  function validate(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      handlerLogin(user.userName,user.token);
    }else{
      handlerLogout();
    }
  }
  
  function handlerLogout(){
    setCurrentUser({});
    setIsLogin(false);
    localStorage.removeItem('user');
  }


  function handlerLogin(userName, token){
    setCurrentUser({userName,token});
    setIsLogin(true);
    localStorage.setItem('user',JSON.stringify({userName,token}));
  }

  return(
    <AuthContext.Provider value={{isLogin,login,logout,getToken,validate,loginError}}>
      {children}
    </AuthContext.Provider>
  )
};



export const useAuth = () => React.useContext(AuthContext);