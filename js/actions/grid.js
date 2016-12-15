
export const GRID_CONFIG_SAVE = 'GRID_CONFIG_SAVE';
export const GRID_DATA_SAVE = 'GRID_DATA_SAVE';
export const GRID_CONFIG_DATA_SAVE = 'GRID_CONFIG_DATA_SAVE';
export const RENDER_BASE_GRID = 'RENDER_BASE_GRID';

export function saveGridConfig(config) {
  return{
    type: GRID_CONFIG_SAVE,
    config: config,
  };
}

export function saveGridDataConfig(data, config) {
  return{
    type: GRID_DATA_SAVE,
    data : data,
    config: config,
  };
}

export function saveGridData(data) {
  return{
    type: BASE_GRID_DATA_SAVE,
    data: data,
  };
}



