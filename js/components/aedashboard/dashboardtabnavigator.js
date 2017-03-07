/* @flow */
/* eslint-disable import/no-commonjs */

import React, { Component } from 'react';
import { Animated, View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changeDashBoardTabIndex } from '../../actions/user';
import DashBoardTab from './dashboardtab';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {
    flex: 1,
    //   backgroundColor: 'lightblue',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tab: {
    width: width * 0.85,
    // height: height * 0.85,
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
    },

  },

  album: {
    backgroundColor: 'lightblue',
    width: width * 0.85,
    height: height * 0.85,
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
    },
  },
  cover: {
    width: width * 0.85,
    height: height * 0.85,
  },
  label: {
    margin: 16,
    color: '#fff',
  },
});


const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class DashBoardTabNavigator extends Component {

  static title = 'Coverflow';
  static appbarElevation = 0;

  static propTypes = {
    style: View.propTypes.style,
  };

  
  _onChangeTab = (tab) => {
    
  };

  _renderTabs() {
    return this.props.cards.map((card,i) => {
      const data = card.data && card.data.length ? card.data :[] ;
      return  <DashBoardTab key={"DashBoardTab-"+i} tabLabel={card.config.displayLabel} config={card.config} ></DashBoardTab> 
    })
  }

  render() {
    
    return (
    <ScrollableTabView
      onChangeTab = {this._onChangeTab}
      tabBarPosition ="bottom"
      renderTabBar={() => <ScrollableTabBar />}    >
      {this._renderTabs()}
    </ScrollableTabView> );
    
  }
}

function bindActions(dispatch) {
  return {
    onChangeIndex: (newIndex) => dispatch(changeDashBoardTabIndex(newIndex)),
  };
}

const mapStateToProps = state => ({
  cards: state.ae.dashboard.cards,
});

export default connect(mapStateToProps, bindActions)(DashBoardTabNavigator);   
