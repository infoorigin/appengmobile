'use strict';

import React from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import AEBaseComponent from './base/AEBaseComponent';
import computeProps from '../utils/computeProps';
import { NO_PRIVILEGE, getPrivilege } from '../services/usercontext.js';

export default class AEModalActions extends AEBaseComponent {

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

  _renderProcessActions() {
    return this.props.processactions.map((a, i) => {
      return (
        <Button key={a.name + 'pa' + i} style={styles.action} block rounded onPress={() => this._onModalButtonClick(a.name)}>
          <Text>{a.name}</Text>
        </Button>);
    })
  }

  _renderButtons() {
    this.props.buttons.filter((b) => getPrivilege(b, this.props.user) != NO_PRIVILEGE)
      .map((b, i) => {
        return (
          <Button key={b.label + 'bt' + i} style={styles.action} block rounded onPress={() => this._onModalButtonClick(b.label)}>
            <Text>{b.label}</Text>
          </Button>
        );
      });
  }

  _defaultButtons() {
    return (
      [(
        <Button key={"cancel"} style={styles.cancel} block info rounded onPress={() => this._onModalButtonClick("cancel")}>
          <Text>Cancel</Text>
        </Button>
      )]
    );
  }

  _onModalButtonClick(action) {
    this.props.onModalAction(action);

  }

  render() {
    const contentContainerStyle = this.props.contentContainerStyle || {};
    contentContainerStyle.padding = (this.props.padder) ? this.getTheme().contentPadding : 0;
    let pabuttons = this._renderProcessActions();
    let configbuttons = this._renderButtons();
    let defbuttons = this._defaultButtons();
    return (<View style={styles.container}>
      {pabuttons.concat(configbuttons).concat(defbuttons)}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  action: {
    margin: 5,
    height: 50,
  },
  cancel: {
    marginHorizontal: 5,
    marginVertical: 20,
    height: 50,

  }
});
