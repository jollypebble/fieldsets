import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import test from './test';
import treeDiagram from './treeDiagram';

const econcircleApp = combineReducers({
  test,
  form: formReducer,
  treeDiagram
});

export default econcircleApp;
