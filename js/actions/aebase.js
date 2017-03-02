export const SHOW_SPINNER = "SHOW_SPINNER";
export const HIDE_SPINNER = "HIDE_SPINNER";
export const SHOW_SPINNER_DISABLE_RENDER = "SHOW_SPINNER_DISABLE_RENDER";
export const DISABLE_RENDER = "DISABLE_RENDER";
export const HIDE_SPINNER_ENABLE_RENDER = "HIDE_SPINNER_ENABLE_RENDER";
export const ENABLE_RENDER = "ENABLE_RENDER";

export function showSpinner(){
   return{
    type: SHOW_SPINNER,
   }
}

export function showSpinnerAndDisableRender(){
   return{
    type: SHOW_SPINNER_DISABLE_RENDER,
   }
}

export function disableRender(){
   return{
    type: DISABLE_RENDER,
   }
}

export function enableRender(){
   return{
    type: ENABLE_RENDER,
   }
}

export function hideSpinnerAndEnableRender(){
   return{
    type: HIDE_SPINNER_ENABLE_RENDER,
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
