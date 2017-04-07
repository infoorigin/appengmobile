
export const SAVE_LAYOUT_CONFIG = 'SAVE_LAYOUT_CONFIG';
export const PUT_CARDS_DATA = 'PUT_CARDS_DATA';
export const RENDER_ACTIVE_TAB = 'RENDER_ACTIVE_TAB';
export const RENDER_LAYOUT = 'RENDER_LAYOUT';
export const RENDER_LAYOUT_FOR_CE = 'RENDER_LAYOUT_FOR_CE';
export const UPDATE_CARD_UI_DATA = 'UPDATE_CARD_UI_DATA';
export const SET_TAB_LAYOUT_HOME = 'TAB_LAYOUT_HOME' ;
export const RESET_TAB_LAYOUT_HOME = 'RESET_TAB_LAYOUT_HOME';
export const SUBMIT_LAYOUT_ACTION = 'SUBMIT_LAYOUT_ACTION';


export function resetLayoutHomeAction(){
  return{
    type: RESET_TAB_LAYOUT_HOME,
  };
}


export function setTabLayoutHome(payload) {
  return{
    type: SET_TAB_LAYOUT_HOME,
    payload,
  };
}

export function saveLayoutConfig(config) {
  return{
    type: SAVE_LAYOUT_CONFIG,
    config: config,
  };
}

export function putCardsData(cards) {
  return{
    type: PUT_CARDS_DATA,
    cards: cards,
  };
}

export function renderLayoutAction(keys){
  return{
    type: RENDER_LAYOUT,
    keys :keys,
  };
}


export function renderTabAction(cardConfigId, tabConfigId, keys){
  return{
    type: RENDER_ACTIVE_TAB,
    cardConfigId:cardConfigId,
    tabConfigId: tabConfigId,
    keys :keys,
  };
}

export function updateCardUIDataAction(cardConfigId, data){
  return{
    type: UPDATE_CARD_UI_DATA,
    cardConfigId: cardConfigId,
    data :data,
  };
}

export function submitLayoutAction(cardConfigId, nodeId, bindingId, apiAction){
  return {
    type : SUBMIT_LAYOUT_ACTION,
    cardConfigId,
    nodeId,
    bindingId,
    apiAction,
  }
}

