import navigateTo from '../actions/sideBarNav';
import { call, put, select } from "redux-saga/effects";
import update from 'immutability-helper';
import { getNodeById } from './ce';
import {fetchGridData} from './grid';
import { findCardByIdFromState, refreshTabData } from './layout';
import { getConfig, getSequence, submitNodeData } from '../services/api';
import { putModalUIAndData, putModalData, resetModalAction } from '../actions/modal';
import { putCardsData } from '../actions/layout';
import { createEmptyNodeData, getBindingIdByNodeId, getKeys, createAPIRequestData, updateError } from '../utils/uiData';
import { getCurrentUser } from './user';
import { Map } from 'immutable';


export const getModalData = (state) => state.ae.modal.data;

export function* addFormModalUI(action) {
    try {
        let nodeId = action.nodeId;
        let node = yield call(getNodeById, nodeId);
        if (node != null) {
            console.log("calling node.insertFormId", node.insertFormId);
            const result = yield call(getConfig, node.insertFormId);
            const formConfig = result.data.returnData.data;
            const seqresult = yield call(getSequence, node.compositeEntityId, node.entityId);
            const seqData = seqresult.data.message;
            console.log("seqData baseNodeKeys :", seqData, action.baseKeys);
            let nodeData = createEmptyNodeData(node, seqData, 0, action.baseKeys);
            console.log(" nodeData :",nodeData);
            yield put(putModalUIAndData(formConfig, nodeData));
        }
        else
            yield put(putModalUIAndData({}, Map()));

    }
    catch (error) {
        console.log("Error in addFormModalUI", JSON.stringify(action), error);
    }
}


export function* submitModalNodeDataToDB(action) {
    try {
        console.log("submitModalNodeDataToDB :",action);
        // Get current logged in user
        let user = yield select(getCurrentUser);
        let node = yield call(getNodeById, action.nodeId);
        let data = yield select(getModalData);
        let bindingId = getBindingIdByNodeId(data, action.nodeId);
        let keysMap = yield call(getKeys, data, action.nodeId, bindingId);
        let keys = keysMap.toJS();
        console.log("** keys **", keys);
        // Get API Request Data 
        let apiRequest = yield call(createAPIRequestData, data, user.attributes, node, bindingId);
        // call backend service
        const result = yield call(submitNodeData, node.compositeEntityId, keys, apiRequest);
        if (result.data.status) {
            console.log('=========================modal success=======================');
            // clean up modal data and ui , remov modal active flag
            yield put(resetModalAction());
            if(action.cardConfigId) {
            // refresh TabData
            const card = yield call(findCardByIdFromState, action.cardConfigId);
            const tabData =  yield call(refreshTabData,card, keys);
            card = update(card, { ui: { $merge: { data: tabData } } });
            yield put(putCardsData([card]));
            }
            else if(action.gridConfigId) { // Refresh Grid 
                console.log(" call refresh grid after modal insert");
                yield call (fetchGridData, action.nodeId);
            }


        } else {
            console.log('=============================modal error===================');
            const modalDataWithError = yield call(updateError, data, node.configObjectId, bindingId, result.data.message);
            // update modal data with error
            yield put(putModalData(modalDataWithError));
        }


    } catch (error) {
        console.log("submitCardNodeData failed", action, error);
    }
}


