export const API_HOST = 'http://localhost:3901';
export const MAIN_PAGE = '/cursos';

export const AxiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'accept': 'application/json',
  }
};


const GlobalFunctions = {
  async WaitService(stallTime = 3000){
    await new Promise(resolve => setTimeout(resolve, stallTime));
  }
}

export default GlobalFunctions;


