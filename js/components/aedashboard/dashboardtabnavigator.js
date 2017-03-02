/* @flow */
/* eslint-disable import/no-commonjs */

import React, { Component } from 'react';
import { Animated, View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { changeDashBoardTabIndex } from '../../actions/user';
import DashBoardTab from './dashboardtab';

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

  state = {
    index: 0,
    routes: this.props.cards.map(card => ({ key: card.config.configObjectId })),
  };

  _buildCoverFlowStyle = ({ layout, position, route, navigationState }) => {
    const { width } = layout;
    const { routes } = navigationState;
    const currentIndex = routes.indexOf(route);
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const translateOutputRange = inputRange.map(i => {
      return ((width * 0.25) * (currentIndex - i)) * -1;
    });
    const scaleOutputRange = inputRange.map(i => {
      if (currentIndex === i) {
        return 1;
      } else {
        return 0.7;
      }
    });
    const opacityOutputRange = inputRange.map(i => {
      if (currentIndex === i) {
        return 1;
      } else {
        return 0.8;
      }
    });

    const translateX = position.interpolate({
      inputRange,
      outputRange: translateOutputRange,
    });
    const scale = position.interpolate({
      inputRange,
      outputRange: scaleOutputRange,
    });
    const opacity = position.interpolate({
      inputRange,
      outputRange: opacityOutputRange,
    });

    return {
      transform: [
        { translateX },
        { scale },
      ],
      opacity,
    };
  };

  _handleChangeTab = (newIndex) => {
    console.log("On Tab Change", newIndex);
    this.setState({
      index: newIndex
    });
    this.props.onChangeIndex(newIndex);
  };

  _renderScene = (props) => {
   const card = this.props.cards[this.state.routes.indexOf(props.route)];
    
    let data = [];
    if (Math.abs(this.state.index - this.state.routes.indexOf(props.route)) < 2) {
      data = card.data
    }
    console.log("Render Tab  ", card.config.displayLabel, data);
   
    return (
      <Animated.View style={[styles.page, this._buildCoverFlowStyle(props)]}>
        <View style={styles.tab}>
          <DashBoardTab config={card.config} data={data}></DashBoardTab>
        </View>
      </Animated.View >
    );

  };

  _renderPager = (props) => {
    return  <TabViewPagerPan {...props} />;
  };

  render() {
    console.log("routes : ", this.state.routes);
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderPager={this._renderPager}
        renderScene={this._renderScene}
        onRequestChangeTab={this._handleChangeTab}
        initialLayout={initialLayout}
      />
    );
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
