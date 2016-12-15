import { call, put } from "redux-saga/effects";
import navigateTo from '../actions/sideBarNav';
import { saveCEConfig, saveCENodeConfig } from '../actions/ce';
import { getConfig } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';


export const getCompositeEntity = (state) => state.ae.ce.config

export const getCompositeEntityNode = (state) => state.ae.cenode.config

// fetch the Config Item
export function* setCompositeEntity(action) {
    console.log("calling api for to get CE for  action ",action)
    // call the api to get the ce
    const result = yield call(getConfig, action.configId);
    const config = result.data.returnData.data;
    yield put(saveCEConfig(config));
   
    // set the cenode to state
    if (config.rootNode)
        yield put(saveCENodeConfig(config.rootNode));

    console.log("published to CE Node "+config.rootNode);    

}

