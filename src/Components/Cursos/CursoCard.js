import React from 'react';
import {useAuth} from '../../helpers/auth.context'
import { connect } from 'react-redux'
import {deleteCursosRequest,selectCursoRequest} from '../../Store/cursos/cursosActions'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { grey,blue } from '@material-ui/core/colors';


const useStyles = makeStyles({
  root: {
    width: '100%',
    height:'100%',
    justifyContent:'space-between',
    display:'flex',
    flexDirection:'column',
    border:'1px solid #CCC'
  },
  header:{
    backgroundColor:grey[100],
    fontSize: '1.0rem',
    height:'70px',
    overflow:'hidden',
  },
  title:{
    fontSize: '1.1rem',
    color:blue[800],
    height:'50px',
    overflow:'hidden',
    alignContent:'flex-start',
  },
  subTitle:{
    color:grey[500],
    alignContent:'flex-start',
  },
  description:{
    alignContent:'flex-start',
    alignItems:'flex-start',
    minHeight:'80px',
    textAlign:'justify'
  },
});



const CursoCard = ({curso,...props}) => {
  const {isLogin} = useAuth();
  const classes = useStyles();

  function handlerClickSelect(event){
    props.dispatch(selectCursoRequest(curso._id));
  }

  function handlerClickDelete(event){
    props.dispatch(deleteCursosRequest(curso._id));
  }

  
  return (
    <Card className={classes.root} style={{}}>
      <CardActionArea onClick={handlerClickSelect}>
        <CardHeader
          className={classes.header}
          classes={{
            title: classes.title,
            subheader:classes.subTitle
          }}
          action={
            <MoreVertIcon />
          }
          title={curso.tema}
          subheader={curso.anioDictado + ' (' + curso.duracion + ' horas)'}
        />
        </CardActionArea>
        <CardContent className={classes.description}>
          <Typography variant="body2" color="textSecondary" component="p">
              {curso.descripcion}
            </Typography>
        </CardContent>
      {(isLogin)?(
        <CardActions >
          <Box  display="flex" justifyContent="flex-end" style={{width:'100%'}} >
            <Button size="small" color="secondary" onClick={handlerClickDelete}>
              Eliminar
            </Button>
          </Box>
        </CardActions>
      ):(<></>)}
    </Card>
  );
}


const mapStateToProps  = state =>({
  cursoStore: state.cursoReducer,
});

export default connect(mapStateToProps)(CursoCard);