/* @flow */
'use strict';

import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { View as ViewNB, Header, Content, Footer } from 'native-base';
import AEBaseComponent from './base/AEBaseComponent';
import _ from 'lodash';
import computeProps from '../utils/computeProps';
import AEHeader from './AEHeader';
import AEModal from './AEModal';
import AECard from '../components/aecard'


export default class AEContainer extends AEBaseComponent {

  propTypes: {
    style: React.PropTypes.object,
    modalVisible: React.PropTypes.boolean,
    onModalHide : React.PropTypes.func,
  }

  renderHeader() {
    console.log("renderHeader");
    if (Array.isArray(this.props.children)) {
      return _.find(this.props.children, function (item) {
        if (item && (_.get(item, 'type', null) == Header || _.get(item, 'type', null) == AEHeader)) {
          return true;
        }
      });
    }

    else {
      if (this.props.children && _.get(this.props.children, 'type', null) == Header) {
        return this.props.children;
      }
    }
  }
  renderContent() {
    console.log("renderContent");
    if (Array.isArray(this.props.children)) {

      return _.filter(this.props.children, function (item) {
        if (item && (_.get(item, 'type', null) == ViewNB || _.get(item, 'type', null) == Content
          || _.get(item, 'type', null) == Image || _.get(item, 'type', null) == View
          || _.get(item, 'type', null) == ScrollView || _.get(item, 'type', null) == AEModal)) {

          return true;
        }
      });
    }

    else {
      if (this.props.children && (this.props.children.type == Content || this.props.children.type == ViewNB
        || this.props.children.type == View || this.props.children.type == Image
        || this.props.children.type == ScrollView || _.get(item, 'type', null) == AEModal)) {
        return this.props.children;
      }
    }
  }
  renderFooter() {
    console.log("renderFooter");
    if (Array.isArray(this.props.children)) {
      return _.find(this.props.children, function (item) {
        if (item && _.get(item, 'type', null) == Footer) {
          return true;
        }
      });
    }

    else {
      if (this.props.children && this.props.children.type == Footer) {
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

  renderModal() {
    return (
      <AEModal
        offset={0}
        open={this.props.modalVisible}
        modalDidOpen={() =>this.props.onModalHide(false)}
        modalDidClose={() => this.props.onModalHide(true)}
        style={{ alignItems: 'center' }}>
      </AEModal>
    );
  }

  renderRegularScreen() {
    console.log("renderRegularScreen");
    let header = this.renderHeader();
    return (
      <View ref={c => this._root = c} {...this.prepareRootProps() }>

        {header}

        {this.renderContent()}

        {this.renderFooter()}

        {this.renderModal()}


      </View>



    )
  }

  render() {
    console.log("Inside renderRegularScreen of AEContainer  :", this.props.modalVisible);
    return this.renderRegularScreen();

  }

}
