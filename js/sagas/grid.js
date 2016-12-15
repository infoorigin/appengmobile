
import navigateTo from '../actions/sideBarNav';
import { call, put } from "redux-saga/effects";
import { saveGridConfig } from '../actions/grid';
import { getConfig } from '../services/api';

const homeRoute = 'home';

// fetch the Config Item
export function* renderBaseGrid(action) {
  // call the api to get the config Item
  const result = yield call(getConfig, action.configId);

  if (result.error) {
    console.log("Error in API Call for action", JSON.stringify(action), result.error);
    console.log("Re-Routing to home");
    put(navigateTo(homeRoute, homeRoute));
  }
  else {
    const configItem = result.data.returnData.data;
    yield put(saveGridConfig(configItem));
    yield put(navigateTo(action.navigationRoute, homeRoute));
  }

}
