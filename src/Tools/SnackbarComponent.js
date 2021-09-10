import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';



const SnackbarComponent = ({value,severity='success',open,onClose,vertical='top',horizontal='center'})=>{
 
  return(
    <Snackbar 
      open={open} 
      anchorOrigin={{vertical: vertical,horizontal: horizontal}} 
      onClose={onClose}
      key={28}
    >
    <ClickAwayListener onClickAway={this.handleClickAway}>
      <Alert onClose={() => {}} severity="error" style={{width:'300px',backgroundColor:'#f8bbd0'}}>
        {value}
      </Alert>
    </ClickAwayListener>
    </Snackbar>
  )
}

export default SnackbarComponent;