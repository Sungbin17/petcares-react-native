import {combineReducers} from 'redux';
import auth from './auth';
import signUp from './signUp';
import loading from './loading';
import teacher from './teacher';


const petcaresApp = combineReducers({
  auth,
  signUp,
  loading,
  teacher
});

export default petcaresApp;
