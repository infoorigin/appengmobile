
import {RENDER_LAYOUT_FOR_CE} from './layout';

export const ACTIVE_NODE_GRID = 'ACTIVE_NODE_GRID';
export const SAVE_GRID_DATA = 'SAVE_GRID_DATA';
export const SAVE_GRID_CONFIG = 'SAVE_GRID_CONFIG';
export const PUT_ACTIVE_NODE_GRID_CONFIG = 'PUT_ACTIVE_NODE_GRID_CONFIG';
export const RENDER_GRID_DETAIL = 'RENDER_GRID_DETAIL';
export const PUT_ACTIVE_NODE_GRID_DATA = 'PUT_ACTIVE_NODE_GRID_DATA';
export const SAVE_GRID_CONFIG_DATA = 'SAVE_GRID_CONFIG_DATA';
export const RENDER_BASE_GRID = 'RENDER_BASE_GRID';
export const SET_GRID_HOME = 'SET_GRID_HOME';
export const NEW_CE_RENDER_BASE_GRID = 'NEW_CE_RENDER_BASE_GRID';
export const INVALID_GRID_ACTION = 'INVALID_GRID_ACTION';

export function setGridHome(ce, ceNode, grid){
  return{
    type: SET_GRID_HOME,
    ce,
    ceNode,
    grid,
  };
}

export function saveGridConfig(config) {
  return{
    type: SAVE_GRID_CONFIG,
    config: config,
  };
}

export function activeNodeGrid(configId, keys) {
  return{
    type: ACTIVE_NODE_GRID,
    configId: configId,
    keys :keys,
  };
}

export function putActiveNodeGridConfig(config) {
  return{
    type: PUT_ACTIVE_NODE_GRID_CONFIG,
    config: config,
  };
}

export function gridAction(action, keys) {
  return{
    ...action,
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
  return{
    type: SAVE_GRID_DATA,
    data: data,
  };
}

export function putActiveNodeGridData(data) {
  return{
    type: PUT_ACTIVE_NODE_GRID_DATA,
    data: data,
  };
}

export function gridDetailAction(keys, cardConfigId, gridConfigId, nodeId){
   return{
    type: RENDER_GRID_DETAIL,
    keys: keys,
    cardConfigId:cardConfigId,
    gridConfigId:gridConfigId,
    nodeId:nodeId

  };
}

export function configToStandardGridAction(configAction){
  switch(configAction){
    case NEW_CE_RENDER_BASE_GRID : return NEW_CE_RENDER_BASE_GRID;
    case RENDER_LAYOUT_FOR_CE : return RENDER_LAYOUT_FOR_CE;
    default : return INVALID_GRID_ACTION;
  }

}





