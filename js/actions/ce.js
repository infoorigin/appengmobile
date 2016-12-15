export const SAVE_CE_CONFIG = 'SAVE_CE_CONFIG';
export const SAVE_CE_NODE_CONFIG = 'SAVE_CE_NODE_CONFIG';
export const SET_CE_CONFIG = 'SET_CE_CONFIG';


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



