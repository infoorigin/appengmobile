import { call, put,select } from "redux-saga/effects";
import navigateTo from '../actions/sideBarNav';
import { saveCEConfig, saveCENodeConfig,putCENodeEditForm,putCENodeEditFormKeyData,putCENodeEditFormData } from '../actions/ce';
import { getConfig,getEditFormData } from '../services/api';
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


export function* openEditForm(action){
    //Put keydata 
   console.log('data : '+ JSON.stringify(action));
    yield put(putCENodeEditFormKeyData(action.key));
    // get the current node 
   
    let ceNode = yield select(getCompositeEntityNode);
    // get the editForm from server side 
    
     yield call(fetchFormConfig, ceNode.editFormId);
   
    // get the data for keyData
    // Fetch and Set Form Data to state
     yield call(fetchFormData, ceNode,action.key);
     
    // Navigate to target screen 
     yield put(navigateTo(action.navigationRoute, HOMEROUTE)); 

}

function* fetchFormConfig(formConfigId){
  let result = yield call(getConfig, formConfigId);
   console.log('ok form-----------data returned :'+JSON.stringify(result));
   yield Promise.resolve();
  let configItem = result.data.returnData.data;

  yield put(putCENodeEditForm(configItem));
}

function* fetchFormData(ceNode,key) {
  // call the api to get the grid config Item
  let result = yield call(getEditFormData, ceNode.compositeEntityId,ceNode.entityId,key);
  console.log('ok-----------data returned :'+JSON.stringify(result));
  yield Promise.resolve();
  let data = result.data.returnData.data;
  yield put(putCENodeEditFormData(data));
}