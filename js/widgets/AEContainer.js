/* @flow */
'use strict';

import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import {View as ViewNB ,Header,Content ,Footer }  from 'native-base';
import AEBaseComponent from './base/AEBaseComponent';
import _ from 'lodash';
import computeProps from '../utils/computeProps';
import  AEHeader  from './AEHeader';


export default class AEContainer extends AEBaseComponent {

  propTypes: {
        style : React.PropTypes.object
    }

  renderHeader() {
    if(Array.isArray(this.props.children)) {
      return _.find(this.props.children, function(item) {
        if(item && (_.get(item, 'type', null) == Header || _.get(item, 'type', null) == AEHeader)  ){
          return true;
        }
      });
    }

    else {
      if(this.props.children && _.get(this.props.children, 'type', null) == Header) {
        return this.props.children;
      }
    }
  }
  renderContent() {
    if(Array.isArray(this.props.children)) {

      return _.filter(this.props.children, function(item) {
        if(item && (_.get(item, 'type', null) == ViewNB || _.get(item, 'type', null) == Content || _.get(item, 'type', null) == Image || _.get(item, 'type', null) == View || _.get(item, 'type', null) == ScrollView  )) {

          return true;
        }
      });
    }

    else {
      if(this.props.children && (this.props.children.type == Content || this.props.children.type == ViewNB || this.props.children.type == View || this.props.children.type == Image || this.props.children.type == ScrollView)) {
        return this.props.children;
      }
    }
  }
  renderFooter() {
    if(Array.isArray(this.props.children)) {
      return _.find(this.props.children, function(item) {
        if(item && _.get(item, 'type', null) == Footer) {
          return true;
        }
      });
    }

    else {
      if(this.props.children && this.props.children.type == Footer) {
        return this.props.children;
      }
    }
  }
  prepareRootProps() {

    var type = {
      flex: 1
    }

    var defaultProps = {
      style: type
    }

    return computeProps(this.props, defaultProps);
  }
  render() {
      console.log("Inside rendering of AEContainer");
    return(
      <View ref={c => this._root = c} {...this.prepareRootProps()}>

        {this.renderHeader()}

        {this.renderContent()}

        {this.renderFooter()}

      </View>
    );

  }

}
