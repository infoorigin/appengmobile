import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { renderGridDetail, renderBaseGrid } from "./grid";
import { RENDER_GRID_DETAIL, RENDER_BASE_GRID, ACTIVE_NODE_GRID} from "../actions/grid";
import { setCompositeEntity,openEditForm, submitNodeDataToDB } from "./ce";
import { SET_CE_CONFIG,OPEN_NODE_EDIT_FORM, SUBMIT_NODE_DATA ,UPDATE_BASE_FORM_DATA} from "../actions/ce";
import {renderActiveTab, renderLayout} from './layout';
import { RENDER_ACTIVE_TAB, RENDER_LAYOUT} from "../actions/layout";


// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, RENDER_BASE_GRID, renderBaseGrid),
    fork(takeLatest, SUBMIT_NODE_DATA, submitNodeDataToDB),
    fork(takeLatest, RENDER_ACTIVE_TAB, renderActiveTab),
    fork(takeLatest, RENDER_LAYOUT, renderLayout),
   
  ];
}
