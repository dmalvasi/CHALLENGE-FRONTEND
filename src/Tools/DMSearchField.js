import InputBase from '@material-ui/core/InputBase'
import { withStyles,P } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from 'react';

const styles = {
  root: {
    background: "rgb(255,255,255,0.3)",
    opacity: '0.8',
    minWidth:'300px',
    padding:'5px 15px',
    color:'#FFF',
    display:'flex',
    alignItems:'center',
    borderRadius:'8px',
  },
  input: {
    color:'#FFF',
    paddingLeft:'10px',
    fontSize:'1.2rem',
    width:'100%'
  }
};

function DMSearchField({...props}) {
  
  const { classes,placeholder='',onSearch} = props;
  const [value,setValue] = useState('');
 
  function handlerChange(event){
    setValue(event.target.value);
  }
  
  
  return (
    <Box className={classes.root}>
      <SearchIcon fontSize="medium" /> 
      <InputBase
        placeholder={placeholder}
        className={classes.input}
        value={value}
        onChange={handlerChange}
      />
    </Box>
  );
}


export default withStyles(styles)(DMSearchField);



