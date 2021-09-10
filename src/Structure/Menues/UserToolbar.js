import React,{useEffect} from 'react';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import {useAuth} from '../../helpers/auth.context'


const UserToolbar = (props) => {

  const {isLogin,logout} = useAuth();
  const [values, setValues] = React.useState({
                                anchorEl: null,
                              })



  const handleClick = (e) =>{
    setValues({anchorEl:e.currentTarget});
  };

  const handleClose = () =>{
    setValues({anchorEl:null});
  };


  const handleLogout = (e) =>{
    handleClose();
    logout();
  };
  
  if(isLogin){
    return (
      <ToolBar>
        <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
          Usuario
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={values.anchorEl}
          keepMounted
          open={Boolean(values.anchorEl!=null)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </ToolBar>
    )
  } else {
    return(
      <ToolBar>
        <Button component={Link} to='/login'>
          Login
        </Button>
      </ToolBar>
    )
  }
}


export default UserToolbar;