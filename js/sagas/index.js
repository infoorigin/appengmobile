import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { renderGridDetail, renderBaseGrid, activeNodeGrid } from "./grid";
import { RENDER_GRID_DETAIL, RENDER_BASE_GRID, ACTIVE_NODE_GRID} from "../actions/grid";
import { setCompositeEntity,openEditForm, submitNodeDataToDB, updateBaseForm } from "./ce";
import { SET_CE_CONFIG,OPEN_NODE_EDIT_FORM, SUBMIT_NODE_DATA ,UPDATE_BASE_FORM_DATA} from "../actions/ce";

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, RENDER_BASE_GRID, renderBaseGrid),
    fork(takeLatest, ACTIVE_NODE_GRID, activeNodeGrid),
    fork(takeLatest, SET_CE_CONFIG, setCompositeEntity),
    fork(takeLatest, RENDER_GRID_DETAIL, renderGridDetail),
    fork(takeLatest, OPEN_NODE_EDIT_FORM, openEditForm),
    fork(takeLatest, UPDATE_BASE_FORM_DATA, updateBaseForm),
    fork(takeLatest, SUBMIT_NODE_DATA, submitNodeDataToDB),
  ];
}
