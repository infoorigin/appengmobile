
import navigateTo from '../actions/sideBarNav';
import { call, put, select } from "redux-saga/effects";
import { getCompositeEntityNode } from './ce';
import { getConfig, getGridData } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';
import {saveLayoutConfig} from '../actions/layout';

export function* openLayout(action) {
    // Get Layout 
    const ceNode = yield select(getCompositeEntityNode);
    const result = yield call(getConfig, ceNode.uiLayoutIds.mobile);
    const layout = result.data.returnData.data;
    yield put(saveLayoutConfig(layout));

    switch (layout.uiLayoutType) {
        case "": //MOBILETABLAYOUT
        default:
            yield put(navigateTo('gridlayout', HOMEROUTE));
    }

}