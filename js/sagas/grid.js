
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
import { openLayout, getCards } from './layout';
import { getConfig, getGridData } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';

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

function* fetchGridData(nodeId) {
  // call the api to get the grid config Item
  let result = yield call(getGridData, nodeId);
  let data = result.data.returnData.data;
  //console.log("grid data ", data.length)
  yield put(saveGridData(data));
}



export function* renderTabGridDetail(action) {
  let ceNode = getNodeById(action.nodeId);
  let formresult = yield call(getConfig, ceNode.editFormId);
  let form = formresult.data.returnData.data;
  let nodeData = yield call(queryNodeData, ceNode, action.keys);
  let cards = getCards();
  if (cards && cards.length) {
    let newCard = update(cards[0], { $merge: { node: ceNode, ui: { data: nodeData, config: [form] } } });
    yield put(putCardsData([cardState]));
  }
}

export function* renderBaseGridDetail(action) {
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

