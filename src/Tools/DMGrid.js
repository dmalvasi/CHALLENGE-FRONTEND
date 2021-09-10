import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function CSSGrid(props) {
  const classes = useStyles();
  const { width } = props;
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Material-UI Grid: {width}
      </Typography>
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <Grid item xsUp={3} sm={8}>
            <Paper className={classes.paper}>xs=3</Paper>
            <Paper className={classes.paper}>xs=3</Paper>
            <Paper className={classes.paper}>xs=3</Paper>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Paper item xs={3} sm={8} className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  )
}