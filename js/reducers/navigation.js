import AppNavigator from '../AppNavigator';
import {
  NavigationActions
} from 'react-navigation';

const initialNavState = {
  index: 1,
  routes: [
    { key: 'Initc', routeName: 'Inbox' },
    { key: 'InitB', routeName: 'Drafts' },
    { key: 'InitA', routeName: 'Login' },
  ],
};

const initialAuthState = { isLoggedIn: false };


export const navreducer = (state , action) => {
    /*
    if (action.type === 'Login') {
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    }
    if (action.type === 'Logout') {
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state);
    }
     */
    const newState =  AppNavigator.router.getStateForAction(action, state); 
    return (newState ? newState : state);
  
  }

  export const authreducer = (state = initialAuthState, action) => {
    if (action.type === 'Login') {
      return { ...state, isLoggedIn: true };
    }
    if (action.type === 'Logout') {
      return { ...state, isLoggedIn: false };
    }
    return state;
  }