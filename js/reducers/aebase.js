
import * as gridaction from '../actions/grid';
import * as ceaction from '../actions/ce';
import * as layoutaction from '../actions/layout';
import update from 'immutability-helper';

// TO DO populate default user details by login saga
const initialState = {
  error :{},
  sequence:0,
  user : {
    attributes: { 
        APP_LOGGED_IN_PROJECT_ID: 0,
        APP_LOGGED_IN_ROLE_ID : 16, 
        APP_LOGGED_IN_USER_ID : 1111
       }
  },
  menu: {},
  grid: {},
  form: {config:{},
         keyData:{},
         data:{},
         messageData:{sequence:0,globalMessage:"",
         messageType:"",
         dataValidationMessages:{}}
        },
  ce: {},
  cenode: {},
  nodeData :{},
  layout :{},
  activenode :{}
};

//activenode
//  -- config
//  -- ce (only if CE is diff than base CE)
//  --   config
//  -- grid
//        -- config
//        -- data
//        -- keys
//

//activeGrid
//    -- config
//    -- data
//    -- keys


export default function (state = initialState, action) {

  switch (action.type) {

    case ceaction.FORM_ACTION_RESPONSE:
         console.log("=====================FORM_ACTION_RESPONSE========================");
         let globalMessage =  action.data.status? action.data.message:"Correct errors.";
         let messageType = action.data.status ?"success":"error";
         let dataValidationMessages= action.data.status?{}:action.data.message;
         let messageSequence = state.form.messageData.sequence+1;
    return{
        ...state,
        form: {
                key:state.form.key,
                config:Object.assign({}, state.form.config),
                data:Object.assign({}, state.form.data),
                messageData:{
                sequence:messageSequence,
                globalMessage:globalMessage,
                messageType:messageType,
                dataValidationMessages:dataValidationMessages}
              }
    };

    case ceaction.OPEN_NODE_EDIT_FORM:
    return{
      ...state,
      
    };
    case gridaction.SAVE_GRID_CONFIG:
       return {
      ...state,
      grid: {config:action.config, data :[]},
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
    case ceaction.PUT_NODE_EDIT_FORM_KEY:
    return{
      ...state,
      form: {key:action.key,data:{},config:{},messageData:{sequence:state.form.messageData.sequence}}
    };
    case ceaction.PUT_NODE_EDIT_FORM:
    return{
      ...state,
      form: {key:state.form.key,data:{},messageData:{sequence:state.form.messageData.sequence},
             config:action.config}
    }; 

    case ceaction.PUT_NODE_DATA:
    return{
      ...state,
       nodeData : action.data
    };

    case ceaction.PUT_NODE_KEY:
    return{
      ...state,
       cenode:  update(state.cenode, {$merge: {keys:action.keys}})
    };


    case layoutaction.SAVE_LAYOUT_CONFIG:
    return{
      ...state,
      layout: {config:action.config},
    };

    case ceaction.PUT_ACTIVE_NODE_CONFIG:
    return{
      ...state,
      activenode: {config:action.config},
    };

    case gridaction.PUT_ACTIVE_NODE_GRID_CONFIG:
    return{
      ...state,
      activenode: update(state.activenode, { grid : {$set: {config:action.config}}})
    };

    case gridaction.PUT_ACTIVE_NODE_GRID_DATA:
    return{
      ...state,
      activenode: update(state.activenode, { grid : {$merge: {data:action.data}}})
    };

    default:
      return state;
  }
}
