import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import logger from 'redux-logger'
import { cursoReducer } from './curso/cursoReducers'
import { cursosReducer } from './cursos/cursosReducers'

//const loggerMiddleware = createLogger({})

const reducers = { 
  cursoReducer,
  cursosReducer,
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(
                                                  rootReducer,
                                                  applyMiddleware(
                                                    thunkMiddleware,
                                                    logger
                                                  )
                                                );