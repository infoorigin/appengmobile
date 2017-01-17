import { call, put, select } from "redux-saga/effects";
import navigateTo from '../actions/sideBarNav';
import {
    saveCEConfig, putFormActionResponse,
    saveCENodeConfig, putCENodeEditForm, putCENodeEditFormKeyData, putCENodeData
} from '../actions/ce';
import { getConfig, getCENodeData, submitNodeData, baseFormUpdate } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';
import { initCENodeDataMap, updateKeys, createAPIRequestData, getKeys, updateError, clearError } from '../utils/uiData';
import { getCurrentUser } from './user';


export const getCompositeEntity = (state) => state.ae.ce.config

export const getCompositeEntityNodeData = (state) => state.ae.nodeData

export const getCompositeEntityNode = (state) => state.ae.cenode.config

export const getFormDataKey = (state) => state.ae.form.key

export const geLastnavigation = (state) => state.cardNavigation.routes[state.cardNavigation.routes.length - 1].key;

// fetch the Config Item
export function* setCompositeEntity(action) {
    console.log("calling api for to get CE for  action ", action)
    // call the api to get the ce
    const result = yield call(getConfig, action.configId);

    const config = result.data.returnData.data;

    yield put(saveCEConfig(config));

    // set the cenode to state
    if (config.rootNode)
        yield put(saveCENodeConfig(config.rootNode));

    console.log("published to CE Node " + config.rootNode);

}

export function* openEditForm(action) {
    //Put keydata 
    console.log('data : ' + JSON.stringify(action));
    yield put(putCENodeEditFormKeyData(action.key));
    // get the current node 

    let ceNode = yield select(getCompositeEntityNode);
    // get the editForm from server side 

    yield call(fetchFormConfig, ceNode.editFormId);

    // get the data for keyData
    // Fetch and Set Form Data to state
    yield call(fetchNodeData, ceNode, action.key);

    // Navigate to target screen 
    yield put(navigateTo(action.navigationRoute));

}

function* fetchFormConfig(formConfigId) {
    let result = yield call(getConfig, formConfigId);
    console.log('ok form- no promise-data returned :' + JSON.stringify(result));
    let configItem = result.data.returnData.data;

    yield put(putCENodeEditForm(configItem));
}

export function* setNodeData(ceNode, keys) {
    // call the api to get the grid config Item
    console.log("Getting Node Data for ", ceNode.compositeEntityId, ceNode.entityId, keys.primaryKey);
    let result = yield call(getCENodeData, ceNode.compositeEntityId, ceNode.entityId, keys.primaryKey);
    let responseData = result.data.returnData.data;
    let nodeData = initCENodeDataMap(responseData);
    yield put(putCENodeData(nodeData));
}

export function* setNodeKeys(ceNode, keys) {

    let nodeData = yield select(getCompositeEntityNodeData);
    let nodeDataWithKeys = updateKeys(nodeData, ceNode.configObjectId, keys)
    yield put(putCENodeData(nodeDataWithKeys));
}


export function* findNodeFromCETree(nodeId) {

    let ce = yield select(getCompositeEntity);
    let cetree = ce.treeModel;
    let basenode = cetree.node;
    if (basenode.configObjectId == nodeId)
        return cetree.node;
    else
        return yield select(findNodeFromChildTreeNodes, node[i].children, nodeId);
}


export function* submitNodeDataToDB(action) {

    console.log("received call in submitNodeDataToDB");
    // First push update noedata to redux state
    yield put(putCENodeData(action.data.nodeData));
    // Get current logged in user
    let user = yield select(getCurrentUser);

    // get node oject from ce treeModel
    let ceNode = yield call(findNodeFromCETree, action.data.nodeId);

    let keysMap = yield call(getKeys, action.data.nodeData, action.data.nodeId, action.data.bindingId);
    let keys = keysMap.toJS();
    // Get API Request Data 
    let apiRequest = yield call(createAPIRequestData, action.data.nodeData, user.attributes, ceNode, action.data.bindingId);

    // call backend service
    let result = yield call(submitNodeData, ceNode.compositeEntityId, keys, apiRequest);


    if (result.data.status) {
        console.log('=========================success=======================');
        let nodeDataWithNoError = yield call(clearError, action.data.nodeData, action.data.nodeId, action.data.bindingId);
        yield put(putCENodeData(nodeDataWithNoError));

    } else {
        console.log('=============================error===================');
        let nodeDataWithError = yield call(updateError, action.data.nodeData, action.data.nodeId, action.data.bindingId, result.data.message);
        yield put(putCENodeData(nodeDataWithError));
    }

}

export function* updateBaseForm(action) {

    // get the current ceid, get current beid and primary key, call the validation.
    let ceNode = yield select(getCompositeEntityNode);
    let formKey = yield select(getFormDataKey);
    let result = yield call(baseFormUpdate, ceNode.compositeEntityId, ceNode.entityId, formKey, action.data);
    if (result.data.status) {
        console.log('=========================success=======================');
        yield call(fetchNodeData, ceNode, formKey);
    } else {
        console.log('=============================error===================');
        yield put(putFormActionResponse(result.data));
    }

    console.log('===============End Log statement===============>>');

}

function findNodeFromChildTreeNodes(nodes, nodeId) {
    for (i = 0; i < nodes.length; i++) {
        if (node[i].configObjectId == nodeId) {
            return node[i];
        }
        else {
            let result = findNodeFromChildTreeNodes(node[i].children, nodeId);
            if (result) return result;
        }
        return null;
    }
}

