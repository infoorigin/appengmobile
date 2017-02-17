export const LOGIN = 'LOGIN';
export const PUT_USER = 'PUT_USER';
export const PUT_MENU = 'PUT_MENU';


export function loginAction(userid, password){
    console.log("loginAction :",userid, password);
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
