/* @flow */
'use strict';

import React from 'react';
import {Text, View, Platform } from 'react-native';
import AEBaseComponent from './base/AEBaseComponent';


export default class AESubtitle extends AEBaseComponent {

  render() {
    return(
      <View><Text ref={c => this._root = c} style={{color: this.getTheme().subtitleColor , fontSize: this.getTheme().subTitleFontSize, alignSelf: (Platform.OS === 'ios' ) ? 'center' : 'flex-start'}}>{this.props.children}</Text></View>
    );
  }
}
