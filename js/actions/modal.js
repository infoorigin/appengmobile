export const PUT_MODAL_UI = 'PUT_MODAL_UI';
export const PUT_MODAL_UI_DATA = 'PUT_MODAL_UI_DATA';
export const PUT_MODAL_DATA = 'PUT_MODAL_DATA';
export const MODAL_ADD_UI = 'MODAL_ADD_UI';
export const RESET_MODAL = 'RESET_MODAL';
export const SAVE_MODAL_DATA = 'SAVE_MODAL_DATA';

export function putModalUIAndData(ui, data) {
  return{
    type: PUT_MODAL_UI_DATA,
    ui: ui,
    data:data ? data :{},
  };
}

export function putModalData(data) {
  return{
    type: PUT_MODAL_DATA,
    data: data,
  };
}

export function saveGridModalAction(gridConfigId, nodeId){
  return{
    type: SAVE_MODAL_DATA,
    gridConfigId: gridConfigId,
    nodeId:nodeId,
  };
}

export function saveModalAction(cardConfigId, nodeId){
  return{
    type: SAVE_MODAL_DATA,
    cardConfigId: cardConfigId,
    nodeId:nodeId,
  };
}

export function modalAddUIAction(nodeId, baseKeys){
    return{
    type: MODAL_ADD_UI,
    nodeId: nodeId,
    baseKeys:baseKeys,
  };
}

export function resetModalAction(){
    return{
    type: RESET_MODAL,
  };
}



