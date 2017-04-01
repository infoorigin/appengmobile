'use strict';

import React from 'react';
import { View,StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AEBaseComponent from './base/AEBaseComponent';
import computeProps from '../utils/computeProps';
import AECard from '../components/aecard';
import { updateAttributes } from '../utils/uiData';
import {putModalData} from '../actions/modal';
import _ from 'lodash';


class AEModalActions extends AEBaseComponent {

  propTypes: {
      padder: React.PropTypes.bool,
      style : React.PropTypes.object,
      disableKBDismissScroll: React.PropTypes.bool
    }

    constructor(props) {
        super(props);
        this._onModalButtonClick = this._onModalButtonClick.bind(this);
    }

  prepareRootProps() {

    var type = {
      backgroundColor: 'transparent',
      flex: 1
    }

    var defaultProps = {
      style: type,
      resetScrollToCoords: (this.props.disableKBDismissScroll) ? null : {
        x: 0,
        y: 0
      }
    }

    return computeProps(this.props, defaultProps);
  }

  _renderModalUI(){
     return (<View style={styles.container}>
                 <Button style={styles.action} block rounded onPress={() => this._onModalButtonClick("light")}>
                    <Text>Light</Text>
                </Button>
                <Button style={styles.action} block rounded onPress={() => this._onModalButtonClick("primary")}>
                    <Text>Primary</Text>
                </Button>
                <Button style={styles.cancel} block rounded  info onPress={() => this._onModalButtonClick("cancel")}>
                    <Text>Cancel</Text>
                </Button>
            </View>
            );
 }

  _onModalButtonClick(action) {
    console.log("Modal button click 2 ", action);
    this.props.onModalAction();   

    }
    
  render() {

    console.log(" AE Button Action Modal");
    const contentContainerStyle = this.props.contentContainerStyle || {};
    contentContainerStyle.padding = (this.props.padder) ? this.getTheme().contentPadding : 0;
    return(
      this._renderModalUI()
    );
  }
}

function bindAction(dispatch) {
    return {
       
    };
}

const mapStateToProps = state => ({
   
});

export default connect(mapStateToProps, bindAction)(AEModalActions); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  action : {
    margin : 5,
    height: 50,
  },
  cancel : {
    marginHorizontal : 5,
    marginVertical : 20,
    height: 50,
    
  }
});
