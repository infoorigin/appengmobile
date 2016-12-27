
import { call, put, select } from "redux-saga/effects";
import navigateTo from '../actions/sideBarNav';
import { saveGridConfig, saveGridData } from '../actions/grid';
import { setCompositeEntity, getCompositeEntityNode } from './ce';
import { getConfig, getGridData } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';

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

    //TODO Stop Spinner

  }
  catch (error) {
    console.log("Error in API Call for action", JSON.stringify(action), error);
    console.log("Re-Routing to home");
    put(navigateTo(HOMEROUTE, HOMEROUTE));
  }


}

function* fetchGridConfig(gridConfigId) {
  // call the api to get the grid config Item
  let result = yield call(getConfig, gridConfigId);
  let configItem = result.data.returnData.data;
  yield put(saveGridConfig(configItem));
}

function* fetchGridData(nodeId) {
  // call the api to get the grid config Item
  let result = yield call(getGridData, nodeId);
  let data = result.data.returnData.data;
  yield put(saveGridData(data));
}
