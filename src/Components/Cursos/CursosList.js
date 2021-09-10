import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';

import CursoCard from './CursoCard'
import { connect } from 'react-redux'


const CursosList = ({...props}) => {
  
  const {cursos} = props.cursosStore;
  
  return (
    <Box style={{overflowY:'auto'}}>
      <List  style={{textAlign:'center',width:'100%'}}>
        {
          (cursos)?(
            cursos.map((curso,index)=>{
              return (
                <ListItem key={curso._id}>
                  <CursoCard curso={curso} {...props}></CursoCard>
                </ListItem>
              )
            })
          ):(<></>)
        }
      </List>
    </Box>
  )
}


CursosList.propTypes = {
  onSelect: PropTypes.func,
  isLogin: PropTypes.bool,
};


const mapStateToProps  = state =>({
  cursosStore: state.cursosReducer,
});

export default connect(mapStateToProps)(CursosList);