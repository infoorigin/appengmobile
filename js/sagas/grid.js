
import { call, put, select } from "redux-saga/effects";
import navigateTo from '../actions/sideBarNav';
import { saveGridConfig, saveGridData, putActiveNodeGridConfig } from '../actions/grid';
import {  setNodeData, setNodeKeys, openEditForm, setCompositeEntity, getCompositeEntity, getCompositeEntityNode,
          getActiveCompositeEntityNode, setActiveNode, findNodeFromCETree } from './ce';
import { putCENodKey} from '../actions/ce';
import { openLayout } from './layout';
import { getConfig, getGridData } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';

export function* activeNodeGrid(action) {
   yield call (setActiveNode, action);
   let ceNode = yield select(getActiveCompositeEntityNode);
   // Fetch and Set Grid Config to state
   yield call(fetchNodeActiveGridConfig, ceNode.gridId);
  // Fetch and set Active Grid node data 
  yield call(fetchNodeActiveGridData, ceNode.configObjectId, action.keys);
}

// fetch the Config Item
export function* renderBaseGrid(action) {
  try {
    //TODO Start Spinner
    
    //Fetch and Set CE and Base Node Configs to state
    yield call(setCompositeEntity, action);
  
    let ceNode = yield select(getCompositeEntityNode);
    // Fetch and Set Grid Config to state
    yield call(fetchGridConfig, ceNode.gridId);
    // Fetch and Set Grid Data to state
    yield call(fetchGridData, ceNode.configObjectId);
    // Navigate to target screen
    yield put(navigateTo(action.navigationRoute, HOMEROUTE));

    console.log("--------------------------------GRID CALLS 4");

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

function* fetchNodeActiveGridData(nodeId, keys) {
  // call the api to get the grid config Item
  let result = yield call(getGridData, nodeId, keys);
  let data = result.data.returnData.data;
  //console.log("grid data ", data.length)
  yield put(saveGridData(data));
}

function* fetchGridData(nodeId) {
  // call the api to get the grid config Item
  let result = yield call(getGridData, nodeId);
  let data = result.data.returnData.data;
  //console.log("grid data ", data.length)
  yield put(saveGridData(data));
}


export function* renderGridDetail(action){
    let ceNode = yield select(getCompositeEntityNode);
    yield call(setNodeData, ceNode,action.keys);
    yield call(setNodeKeys, ceNode,action.keys);
    
    let ce = yield select(getCompositeEntity);
     if(ce.uiLayoutIds.mobile) { // If Mobile layout is set render layout
        yield call(openLayout, action) ;
    }
    else {
        yield call(openEditForm, action) ;
    }

}

