import React from 'react'




const LoginManager = ()=>{
  return <></>
}  


const mapStateToProps  = state =>({
  loginStore: state.loginReduce,
});

const mapDispatchToProps  = dispatch =>({
  handlerLoginDispatch: (user,token)=> dispatch(login(user,token)), 
});   

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent)
