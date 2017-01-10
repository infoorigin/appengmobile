
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';
import AEGridLayout from  './components/gridlayout/';

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

export const HOMEROUTE = 'home';

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
    console.log("PrintState State :",this.props.printState);
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
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    console.log("Route Key :",props.scene.route.key);
    switch (props.scene.route.key) {
      
       case 'datagrid':
	    		return  <AEDataGrid 
             girdId='8505ee57-8b85-42e4-a3e7-2481e3371d62' 
             nodeId='05817d40-92f2-4694-a1bb-9eeb5b6772cc' 
             baseUrl='http://ec2-52-4-99-199.compute-1.amazonaws.com:9900/mconfig'
						 />

	     case 'editform':return <AEForm  
              formid='f8448ea6-440e-4624-905e-153ca8bf3a51' 
              baseUrl='http://ec2-52-4-99-199.compute-1.amazonaws.com:9900/mconfig'/>;
      
       case 'gridlayout':
          return <AEGridLayout />;   
     
       case 'mycoverage':
	    		return <MyCoverage />;
        case 'detailClaim':
	    		return <MyClaimDetail />;
	    case 'support':
	    		return <Support />;
	    case 'mysummary':
	    		return <Summary />;
	    case 'idcard':
	    		return <IDCard />;
	    case 'finddoctor':
	    		return <FindCare />;
	    case 'coverage':
	    		return <Coverage />;
    	 case 'mymessages':
    		return <MyMessage />;
	  case 'splashscreen':
        return <SplashPage />;
      case 'home':
        return <Home />;
      case 'anatomy':
        return <Anatomy />;
      case 'badge':
        return <NHBadge />;
     
      case 'button':
        return <NHButton />;
      case 'card':
        return <NHCard />;
      case 'cardImage':
        return <NHCardImage />;
      case 'cardShowcase':
        return <NHCardShowcase />;
      case 'cardList':
        return <NHCardList />;
      case 'cardHeaderAndFooter':
        return <NHCardHeaderAndFooter />;
      case 'checkbox':
        return <NHCheckbox />;
      case 'deckswiper':
        return <NHDeckSwiper />;
      case 'form':
        return <NHForm />;
      case 'icon':
        return <NHIcon />;
      case 'inputgroup':
        return <NHInputGroup />;
      case 'layout':
        return <NHLayout />;
      case 'list':
        return <NHList />;
      case 'basicList':
        return <NHBasicList />;
      case 'listDivider':
        return <NHListDivider />;
      case 'listIcon':
        return <NHListIcon />;
      case 'listAvatar':
        return <NHListAvatar />;
      case 'listThumbnail':
        return <NHListThumbnail />;
      case 'picker':
        return <NHPicker />;
      case 'radio':
        return <NHRadio />;
      case 'searchbar':
        return <NHSearchbar />;
      case 'spinner':
        return <NHSpinner />;
      case 'tabs':
        return <NHTabs />;
      case 'thumbnail':
        return <NHThumbnail />;
      case 'typography':
        return <NHTypography />;
      default :
        return <Home />;
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
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
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor.statusBarColor}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </Drawer>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
  printState : printState(state),
});

const printState = (state) => {
  // Uncomment following line to see redux state data
  //console.log("All States :",JSON.stringify(state));
  return "1";
}

export default connect(mapStateToProps, bindAction)(AppNavigator);
