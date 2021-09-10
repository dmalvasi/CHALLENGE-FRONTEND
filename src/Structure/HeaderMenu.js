import React from 'react'
import { Link } from 'react-router-dom'
import UserToolbar from './Menues/UserToolbar';
import AlumnosMenuItem from './Menues/AlumnosMenuItem';
import CursosMenuItem from './Menues/CursosMenuItem';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import { makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'

const StyledAppBar = makeStyles({
  root: {
    color: '#FFF',
    backgroundColor:'#2196f3',
    textColor: '#FFF',
  },
  label:{
    color: '#FFF',
  }
});



const HeaderMenu=({...props})=>{

  const style= StyledAppBar;
  
  function renderView(){
    return  (
      <AppBar className={style.root} >
        <ToolBar >
          <IconButton component={Link} to='/' className="example-icon" aria-label="Example icon-button with menu icon">
            <Icon>menu</Icon>
          </IconButton>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <ToolBar>
              <AlumnosMenuItem ></AlumnosMenuItem>
              <CursosMenuItem ></CursosMenuItem>
            </ToolBar>
            <UserToolbar></UserToolbar>
          </Grid>
        </ToolBar>
          
      </AppBar>
    )
  }

  return renderView();

}


export default HeaderMenu;