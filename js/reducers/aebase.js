
import * as base from '../actions/aebase';
import * as gridaction from '../actions/grid';
import * as ceaction from '../actions/ce';
import * as layoutaction from '../actions/layout';
import * as modal from '../actions/modal'
import * as user from '../actions/user';
import update from 'immutability-helper';

// TO DO populate default user details by login saga
const initialState = {
  global: {
    isSpinner:false,
    isRender:false,
    message:[],
  },
  dashboard : {
    cards:[], // {config,data, isDataReady}
  },
  error :{},
  userSession : {
    isAuthenticated:false,
    user : {
      attributes: { }
    },
    message : [],
  },
  menu: [],
  grid: {config:{}, data:[]},
  ce: {},
  cenode: {},
  nodeData :{},
  layout :{},
  modal : {visible:false, ui:{}, data:{}},
  activenode :{ config :{}, ui: {}},
  cards :[]
};
/*
cards[
  card{
    activeTab{} // only for tab based layout
    ui{
      config{} // default to intial viewitem in card or tab
      data{} // 
    }
    node{} // if card or tab is bound to node
  }
]

*/

//activenode
//  -- config
//  -- ce (only if CE is diff than base CE)
//  --   config
// -- keys
//  -- ui
//        -- config
//        -- data
//        
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
    
    case layoutaction.PUT_CARDS_DATA:
    return {
      ...state,
      cards: action.cards,
    };
    
    case gridaction.SET_GRID_HOME : {
      return {
      ...state,
        grid: {config:action.grid, data :[]},
        ce: {config:action.ce},
        cenode: {config:action.ceNode},
        layout :{},
        cards :[],
      };
    }

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
       cenode: {config:action.config, keys:{}},
      };

      case ceaction.PUT_BASE_NODE_KEYS :
    return{
      ...state,
      cenode: update(state.cenode, {$merge: {keys:action.keys}})
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

    case layoutaction.SET_TAB_LAYOUT_HOME:
    return {
      ...state,
      layout : {config:action.config},
      cenode:  update(state.cenode, {$merge: {keys:action.keys}})
    };

    case layoutaction.SAVE_LAYOUT_CONFIG:
    return{
      ...state,
      layout: {config:action.config},
    };
    
    case modal.PUT_MODAL_UI_DATA:
    return{
      ...state,
      modal: update(state.modal, { $set : {visible:true, ui: action.ui, data : action.data  }})
    };

    case modal.PUT_MODAL_DATA:
    return{
      ...state,
      modal: update(state.modal, { $merge : {data : action.data }})
    };

    case modal.RESET_MODAL :
    return{
      ...state,
      modal: update(state.modal, { $set : {visible:false, ui: {}, data : {}  }})
    };

    case user.PUT_USER :
    return{
      ...state,
      userSession : update(state.userSession , { $merge : { isAuthenticated:true, user: action.user }}) 
    };

    case base.SHOW_SPINNER :
    return{
      ...state,
      global : update(state.global , { $merge : { isSpinner:true }}) 
    };

    case base.SHOW_SPINNER_DISABLE_RENDER :
    return{
      ...state,
      global : update(state.global , { $merge : { isSpinner:true, isRender:false }}) 
    };

    case base.DISABLE_RENDER :
    return{
      ...state,
      global : update(state.global , { $merge : {  isRender:false }}) 
    };

    case base.ENABLE_RENDER :
    return{
      ...state,
      global : update(state.global , { $merge : { isRender:true }}) 
    };

    case base.HIDE_SPINNER :
    return{
      ...state,
      global : update(state.global , { $merge : { isSpinner:false }}) 
    };

    case base.HIDE_SPINNER_ENABLE_RENDER :
    return{
      ...state,
      global : update(state.global , { $merge : { isSpinner:false,isRender:true }}) 
    };

    case user.PUT_MENU :
    return{
      ...state,
      menu : action.menu 
    };

    case user.PUT_DASHBOARD_CARDS :
    return{
      ...state,
      dashboard : update(state.dashboard , { $merge : { cards:action.cards }}) 
    };

    case user.SET_USER_HOME :
    return update (state, {$merge : 
                {
                  global :{isSpinner:false, isRender:true},
                  userSession : { isAuthenticated:true, user: action.user},
                  menu : action.menu,
                  dashboard : {cards : action.cards}
                }
          });
   
    default:
      return state;
  }
}
