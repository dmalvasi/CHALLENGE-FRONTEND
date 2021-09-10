import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import {useAuth} from '../../helpers/auth.context'

const CursosMenuItem = (props) => {

  const {isLogin} = useAuth();
  const [values, setValues] = React.useState({
                                anchorEl: null,
                              })


  const handleClick = (e) =>{
    setValues({anchorEl:e.currentTarget});
  };

  const handleClose = (e) =>{
    setValues({anchorEl:null});
  };

  if(isLogin){
    return (
      <span>
        <Button onClick={handleClick}>
          Cursos
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={values.anchorEl}
          keepMounted
          open={Boolean(values.anchorEl)}
          onClose={handleClose}
        >
          <MenuItem  component={Link} to='/curso/crear' onClick={handleClose}>Creacion</MenuItem>
          <MenuItem  component={Link} to='/cursos' onClick={handleClose}>Buscar</MenuItem>
        </Menu>
      </span>
    )
  }else{
    return <></>;
  }
}


export default CursosMenuItem;