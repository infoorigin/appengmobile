import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { renderBaseGrid } from "./grid";
import { RENDER_BASE_GRID } from "../actions/grid";
import { setCompositeEntity,openEditForm } from "./ce";
import { SET_CE_CONFIG,OPEN_NODE_EDIT_FORM } from "../actions/ce";

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, RENDER_BASE_GRID, renderBaseGrid),
    fork(takeLatest, SET_CE_CONFIG, setCompositeEntity),
    fork(takeLatest, OPEN_NODE_EDIT_FORM, openEditForm)
  ];
}
