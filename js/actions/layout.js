
export const SAVE_LAYOUT_CONFIG = 'SAVE_LAYOUT_CONFIG';



export function saveLayoutConfig(config) {
  return{
    type: SAVE_LAYOUT_CONFIG,
    config: config,
  };
}