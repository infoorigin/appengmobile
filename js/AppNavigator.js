import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {
  NavigationActions,
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import {
  connect,
} from 'react-redux';
import {renderAndNavigate} from './actions/aebase';
import LoginScreen from './components/login/';
import DashBoard from './components/aedashboard';
import DataGrid from './components/aedatagrid/';
import TabLayout from './components/tablayout/';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DrawerContent from './components/drawer/DrawerComponent';

import AEWebEditor from './widgets/AEWebEditor';
import AEHTMLView from './widgets/AEHTMLView';

const SampleText = ({ children }) => (
  <Text style={styles.sampleText}>{children}</Text>
);


const MyNavScreen =  connect()(({ banner, navigation, dispatch }) => {
  return (
  <ScrollView style={{ marginTop: 0 }}>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() =>  dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }))}
      title="Open drawer2"
    />
    <Button
      onPress={() => navigation.goBack(null)}
      title="Go back"
    />
    <Button
      onPress={() => dispatch(NavigationActions.navigate({ routeName: 'Drafts' }))}
      title="Draft Screen"
    />
    <Button
      onPress={() => dispatch(NavigationActions.navigate({ routeName: 'Inbox' }))}
      title="Inbox Screen"
    />
    <Button
      onPress={() => dispatch(NavigationActions.navigate({ routeName: 'Login' }))}
      title="Login"
    />
  </ScrollView>
  )
});

const InboxScreen = ({ navigation }) => (
  <MyNavScreen
    banner={'Inbox Screen'}
    navigation={navigation}
  />
);
InboxScreen.navigationOptions = {
  drawer: {
    label: 'Inbox2',
    icon: ({ tintColor }) => (
      <MaterialIcons
        name="move-to-inbox"
        size={24}
        style={{ color: tintColor }}
      />
    ),
  },
};

const AEWebEditorScreen =  connect()(({ navigation, dispatch }) => {
  return (
     <AEWebEditor
    navigation={navigation}
    dispatch={dispatch}
  />
  );
});

const AEHTMLViewScreen =  connect()(({ navigation, dispatch }) => {
  return (
     <AEHTMLView
    navigation={navigation}
    dispatch={dispatch}
  />
  );
});


const DraftsScreen = ({ navigation }) => (
  <MyNavScreen
    banner={'Drafts Screen'}
    navigation={navigation}
  />
);
DraftsScreen.navigationOptions = {
  drawer: {
    label: 'Drafts',
    icon: ({ tintColor }) => (
      <MaterialIcons
        name="drafts"
        size={24}
        style={{ color: tintColor }}
      />
    ),
  },
};

const DrawerRoutes = {
  DashBoard :{screen : DashBoard },
  Login: { screen: LoginScreen },
  Inbox: { screen: InboxScreen },
  Drafts: { screen: DraftsScreen },
  DataGrid : { screen: DataGrid },
  TabLayout : { screen : TabLayout},
  WebView : {screen : AEWebEditorScreen},
  HTMLView : {screen : AEHTMLViewScreen},
};

const DrawerMenuContent =  connect(
      state => ({
          menu: state.ae.menu,
        }),
      dispatch => ({
          renderAndNavigate : (actionType,configId, route) => dispatch(renderAndNavigate(actionType ,configId, route))
        })
      ) (({renderAndNavigate, menu, navigation}) =>
      { return <DrawerContent renderAndNavigate={renderAndNavigate} menu={menu} navigation={navigation} routes={DrawerRoutes} /> }
      );

const DrawerExample = DrawerNavigator(
  DrawerRoutes
  , {
    contentComponent: DrawerMenuContent,
    //you dont need the routes props, but just in case you wanted to use those instead for the navigation item creation you could
    initialRouteName: 'Login',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  });

const styles = StyleSheet.create({
  sampleText: {
    margin: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default DrawerExample;
//export default AppNavigator;
