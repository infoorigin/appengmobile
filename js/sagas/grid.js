
import { call, put, select } from "redux-saga/effects";
import navigateTo from '../actions/sideBarNav';
import update from 'immutability-helper';
import { saveGridConfig, saveGridData, putActiveNodeGridConfig, putActiveNodeGridData } from '../actions/grid';
import {
  setNodeData, setNodeKeys, openEditForm, setCompositeEntity, getCompositeEntity, getCompositeEntityNode,
  getActiveCompositeEntityNode, setActiveNode, findNodeFromCETree, getNodeById, queryNodeData
} from './ce';
import { putCENodKey } from '../actions/ce';
import { putCardsData } from '../actions/layout';
import { openLayout, findCardByIdFromState, updateCardState } from './layout';
import { getConfig, getGridData } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';
import { showSpinner, hideSpinner } from '../actions/aebase';

export function* activeNodeGrid(action) {
  try {
    yield call(setActiveNode, action);
    let ceNode = yield select(getActiveCompositeEntityNode);

    // Fetch and Set Grid Config to state
    yield call(fetchNodeActiveGridConfig, ceNode.gridId);
    console.log("inside activeNodeGrid cenode :", ceNode)
    // Fetch and set Active Grid node data 
    yield call(fetchNodeActiveGridData, ceNode.configObjectId, action.keys);
  }
  catch (error) {
    console.log("Error in activeNodeGrid", JSON.stringify(action), error);
  }
}

// fetch the Config Item
export function* renderBaseGrid(action) {
  try {
    //TODO Start Spinner
    yield put(showSpinner());
    //Fetch and Set CE and Base Node Configs to state
    yield call(setCompositeEntity, action);

    let ceNode = yield select(getCompositeEntityNode);
    // Fetch and Set Grid Config to state
    yield call(fetchGridConfig, ceNode.gridId);
    // Fetch and Set Grid Data to state
    yield call(fetchGridData, ceNode.configObjectId);
    // Navigate to target screen
    yield put(navigateTo(action.navigationRoute, HOMEROUTE));
    yield put(hideSpinner());
  }
  catch (error) {
    console.log("Error in API Call for action", JSON.stringify(action), error);
    console.log("Re-Routing to home");
    put(navigateTo(HOMEROUTE, HOMEROUTE));
  }
}

function* fetchNodeActiveGridConfig(gridConfigId) {
  // call the api to get the grid config Item
  let result = yield call(getConfig, gridConfigId);
  let config = result.data.returnData.data;
  yield put(putActiveNodeGridConfig(config));
}

function* fetchGridConfig(gridConfigId) {
  // call the api to get the grid config Item
  let result = yield call(getConfig, gridConfigId);
  let configItem = result.data.returnData.data;
  yield put(saveGridConfig(configItem));
}

export function* queryNodeGridData(nodeId, keys) {
  // call the api to get the grid config Item
  let result = yield call(getGridData, nodeId, keys);
  let data = result.data.returnData.data;
  return data;
}

export function* fetchNodeActiveGridData(nodeId, keys) {
  // call the api to get the grid config Item
  let result = yield call(getGridData, nodeId, keys);
  let data = result.data.returnData.data;
  //console.log("grid data ", data.length)
  yield put(putActiveNodeGridData(data));
}

export function* fetchGridData(nodeId) {
  // call the api to get the grid config Item
  let result = yield call(getGridData, nodeId);
  let data = result.data.returnData.data;
  //console.log("grid data ", data.length)
  yield put(saveGridData(data));
}

export function* renderGridDetail(action) {
  try {
  if(action.nodeId){
    // If NodeId is present render child data grid . No navigation routing is required. Replace existing card or grid
    yield call (renderNodeGridDetail, action);
  }
  else{
    console.log("Direct Grid Rendering without nodeId Not supported yet");
  }
  }
  catch (error) {
    console.log("Error in renderGridDetail for action", JSON.stringify(action), error);
  }
}



export function* renderBaseGridDetail(action) {
  try {
  let ceNode = yield select(getCompositeEntityNode);
  yield call(setNodeData, ceNode, action.keys);
  yield call(setNodeKeys, ceNode, action.keys);

  let ce = yield select(getCompositeEntity);
  if (ce.uiLayoutIds.mobile) { // If Mobile layout is set render layout
    yield call(openLayout, action);
  }
  else {
    yield call(openEditForm, action);
  }
  }
  catch (error) {
    console.log("Error in renderBaseGridDetail for action", JSON.stringify(action), error);
  }

}

export function* renderNodeGridDetail(action) {
  let activeNode = yield call(getNodeById,action.nodeId);
  let nodeData = yield call(queryNodeData, activeNode, action.keys);
  let result = yield call(getConfig, activeNode.editFormId);
  let formconfig = result.data.returnData.data;
  let cardState = yield call(findCardByIdFromState, action.cardConfigId );
  if (cardState != null && cardState.config) {
    let newCardState = update(cardState, {$merge: {node : activeNode, ui: { data: nodeData, config: [formconfig] }}})
    
    yield call(updateCardState, newCardState);
  }
}

