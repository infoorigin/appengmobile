
import * as gridaction from '../actions/grid';
import * as ceaction from '../actions/ce';
import * as layoutaction from '../actions/layout';

const initialState = {
  sequence:0,
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
  layout :{},
};


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
    case ceaction.PUT_NODE_EDIT_FORM_DATA:
    return{
      ...state,
       form: {key:state.form.key,config:Object.assign({}, state.form.config),data:action.data,
             messageData:{sequence:state.form.messageData.sequence}}
    };

    case layoutaction.SAVE_LAYOUT_CONFIG:
    return{
      ...state,
      layout: {config:action.config},
    };

    default:
      return state;
  }
}
