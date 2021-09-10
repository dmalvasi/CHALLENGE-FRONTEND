import GLOBAL,{API_HOST} from '../helpers/GLOBAL'
import axios from 'axios';

const URL_LOGIN ='/api/user/login'
const URL_LOGIN_VALIDATE ='/api/user/sessionValid'
const URL_LOGOUT ='/api/user/loginout'

const loginService = {

  async stall(stallTime = 3000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
  },
  
  async login (username, password) {
    if (username && password) {
      return await axios.post(API_HOST + URL_LOGIN, {userName: username, password: password,gethash:true},GLOBAL.AxiosConfig).then(
          (response) => {
            const {user,token} = response.data;
            if(token && user){
              const userRegistered = {userName: user.loginId,token:token}
              return(userRegistered);
            }else{
              return ({error:'usuario o password'});
            }
          }
        ).catch((error)=>{
          if(error.response)
            return {error:error.response.data};
          return null;
        })
    }
  }, 
  async validateLogin () {
    const value = localStorage.getItem('user');
    if(value){
      const {user,token} = value;
      if(user && token){
        const {data} = await axios.post(API_HOST + URL_LOGIN_VALIDATE, {token: token},GLOBAL.AxiosConfig);
        return data.isLogin;
      }else{
        return (new Error('Usuario no logueado'));
      }
    }
  },
  
  async logout() {
    localStorage.removeItem('user')
  }
}

export default loginService;