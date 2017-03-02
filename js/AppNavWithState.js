import React from 'react';
import AppNavigator from './AppNavigator';
import {
  addNavigationHelpers
} from 'react-navigation';
import {
   connect,
} from 'react-redux';

const AppWithNavigationState = connect(state => ({
  nav: state.nav,
}))(({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

export default AppWithNavigationState;