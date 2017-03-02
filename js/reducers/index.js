
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import ae from './aebase';

import {navreducer, authreducer} from './navigation';

export default combineReducers({
  drawer,
  cardNavigation,
  ae,
  nav:navreducer,
  auth:authreducer,
});
