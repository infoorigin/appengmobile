import { call, put, select } from "redux-saga/effects";
import update from 'immutability-helper';
import { setUserHome, putDashBoardCards } from '../actions/user';
import { showSpinner, hideSpinner } from '../actions/aebase';
import { hasReadPrivilege } from '../utils/user';
import { getConfig, getGridDataByGridId } from '../services/api';
import { MENUGROUPCONFIG, DASHBOARDCONFIG } from '../utils/constants';

import {  NavigationActions } from 'react-navigation';

export const getCurrentUser = (state) => state.ae.userSession.user

export const getDashBoardCards = (state) => state.ae.dashboard.cards

export function* login(action) {
    // login api call here
    try {
     /*
        yield put(showSpinner());
       
       
        */
        // fetch dashboard data
      //  yield call(setDashBoardCardsWithIndex, cards, 0);    
       console.log("received login call ", action);
        const user = getUser();
        const [menu, cards] = yield [call(getMenu, user), call(getDashboardConfig)] 
        console.log("setting home page");
         yield put(setUserHome(user, menu, cards));
        console.log("Dispatching home");
         yield put(NavigationActions.navigate({ routeName: 'DashBoard' }));
        
    } catch (error) {
        console.log("Login process failed ", error, action);
    }
}

function* getMenu(user) {

    const result = yield call(getConfig, MENUGROUPCONFIG);
    const menugrp = result.data.returnData.data;
    const roleId = user.attributes.APP_LOGGED_IN_ROLE_ID;
    const privilegeMenus = menugrp.menus.filter((menu) => hasReadPrivilege(menu.priveleges, roleId))
    return privilegeMenus;
}

function* getDashboardConfig() {
    const result = yield call(getConfig, DASHBOARDCONFIG);
    const cards = result.data.returnData.data.cards;
    const dashBoardCards = cards.map(config => ({ config, data: [], isDataReady: false }));
    return dashBoardCards;
   
}

export function* changeDashBoardIndex(action) {
    let cards = yield select(getDashBoardCards);
    yield call(cards, action.index);
}

function* setDashBoardCardsWithIndex(cards, index){
    const start = index ? index - 1 : 0;
    const end = index >= cards.length-1 ? index : index + 1;
    let indexes = [];
    for (let i = start; i <= end; i++) {
        indexes.push(i);
    }

    const cardsData = yield indexes.map((i) => call(fetchCardsData, cards[i]));

    indexes.forEach((li, i) => {
        cards = update(cards, {$splice :[[li, 1, cardsData[i]]]});
    });

    yield put(putDashBoardCards(cards));
    
}

function* fetchCardsData(card) {
    if (card.isDataReady)
        return card;
    else {
        switch (card.config.cardType) {
            // call grid data by grid ID
            case "Grid":
            console.log("Getting Grid data for card ",card.config.grid.configObjectId);
                const result = yield call(getGridDataByGridId, card.config.grid.configObjectId);
                let data = result.data.returnData.data;
                return update(card, { $merge: { data: data, isDataReady: true } });
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

