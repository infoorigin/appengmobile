import { call, put, select } from "redux-saga/effects";
import update from 'immutability-helper';
import { putUser, putMenu, putDashBoardCards } from '../actions/user';
import { showSpinner, hideSpinner } from '../actions/aebase';
import { hasReadPrivilege } from '../utils/user';
import { getConfig } from '../services/api';
import { MENUGROUPCONFIG, DASHBOARDCONFIG } from '../utils/constants';

export const getCurrentUser = (state) => state.ae.userSession.user

export const getDashBoardCards = (state) => state.ae.dashboard.cards

export function* login(action) {
    // login api call here
    try {
        yield put(showSpinner());
        console.log("received login call ", action);
        const user = getUser();
        yield put(putUser(user));
        yield call(setMenu);
        yield call(setDashboard);
        yield put(hideSpinner());
    } catch (error) {
        console.log("Login process failed ", error, action);
    }
}

function* setMenu() {

    const result = yield call(getConfig, MENUGROUPCONFIG);
    const menugrp = result.data.returnData.data;
    const user = yield select(getCurrentUser);
    const roleId = user.attributes.APP_LOGGED_IN_ROLE_ID;

    const privilegeMenus = menugrp.menus.filter((menu) => hasReadPrivilege(menu.priveleges, roleId))
    yield put(putMenu(privilegeMenus));
}

function* setDashboard() {
    const result = yield call(getConfig, DASHBOARDCONFIG);
    const cards = result.data.returnData.data.cards;
    const dashBoardCards = cards.map(config => ({ config, data: [], isDataReady: false }));
    yield put(putDashBoardCards(dashBoardCards));
    yield call(changeDashBoardIndex, {index:0});
}

export function* changeDashBoardIndex(action) {
    let cards = yield select(getDashBoardCards);
    const start = action.index ? action.index - 1 : 0;
    const end = action.index >= cards.length-1 ? action.index : action.index + 1;
    let indexes = [];
    for (let i = start; i <= end; i++) {
        indexes.push(i);
    }
    console.log("indexes :",indexes);
    const cardsData = yield indexes.map((i) => call(fetchCardsData, cards[i]));

    indexes.forEach((index, i) => {
        cards = update(cards, {$splice :[[index, 1, cardsData[i]]]});
    });

    yield put(putDashBoardCards(cards));
    
}

function* fetchCardsData(card) {
    if (card.config.isDataReady)
        return card;
    else {
        switch (card.config.cardType) {
            // call grid data by grid ID
            case "Grid":
                return update(card, { $merge: { data: [], isDataReady: true } });
            default:
                return update(card, { $merge: { data: [], isDataReady: true } });
        }
    }
}



// Dummy calll
function getUser() {
    return {
        firstName: 'John',
        lastName: 'Doe',
        currentRole: { name: 'ADMIN', id: 16 },
        currentProject: { id: '0', name: 'Application' },
        attributes: {
            APP_LOGGED_IN_PROJECT_ID: 0,
            APP_LOGGED_IN_ROLE_ID: 16,
            APP_LOGGED_IN_USER_ID: 1111
        }
    }
}

