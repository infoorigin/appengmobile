
import * as gridaction from '../actions/grid';
import * as ceaction from '../actions/ce';

const initialState = {
  menu: {},
  grid: {},
  form: {},
  ce: {},
  cenode: {}
};


export default function (state = initialState, action) {

  switch (action.type) {
    case gridaction.SAVE_GRID_CONFIG:
       return {
      ...state,
        grid: {config:action.config, data :{}},
      };

    case gridaction.SAVE_GRID_CONFIG_DATA:
      return {
      ...state,
       grid: {config:action.config, data:action.data},
      };
  
    case gridaction.SAVE_GRID_DATA:
      return {
      ...state,
       grid: {config:Object.assign({}, state.grid.config), data:action.data},
      };
    
    case ceaction.SAVE_CE_CONFIG:
      return {
      ...state,
       ce: {config:action.config},
      };
    
    case ceaction.SAVE_CE_NODE_CONFIG:
     return {
      ...state,
       cenode: {config:action.config},
      };
    
    default:
      return state;
  }
}
