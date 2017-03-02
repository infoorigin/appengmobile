export const LOGIN = 'LOGIN';
export const PUT_USER = 'PUT_USER';
export const PUT_MENU = 'PUT_MENU';
export const PUT_DASHBOARD_CARDS = 'PUT_DASHBOARD_CARDS';
export const CHANGE_DASHBOARD_TAB = 'CHANGE_DASHBOARD_TAB';
export const SET_USER_HOME = "SET_USER_HOME";

export function setUserHome(user, menu, cards){
  return{
    type: SET_USER_HOME,
    user,
    menu,
    cards,
  };
}

export function loginAction(userid, password){
  return{
    type: LOGIN,
    userid,
    password,
  };
}

export function putUser(user){
  return{
    type: PUT_USER,
    user,
  };
}

export function putMenu(menu){
  return{
    type: PUT_MENU,
    menu,
  };
}

export function putDashBoardCards(cards){
  return{
    type: PUT_DASHBOARD_CARDS,
    cards,
  };
}

export function changeDashBoardTabIndex(index){
  return {
    type:CHANGE_DASHBOARD_TAB,
    index : index
  }

}
