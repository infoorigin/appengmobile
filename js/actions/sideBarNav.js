
import { closeDrawer } from './drawer';


export const PUSH_ROUTE = "PUSH_ROUTE";
export const POP_ROUTE = "POP_ROUTE";
export const REPLACE_AT = "REPLACE_AT";
export const RESET_ROUTE = "RESET_ROUTE";
export const HOME_ROUTE_KEY = "home"; 

function resetRoute(routeKey, route) {
  return {
    type: RESET_ROUTE,
    payload: {}
  }
}

function replaceAt(index, route) {
  return {
    type: REPLACE_AT,
    payload: {
      index,
      route,
   }
  }
}

function pushRoute(route) {
  return {
    type: PUSH_ROUTE,
    payload: {
      route,
   }
  };
}

function popRoute() {
  return {
    type: POP_ROUTE,
    payload: {
      
    }
  };
}


export function navigateTo(route, isCloseDrawer) {
  console.log("received new navigation dispatch", route, isCloseDrawer);
  return (dispatch, getState) => {
    const navigation = getState().cardNavigation;
    const currentRouteKey = navigation.routes[navigation.routes.length - 1].key;

    if(isCloseDrawer)
      dispatch(closeDrawer());

    if(route == HOME_ROUTE_KEY){
      dispatch(resetRoute());
    }
    else {
      if(navigation.routes.length)
        dispatch(replaceAt(navigation.routes.length-1, {key: route, index:  navigation.routes.length-1}));
      else
         dispatch(pushRoute({key: route, index:  0}));
    }
  
  };
}
