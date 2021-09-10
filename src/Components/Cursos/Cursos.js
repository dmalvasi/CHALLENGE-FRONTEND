import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux'
import {fetchCursosIfNeededs,filterCursosRequest,deselectCursoRequest} from '../../Store/cursos/cursosActions'

import SearchYearDuration from "../../Tools/SearchYearDuration";
import CursosGrid from './CursosGrid';
import CursosList from './CursosList';
import CursoEdit from './CursoEdit';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';



const Cursos = (props) => {
  const { dispatch } = props
  const {cursoSelectedId} = props.cursosStore;
  const [control,setControl] = useState({
    width:'100',
    pos:12,
    columnMain:4,
    displaySelected:false
  });
  
  

  useEffect(async () => {
    dispatch(fetchCursosIfNeededs())
  }, []);

  useEffect(async () => {
    if(cursoSelectedId){
      setControl({...control,columnMain:4});
    }else{
      setControl({...control,columnMain:11});
    }
  }, [cursoSelectedId]);

  
  function handlerExpand(){
    setControl({displaySelected:false,width:'98%',pos:4,columnMain:11});
    props.dispatch(deselectCursoRequest())
  }

  function handlerSearchYearAndDuration(year,duration){
    props.dispatch(filterCursosRequest(year,duration))
  }

  const viewCursoDetail = ()=>{
    if(cursoSelectedId){
      return(
        <Grid container item xs={8} justifyContent='center' style={{paddingTop: '20px',overflowY:'auto',height:'100%'}}>
          <Grid item xs={10}>
            <CursoEdit></CursoEdit>
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <Grid direction="row" container justifyContent="center" style={{padding:'0px 0px', height:'100%', overflowY:'hidden'}}>
        <Grid item xs={control.columnMain} style={{height:'100%', overflowY:'auto'}}>
          <Grid style={{backgroundColor:'#2196f3'}}>
            <Grid>
              {
                (cursoSelectedId)?(
                  <Grid>
                    <IconButton onClick={handlerExpand} style={{float:'right'}}>
                      <ArrowForwardIosIcon style={{color:'#FFF'}}></ArrowForwardIosIcon>
                    </IconButton>
                  </Grid>
                ):<></>
              }
              <Grid container style={{color:'#FFF', paddingTop:'5px',paddingBottom:'10px'}} justifyContent='center' alignItems='center'>
                <span style={{fontSize:'2rem',fontWeight:'900'}}>Lista de Cursos</span>
              </Grid>
            </Grid>
            <Grid>
              <SearchYearDuration onSearch={handlerSearchYearAndDuration}></SearchYearDuration>
            </Grid>
          </Grid>
          <Grid style={{paddingTop:'15px'}}>
          {
            (cursoSelectedId)?
              <CursosList></CursosList>
            :
              <CursosGrid></CursosGrid>
          }
          </Grid>
        </Grid>
        {viewCursoDetail()}
    </Grid>
  );
} 

const mapStateToProps  = state =>({
  cursosStore : state.cursosReducer,
});

export default connect(mapStateToProps)(Cursos);