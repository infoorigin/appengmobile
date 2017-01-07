
import { actions } from 'react-native-navigation-redux-helpers';
import { closeDrawer } from './drawer';

const {
  replaceAt,
  popRoute,
  pushRoute,
} = actions;

export default function navigateTo(route, homeRoute) {
  console.log("received new navigation dispatch", route, homeRoute);
  return (dispatch, getState) => {
    const navigation = getState().cardNavigation;
    const currentRouteKey = navigation.routes[navigation.routes.length - 1].key;

    dispatch(closeDrawer());

    if(route !== homeRoute && (homeRoute == null || homeRoute === undefined)){
      console.log("homeRoute is undefined so pushing to next level");
      dispatch(pushRoute({ key: route, index:  navigation.routes+1 }, navigation.key));
    }
    else if (currentRouteKey !== homeRoute && route !== homeRoute) {
      dispatch(replaceAt(currentRouteKey, { key: route, index: 1 }, navigation.key));
    } else if (currentRouteKey !== homeRoute && route === homeRoute) {
      dispatch(popRoute(navigation.key));
    } else if (currentRouteKey === homeRoute && route !== homeRoute) {
      dispatch(pushRoute({ key: route, index: 1 }, navigation.key));
    }
  };
}



