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

class AEDashBoard extends Component {

  constructor(props) {
    super(props);

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
        <Content>
          <DashBoardTabNavigator></DashBoardTabNavigator>
         </Content> 
      </AEContainer>

    );
  }
}

function bindActions(dispatch) {
	return {
		openDrawer: () => dispatch(openDrawer()),
	};
}

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps, bindActions)(AEDashBoard);   