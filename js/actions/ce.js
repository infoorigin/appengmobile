export const SAVE_CE_CONFIG = 'SAVE_CE_CONFIG';
export const SAVE_CE_NODE_CONFIG = 'SAVE_CE_NODE_CONFIG';
export const SET_CE_CONFIG = 'SET_CE_CONFIG';
export const OPEN_NODE_EDIT_FORM='OPEN_NODE_EDIT_FORM';
export const PUT_NODE_EDIT_FORM='PUT_NODE_EDIT_FORM';
export const PUT_NODE_EDIT_FORM_KEY='PUT_NODE_EDIT_FORM_KEY';
export const PUT_NODE_DATA='PUT_NODE_DATA';
export const PUT_NODE_KEY='PUT_NODE_KEY';
export const UPDATE_BASE_FORM_DATA='UPDATE_BASE_FORM_DATA';
export const FORM_ACTION_RESPONSE='FORM_ACTION_RESPONSE';


export function putFormActionResponse(response){
  return{
     type:FORM_ACTION_RESPONSE,
     data:response
  }
}

export function saveCEConfig(config) {
  return{
    type: SAVE_CE_CONFIG,
    config: config,
  };
}

export function saveCENodeConfig(config) {
  return{
    type: SAVE_CE_NODE_CONFIG,
    config: config,
  };
}

export function putCENodeEditFormKeyData(keyData){
  return{
    type:PUT_NODE_EDIT_FORM_KEY,
    key:keyData,
  };
}

export function putNavigationRoute(navigationRoute){
  return{
    type:PUT_NODE_EDIT_FORM_KEY,
    key:keyData,
  };
}


export function putCENodeEditForm(editForm){
  return {
    type:PUT_NODE_EDIT_FORM,
    config:editForm,
  } 
}

export function putCENodeData(nodeData){
  return {
    type:PUT_NODE_DATA,
    data:nodeData,
  }
}

export function putCENodKey(nodeKey){
  return {
    type:PUT_NODE_KEY,
    keys:nodeKey,
  }
}



export function updateBaseForm(baseformData){
    return {
      type:UPDATE_BASE_FORM_DATA,
      data:baseformData,
    }
}




