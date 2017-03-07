/* @flow */
/* eslint-disable import/no-commonjs */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { openDrawer } from '../../actions/drawer';
import { Title, Content, Text, Button, Icon } from 'native-base';
import AEContainer from '../../widgets/AEContainer';
import AEHeader from '../../widgets/AEHeader';
import AECard from '../aecard';
import DashBoardTabNavigator from './dashboardtabnavigator';
import {  NavigationActions } from 'react-navigation';

class AEDashBoard extends Component {

  constructor(props) {
    super(props);

  }

  _renderNavigator(){
    // return (<Text>DashBoardContent</Text>);
   return (<DashBoardTabNavigator></DashBoardTabNavigator>);
  }


  render() {
    return (
 
      <AEContainer  modalVisible={false}>
        <AEHeader>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
          <Title>Dashboard</Title>
        </AEHeader>
         {this._renderNavigator()}
       
      </AEContainer>

    );
  }
}

function bindActions(dispatch) {
	return {
		openDrawer: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
	};
}

const mapStateToProps = state => ({ 
 // isSpinner: state.ae.global.isSpinner
});

export default connect(mapStateToProps, bindActions)(AEDashBoard);   