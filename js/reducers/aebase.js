
import * as gridaction from '../actions/grid';

const initialState = {
  menu: {},
  grid: {},
  form: {},
  ce: {},
  cenode: {}
};


export default function (state = initialState, action) {

  switch (action.type) {
    case gridaction.GRID_CONFIG_SAVE:
       return {
      ...state,
        grid: {config:action.config, data :{}},
      };

    case gridaction.GRID_CONFIG_DATA_SAVE:
      return {
      ...state,
       grid: {config:action.config, data:action.data},
      };
  
    case gridaction.GRID_DATA_SAVE:
      let config = Object.assign({}, state.grid.config);
      return {
      ...state,
       grid: {config:config, data:action.data},
      };
    default:
      return state;
  }
}
