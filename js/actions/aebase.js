export const SHOW_SPINNER = "SHOW_SPINNER";
export const HIDE_SPINNER = "HIDE_SPINNER";

export function showSpinner(){
   return{
    type: SHOW_SPINNER,
   }
}

export function hideSpinner(){
   return{
    type: HIDE_SPINNER,
   }
}

export function renderEditForm(actionType,keyValue,route) {

  return{
    type: actionType,
    key: keyValue,
    navigationRoute: route
  };
}
export function renderAndNavigate(actionType,configId, route) {
  return{
    type: actionType,
    configId: configId,
    navigationRoute : route
  };
}