import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useAuth} from '../../helpers/auth.context'

const AlumnosMenuItem = () => {

  const {isLogin} = useAuth();

  if(isLogin){
    return (
      <div>
        <Button component={Link} to='/alumnos'>
          Alumnos
        </Button>
      </div>
    )
  }else{
    return <></>;
  }
}


export default AlumnosMenuItem;