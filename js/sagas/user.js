import { call, put, select } from "redux-saga/effects";
import { putUser, putMenu} from '../actions/user';
import { showSpinner, hideSpinner } from '../actions/aebase';
import {hasReadPrivilege} from '../utils/user';
import { getConfig } from '../services/api';

export const getCurrentUser = (state) => state.ae.userSession.user

export function* login(action) {
    // login api call here
    try {
        yield put(showSpinner());
        console.log("received login call ",action);
        const user = getUser();
        yield put(putUser(user));
        yield call(setMenu);
        yield put(hideSpinner());
    } catch (error) {
        console.log("Login process failed ", error, action);
    }
}

function* setMenu(){
    MENUGROUPCONFIG="952ee82b-75ee-4a66-99f3-a72fadfbeb5f";
    const result = yield call(getConfig, MENUGROUPCONFIG);
    const menugrp = result.data.returnData.data;
    const user = yield select(getCurrentUser);
    const roleId = user.attributes.APP_LOGGED_IN_ROLE_ID;

    const privilegeMenus = menugrp.menus.filter( (menu) => hasReadPrivilege(menu.priveleges, roleId) )
    console.log(" privilegeMenus :",privilegeMenus);
    yield put(putMenu(privilegeMenus));
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

