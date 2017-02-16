import { call, put, select } from "redux-saga/effects";
import { putUser } from '../actions/user';
import { showSpinner, hideSpinner } from '../actions/aebase';

export const getCurrentUser = (state) => state.ae.userSession.user

export function* login(action) {
    // login api call here
    try {
        yield put(showSpinner());
        console.log("received login call ",action);
        const user = getUser();
        yield put(putUser(user));
        yield put(hideSpinner());
    } catch (error) {
        console.log("Login process failed ", error, action);
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

