import { call, put,select } from "redux-saga/effects";
import navigateTo from '../actions/sideBarNav';
import {saveCEConfig, putFormActionResponse,
    saveCENodeConfig,putCENodeEditForm,putCENodeEditFormKeyData,putCENodeEditFormData } from '../actions/ce';
import { getConfig,getEditFormData ,baseFormUpdate} from '../services/api';
import { HOMEROUTE } from '../AppNavigator';


export const getCompositeEntity = (state) => state.ae.ce.config

export const getCompositeEntityNode = (state) => state.ae.cenode.config

export const getFormDataKey=(state) =>state.ae.form.key

export const geLastnavigation=(state)=>state.cardNavigation.routes[state.cardNavigation.routes.length-1].key;

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
     yield put(navigateTo(action.navigationRoute)); 

}

function* fetchFormConfig(formConfigId){
  let result = yield call(getConfig, formConfigId);
   console.log('ok form- no promise-data returned :'+JSON.stringify(result));
   let configItem = result.data.returnData.data;

   yield put(putCENodeEditForm(configItem));
}

function* fetchFormData(ceNode,key) {
  // call the api to get the grid config Item
  console.log(" calling fetch data form");
  let result = yield call(getEditFormData, ceNode.compositeEntityId,ceNode.entityId,key);
  let data = result.data.returnData.data;
  console.log("status", result.data.status);
  yield put(putCENodeEditFormData(data));
}


export function* updateBaseForm(action){
    
    // get the current ceid, get current beid and primary key, call the validation.
    let ceNode = yield select(getCompositeEntityNode);
    let formKey = yield select(getFormDataKey);
    let result = yield call(baseFormUpdate, ceNode.compositeEntityId,ceNode.entityId,formKey,action.data);
    if( result.data.status){
        console.log('=========================success=======================');
        yield call(fetchFormData, ceNode,formKey);
    }else{
        console.log('=============================error===================');
         yield put(putFormActionResponse(result.data)); 
    }
   

    console.log('===============End Log statement===============>>');

}