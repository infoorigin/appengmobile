
import { cardStackReducer } from 'react-native-navigation-redux-helpers';
import {PUSH_ROUTE,POP_ROUTE,REPLACE_AT, RESET_ROUTE } from '../actions/sideBarNav';
import update from 'immutability-helper';

const initialState = {
  routes: [
    {
      key: 'home',
      index: 0,
    },
  ],
};

export default function (state = initialState, action) {
   switch (action.type) {
      
      case PUSH_ROUTE :
         return {...state, routes : update(state.routes ,{$push : [action.payload.route]})} ;
      
      case POP_ROUTE : 
        if(state.routes)
          return {...state, routes : state.routes.pop() };
        else 
          return initialState;  
      
      case REPLACE_AT :
         return {...state, routes : update(state.routes, {$splice:[[action.payload.index, 1, action.payload.route]]})} ;
        
      case RESET_ROUTE :
        return {
          ...state,
          routes: [
            {
              key: 'home',
              index: 0,
            },
          ],
        }

    default:
      return state;
  }
}
