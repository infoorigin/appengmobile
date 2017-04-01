import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { renderNewCEBaseGrid, renderGridDetail, renderBaseGrid } from "./grid";
import { NEW_CE_RENDER_BASE_GRID, RENDER_GRID_DETAIL, RENDER_BASE_GRID} from "../actions/grid";
import {  submitNodeDataToDB, submitCardNodeDataToDB } from "./ce";
import {  SUBMIT_NODE_DATA, SUBMIT_CARD_NODE_DATA } from "../actions/ce";
import {renderActiveTab, renderLayout, updateCardUIData, renderLayoutForCE} from './layout';
import { RENDER_ACTIVE_TAB, RENDER_LAYOUT, UPDATE_CARD_UI_DATA, RENDER_LAYOUT_FOR_CE} from "../actions/layout";
import { MODAL_ADD_UI, SAVE_MODAL_DATA} from "../actions/modal";
import { addFormModalUI, submitModalNodeDataToDB } from  "./modal";
import { LOGIN, CHANGE_DASHBOARD_TAB} from "../actions/user";
import { login, changeDashBoardIndex } from  "./user";


// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, RENDER_BASE_GRID, renderBaseGrid),
    fork(takeLatest, SUBMIT_NODE_DATA, submitNodeDataToDB),
    fork(takeLatest, RENDER_ACTIVE_TAB, renderActiveTab),
    fork(takeLatest, RENDER_LAYOUT, renderLayout),
    fork(takeLatest, RENDER_GRID_DETAIL , renderGridDetail),
    fork(takeLatest,UPDATE_CARD_UI_DATA, updateCardUIData),
    fork(takeLatest, SUBMIT_CARD_NODE_DATA, submitCardNodeDataToDB),
    fork(takeLatest, MODAL_ADD_UI, addFormModalUI),
    fork(takeLatest, SAVE_MODAL_DATA, submitModalNodeDataToDB),
    fork(takeLatest, LOGIN, login),
    fork(takeLatest, CHANGE_DASHBOARD_TAB, changeDashBoardIndex),
    fork(takeLatest, NEW_CE_RENDER_BASE_GRID, renderNewCEBaseGrid),
    fork(takeLatest, RENDER_LAYOUT_FOR_CE, renderLayoutForCE),
  ];
}
