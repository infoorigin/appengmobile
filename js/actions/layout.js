
export const SAVE_LAYOUT_CONFIG = 'SAVE_LAYOUT_CONFIG';
export const PUT_CARDS_DATA = 'PUT_CARDS_DATA';
export const RENDER_ACTIVE_TAB = 'RENDER_ACTIVE_TAB';
export const RENDER_LAYOUT = 'RENDER_LAYOUT';

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


export function renderTabAction(tabConfigId, keys){
  return{
    type: RENDER_ACTIVE_TAB,
    tabConfigId: tabConfigId,
    keys :keys,
  };
}
