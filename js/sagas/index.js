import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { renderGridDetail, renderBaseGrid } from "./grid";
import { RENDER_GRID_DETAIL, RENDER_BASE_GRID} from "../actions/grid";
import {  submitNodeDataToDB, submitCardNodeDataToDB } from "./ce";
import {  SUBMIT_NODE_DATA, SUBMIT_CARD_NODE_DATA } from "../actions/ce";
import {renderActiveTab, renderLayout, updateCardUIData} from './layout';
import { RENDER_ACTIVE_TAB, RENDER_LAYOUT, UPDATE_CARD_UI_DATA} from "../actions/layout";
import { MODAL_ADD_UI, SAVE_MODAL_DATA} from "../actions/modal";
import { addFormModalUI, submitModalNodeDataToDB } from  "./modal";
import { LOGIN} from "../actions/user";
import { login } from  "./user";


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
  ];
}
