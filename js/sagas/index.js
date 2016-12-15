import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { renderBaseGrid } from "./grid";
import { RENDER_BASE_GRID } from "../actions/grid";

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, RENDER_BASE_GRID, renderBaseGrid)
  ];
}
