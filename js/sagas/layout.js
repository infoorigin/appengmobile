
import navigateTo from '../actions/sideBarNav';
import { call, put, select } from "redux-saga/effects";
import { getCompositeEntity } from './ce';
import { getConfig, getGridData } from '../services/api';
import { HOMEROUTE } from '../AppNavigator';
import {saveLayoutConfig} from '../actions/layout';

export function* openLayout(action) {
    // Get Layout 
    const ce = yield select(getCompositeEntity);
    const result = yield call(getConfig, ce.uiLayoutIds.mobile);
    const layout = result.data.returnData.data;
    yield put(saveLayoutConfig(layout));

    switch (layout.uiLayoutType) {
        case "MOBILETABLAYOUT": //MOBILETABLAYOUT
            yield put(navigateTo('tablayout', HOMEROUTE));
            break;
        default:
            yield put(navigateTo('gridlayout', HOMEROUTE));
    }

}