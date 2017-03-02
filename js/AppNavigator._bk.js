
import React, { Component } from 'react';
import { View, BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';
import AEGridLayout from './components/gridlayout/';
import AETabLayout from './components/tablayout/';
import AEDashBoard from './components/aedashboard/';

import MyMessage from './components/eccheckmessage/';
import Coverage from './components/eccoverage/';
import FindCare from './components/ecfindcare/';
import IDCard from './components/ecidcard/';
import Summary from './components/ecsummary/';
import Support from './components/ecsupport/';
import MyClaim from './components/myclaim/';
import MyCoverage from './components/mycoverage/';

import AEForm from './components/aeform/';
import AEDataGrid from './components/aedatagrid/';
import AESpinner from './components/spinnernew';

import LoginScreen from './components/login/';

import MyClaimDetail from './components/myclaim/claimdetail';

import Home from './components/home/';
import Anatomy from './components/anatomy/';
import NHBadge from './components/badge/';
import NHButton from './components/button/';
import NHCard from './components/card/';
import NHCardImage from './components/card/card-image';
import NHCardShowcase from './components/card/card-showcase';
import NHCardList from './components/card/card-list';
import NHCardHeaderAndFooter from './components/card/card-header-and-footer';
import NHCheckbox from './components/checkbox/';
import NHDeckSwiper from './components/deckswiper/';
import NHForm from './components/form/';
import NHIcon from './components/icon/';
import NHInputGroup from './components/inputgroup/';
import NHLayout from './components/layout/';
import NHList from './components/list/';
import NHBasicList from './components/list/basic-list';
import NHListDivider from './components/list/list-divider';
import NHListIcon from './components/list/list-icon';
import NHListAvatar from './components/list/list-avatar';
import NHListThumbnail from './components/list/list-thumbnail';
import NHPicker from './components/picker/';
import NHRadio from './components/radio/';
import NHSearchbar from './components/searchbar/';
import NHSpinner from './components/spinner/';
import NHTabs from './components/tabs/';
import NHThumbnail from './components/thumbnail/';
import NHTypography from './components/typography/';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sidebar';
import statusBarColor from './themes/base-theme';
import MainApp from './mainApp';

export const HOMEROUTE = 'home';
import Main from './Main'

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    console.log("PrintState State :", this.props.printState);
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this._drawer == null) return;

    if (this.props.drawerState === 'opened') {
      console.log("componentDidUpdate this._drawer open :");
      this.openDrawer();
       console.log("componentDidUpdate this._drawer open-done:");
    }

    if (this.props.drawerState === 'closed') {
       console.log("componentDidUpdate this._drawer close :");
      this._drawer.close();
      console.log("componentDidUpdate this._drawer close-done:");
    }

  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    console.log(" this._drawer open :");
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  oncloseDrawer(){
    console.log("On Close Done ");
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }


  _renderMainApp() {
    const routes = this.props.navigation.routes;
    const currentRouteKey = routes && routes.length ? routes[routes.length - 1].key : "home";

    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.oncloseDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  // eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan ={true}
      >

        <MainApp routeKey={currentRouteKey} drawerState={this.props.drawerState} isRender={this.props.isRender} >
        </MainApp>

        <AESpinner visible={this.props.isSpinner} textContent={"Loading..."} textStyle={{ color: '#FFF' }}>
        </AESpinner>
      </Drawer>
    );

  }

  _renderLoginScreen() {
    return (<LoginScreen>
    </LoginScreen>
    );
  }

  render() {
    console.log("AppNavigator :", this.props.navigation, this.props.drawerState, this.props.userSession.isAuthenticated);
    if (this.props.userSession.isAuthenticated) {
      return this._renderMainApp();
    }
    else {
      return this._renderLoginScreen();
    }

  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
  userSession: state.ae.userSession,
  isSpinner: state.ae.global.isSpinner,
  isRender: state.ae.global.isRender,
	dummyProps : printState(state.drawer.drawerState, state.ae.global.isRender),
});

const printState = (out1, out2) => {
  console.log("Inside AppNavigator :",out1, out2);
  return "1";
}


export default connect(mapStateToProps, bindAction)(AppNavigator);
