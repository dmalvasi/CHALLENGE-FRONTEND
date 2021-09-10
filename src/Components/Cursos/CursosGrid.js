import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CursoCard from './CursoCard';
import { connect } from 'react-redux'

const CursosGrid = ({...props}) => {

  if(props.cursosStore.cursos){
    const {cursos} = props.cursosStore;
    return (
      <Grid container item spacing={2} xs={12} alignItems="stretch" style={{paddindLeft:'5px',paddindRight:'5px',}}>
        { (cursos)?
          (
            cursos.map((curso,index)=>{
              return(
                <Grid item key={index} xs={12} sm={6}  md={4} style={{alignItems: 'stretch'}}>
                  <CursoCard curso={curso} {...props}></CursoCard>
                </Grid>
              )
            })
          ):<></>
        }
      </Grid>
    )
  }else{
    return (<React.Fragment></React.Fragment>)
  }
}

CursosGrid.propTypes = {
  cursos: PropTypes.array,
  isLogin: PropTypes.string,
  onSelect: PropTypes.func,
};

const mapStateToProps  = state =>({
  cursosStore: state.cursosReducer,
});

export default connect(mapStateToProps)(CursosGrid);