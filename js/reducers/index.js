
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import ae from './aebase';

export default combineReducers({
  drawer,
  cardNavigation,
  ae,
});
