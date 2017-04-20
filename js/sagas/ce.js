import { call, put, select } from "redux-saga/effects";
import navigateTo from '../actions/sideBarNav';
import update from 'immutability-helper';
import {
    putActiveNodeConfig,
    saveCEConfig, putFormActionResponse,
    saveCENodeConfig, putCENodeEditForm, putCENodeEditFormKeyData, putCENodeData
} from '../actions/ce';
import { getConfig, getCENodeData, submitNodeData, baseFormUpdate } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';
import { findNodeFromCETreeModel, keyColumns, initCENodeDataMap, updateKeys, createAPIRequestData, getKeys, updateError, clearError, getAllBindingIdsForNodeId } from '../utils/uiData';
import { getCurrentUser } from './user';


export const getCompositeEntity = (state) => state.ae.ce.config

export const getCompositeEntityNodeData = (state) => state.ae.nodeData

export const getCompositeEntityNode = (state) => state.ae.cenode.config

export const getCompositeEntityNodeKeys = (state) => state.ae.cenode.keys

export const getActiveCompositeEntityNode = (state) => state.ae.activenode.config

export const getFormDataKey = (state) => state.ae.form.key

export const geLastnavigation = (state) => state.cardNavigation.routes[state.cardNavigation.routes.length - 1].key;


// fetch the Config Item
export function* fetchCompositeEntity(configId) {
    console.log("calling api for to get CE for  action ", configId)
    // call the api to get the ce
    const result = yield call(getConfig, configId);
    const config = result.data.returnData.data;
    return config;

}

// fetch and set the Config Item
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
    yield put(navigateTo(action.navigationRoute, true));
}

function* fetchFormConfig(formConfigId) {
    let result = yield call(getConfig, formConfigId);
    console.log('ok form- no promise-data returned :' + JSON.stringify(result));
    let configItem = result.data.returnData.data;
    yield put(putCENodeEditForm(configItem));
}

/*
export function* setNodeData(ceNode, keys) {
    // call the api to get the grid config Item
    console.log("Getting Node Data for ", ceNode.compositeEntityId, ceNode.entityId, keys.primaryKey);
    let result = yield call(getCENodeData, ceNode.compositeEntityId, ceNode.entityId, keys.primaryKey);
    let responseData = result.data.returnData.data;
    let nodeData = initCENodeDataMap(responseData);
    yield put(putCENodeData(nodeData));
}
*/

export function* queryNodeData(ceNode, keys) {
    // call the api to get the grid config Item
    console.log("Getting Node Data for ", ceNode.compositeEntityId, ceNode.entityId, keys.primaryKey);
    let result = yield call(getCENodeData, ceNode.compositeEntityId, ceNode.entityId, keys.primaryKey);
    let responseData = result.data.returnData.data;
    console.log("Received Node Data for ", ceNode.compositeEntityId, ceNode.entityId, keys.primaryKey);
    let ce = yield select(getCompositeEntity);
    let cetree = ce.treeModel;
    let nodeData = initCENodeDataMap(responseData, keys, cetree);
    return nodeData;
}

export function* setNodeKeys(ceNode, keys) {
    let nodeData = yield select(getCompositeEntityNodeData);
    let nodeDataWithKeys = updateKeys(nodeData, ceNode.configObjectId, keys)
    yield put(putCENodeData(nodeDataWithKeys));
}

export function* getNodeById(nodeId) {
    // Get the node from CENodeTree
    let ceNode = yield call(findNodeFromCETree, nodeId);
    if (ceNode == null) { // ceNode is part of other CE
        const result = yield call(getConfig, action.configId);
        ceNode = result.data.returnData.data;
    }
    return ceNode;
}

export function* setActiveNode(action) {
    // Get the node from CENodeTree

    let ceNode = yield call(findNodeFromCETree, action.configId);
    console.log("ceNode setActiveNode::", ceNode);

    if (ceNode == null) { // ceNode is part of other CE
        const result = yield call(getConfig, action.configId);
        ceNode = result.data.returnData.data;
    }
    yield put(putActiveNodeConfig(ceNode));
}

export function* findParentNode(nodeId) {
    console.log("ceNode findParentNode::", nodeId);
    let ce = yield select(getCompositeEntity);
    let cetree = ce.treeModel;
    let parent = findParentNodeById(nodeId, cetree.children, cetree.node);
    return parent;
}

function findParentNodeById(nodeId, nodes, parent ){
    nodes = nodes &&  nodes.length ? nodes : [];
    console.log(" nodes ", nodes.length);
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].node.configObjectId == nodeId) {
            return parent;
        }
        else {
            let result = findParentNodeById(nodeId, nodes[i].children, nodes[i]);
            if (result) return result;
        }
    }
    return null;
}

export function* findNodeFromCETree(nodeId) {
    console.log("ceNode findNodeFromCETree::", nodeId);
    let ce = yield select(getCompositeEntity);
    let cetree = ce.treeModel;
    let node = findNodeFromCETreeModel(nodeId, [cetree])
    return node;
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
    console.log(" submitNodeDataToDB calling api");
    try {
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

    } catch (error) {
        console.log("Api called failed");
        console.log(error);
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
