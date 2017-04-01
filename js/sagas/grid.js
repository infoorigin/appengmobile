
import { fork, call, put, select } from "redux-saga/effects";
import {navigateTo} from '../actions/sideBarNav';
import update from 'immutability-helper';
import {  NavigationActions } from 'react-navigation';
import { setGridHome, saveGridData, putActiveNodeGridConfig, putActiveNodeGridData } from '../actions/grid';
import {
  setNodeData, setNodeKeys, openEditForm, fetchCompositeEntity, getCompositeEntity, getCompositeEntityNode,
  getActiveCompositeEntityNode, setActiveNode, findNodeFromCETree, getNodeById, queryNodeData
} from './ce';
import { putCENodKey, putCEAndCENodeConfig } from '../actions/ce';
import { renderLayoutAction } from '../actions/layout';
import { putCardsData } from '../actions/layout';
import { openLayout, findCardByIdFromState, updateCardState } from './layout';
import { getConfig, getGridData } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';
import { showSpinner, hideSpinner, hideSpinnerAndEnableRender, showSpinnerAndDisableRender } from '../actions/aebase';

export function* renderNewCEBaseGrid(action){
    console.log(" Grid Action from Sagas :", action);
    const ce = yield call(fetchCompositeEntity, action.targetConfig);
    console.log("Received CENode :",ce.rootNode.configObjectId) ;
    const cenode = ce.rootNode;
    yield put(putCEAndCENodeConfig(ce, cenode)) ;
    console.log(" Publishing Render Layout ") ;
    yield put(renderLayoutAction(action.keys));
    console.log(" Action posted for renderNewCEBaseGrid ") ;
} 

export function* activeNodeGrid(action) {
  try {
    yield call(setActiveNode, action);
    let ceNode = yield select(getActiveCompositeEntityNode);

    // Fetch and Set Grid Config to state
    yield call(fetchNodeActiveGridConfig, ceNode.gridId);
    console.log("inside activeNodeGrid cenode :", ceNode);
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
    console.log("Start Render Base Grid ", action);
    //TODO Start Spinner
    //yield put(showSpinnerAndDisableRender());
    //Fetch and Set CE and Base Node Configs to state
    
    const ce = yield call(fetchCompositeEntity, action.configId);
    const ceNode = ce.rootNode;
    // Fetch and Set Grid Config to state , 
    const grid = yield call(fetchGridConfig, ceNode.gridId);
    yield fork(fetchGridData, ceNode.configObjectId);
    console.log("Set Grid Home and route as fork task");
    yield [put(setGridHome(ce, ceNode, grid)),  put(NavigationActions.navigate({ routeName: 'DataGrid' }))];
   
  /*  
    // Navigate to target screen
    yield put(navigateTo(action.navigationRoute, true));
     console.log("Now hiding spinner ");
    yield put(hideSpinnerAndEnableRender());
    // Fetch and Set Grid Data to state
    call(fetchGridData, ceNode.configObjectId);
    */
 //   yield put(NavigationActions.navigate({ routeName: 'DataGrid' }));
  }
  catch (error) {
    console.log("Error in API Call for action", JSON.stringify(action), error);
    console.log("Re-Routing to home");
    yield put(NavigationActions.navigate({ routeName: 'DataGrid' }));
  }
}

function* setGridHomeAndNavigate(ce, ceNode, grid){
  yield [put(setGridHome(ce, ceNode, grid)),  put(NavigationActions.navigate({ routeName: 'DataGrid' }))];
    
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
  return configItem;
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

export function* queryGridData(nodeId) {
  // call the api to get the grid config Item
  let result = yield call(getGridData, nodeId);
  return data = result.data.returnData.data;
}

export function* fetchGridData(nodeId) {
  // call the api to get the grid config Item
  let result = yield call(getGridData, nodeId);
  let data = result.data.returnData.data;
  console.log("Saving grid data ");
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

