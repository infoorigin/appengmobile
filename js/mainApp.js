
import React, { Component } from 'react';
import { View, BackAndroid, StatusBar, NavigationExperimental, Text } from 'react-native';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';
import AEGridLayout from  './components/gridlayout/';
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

export const HOMEROUTE = 'home';

export default class MainApp extends Component {

 

   constructor(props) {
        super(props);
        this._renderScene=this._renderScene.bind(this);
    }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    console.log(" MainApp componentDidUpdate :");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(" nextProps :",nextProps);
    return nextProps.drawerState != 'opened' && nextProps.isRender ;
  }


  _renderScene() { // eslint-disable-line class-methods-use-this
    console.log("Rendering MainApp :",this.props.routeKey);
    switch (this.props.routeKey) {
      
      case 'dashboard':
        return <AEDashBoard></AEDashBoard>;
       
       case 'datagrid':
	    		return  <AEDataGrid 
             isRender= {this.props.isRender}
             />

	     case 'editform':return <AEForm  
              formid='f8448ea6-440e-4624-905e-153ca8bf3a51' 
              baseUrl='http://ec2-52-4-99-199.compute-1.amazonaws.com:9900/mconfig'/>;
      
       case 'gridlayout':
          return <AEGridLayout />;   
      case 'tablayout':
          return <AETabLayout />; 
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
        return (<AEDashBoard></AEDashBoard>);
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
   return this._renderScene();
  
  }
}

