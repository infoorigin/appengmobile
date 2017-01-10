
export const SAVE_GRID_CONFIG = 'SAVE_GRID_CONFIG';
export const RENDER_GRID_DETAIL = 'RENDER_GRID_DETAIL';
export const SAVE_GRID_DATA = 'SAVE_GRID_DATA';
export const SAVE_GRID_CONFIG_DATA = 'SAVE_GRID_CONFIG_DATA';
export const RENDER_BASE_GRID = 'RENDER_BASE_GRID';

export function saveGridConfig(config) {
  return{
    type: SAVE_GRID_CONFIG,
    config: config,
  };
}

export function gridAction(actionType,keys) {
  return{
    type: actionType,
    keys: keys,
  };
}

export function saveGridConfigData(data, config) {
  return{
    type: SAVE_GRID_CONFIG_DATA,
    data : data,
    config: config,
  };
}

export function saveGridData(data) {
  console.log('');
  return{
    type: SAVE_GRID_DATA,
    data: data,
  };
}



