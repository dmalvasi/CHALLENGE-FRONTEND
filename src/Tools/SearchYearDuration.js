import InputBase from '@material-ui/core/InputBase'
import { withStyles,P } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from 'react';

const styles = {
  root: {
    background: "rgb(255,255,255,0.3)",
    opacity: '0.8',
    width:'auto',
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
    border: 'solid 1px #DDD',
    borderRadius: '7px',
    padding: '2px',
    marginLeft: '5px',
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  inputArrow: {
    marginLeft: '5px',
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  label:{
    fontSize:'1.2rem',
  },
  button:{
    color:'#FFF',
    paddingLeft:'15px'
  }
};

function SearchYearDuration({...props}) {
  
  const { classes,placeholder='',onSearch} = props;
  const [values,setValues] = useState({year:'',duration:''});
 
  function handlerChange(event){
    setValues({...values,[event.target.name]:event.target.value});
  }


  function handlerSearch(){
    if(props.onSearch){
      props.onSearch(values.year,values.duration);
    }
  }
  
  
  return (
    <Box className={classes.root}>
      <div>
        {/*<div className={classes.label}>Año</div>*/}
        <InputBase
          placeholder='año'
          className={classes.input}
          classes={
            {input:classes.inputArrow}
          }
          value={values.year}
          onChange={handlerChange}
          type='number'
          name='year'
        />
      </div>
      <div>
      {/*<span className={classes.label}>Duracion</span>*/}
      <InputBase
        placeholder='duracion'
        className={classes.input}
        value={values.duration}
        onChange={handlerChange}
        classes={
          {input:classes.inputArrow}
        }
        type='number'
        name='duration'
      />
      </div>
      <IconButton onClick={handlerSearch} className={classes.button}>
        <SearchIcon fontSize="medium" /> 
      </IconButton>
    </Box>
  );
}


export default withStyles(styles)(SearchYearDuration);



