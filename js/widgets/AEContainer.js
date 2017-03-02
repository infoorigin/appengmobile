/* @flow */
'use strict';

import React from 'react';
import { View, Image, ScrollView, TouchableHighlight, Text,  Modal} from 'react-native';
import { View as ViewNB, Header, Content, Footer } from 'native-base';
import AEBaseComponent from './base/AEBaseComponent';
import _ from 'lodash';
import computeProps from '../utils/computeProps';
import AEHeader from './AEHeader';
import AEModal from './AEModal';
import AEModalContent from './AEModalContent';
import AECard from '../components/aecard';
import AEGridContainer from '../components/aedatagrid/container';
import AETabLayoutHeader from '../components/tablayout/AETabLayoutHeader';


export default class AEContainer extends AEBaseComponent {

  propTypes: {
    style: React.PropTypes.object,
    modalVisible: React.PropTypes.boolean,
    onModalHide : React.PropTypes.func,
  }

  
  constructor(props) {
      super(props);

      this.state = {
         modalVisible: true,
      }
  }

  renderHeader() {
    console.log("Render Header");
    if (Array.isArray(this.props.children)) {
      return _.find(this.props.children, function (item) {
        if (item && (_.get(item, 'type', null) == Header || _.get(item, 'type', null) == AEHeader
        || _.get(item, 'type', null) == AETabLayoutHeader )) {
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

  renderModalContent() {
    if (Array.isArray(this.props.children)) {

      return _.filter(this.props.children, function (item) {
        if (item && _.get(item, 'type', null) == AEModalContent) {
          return true;
        }
      });
    }

    else {
      if (this.props.children && (this.props.children.type == AEModalContent )) {
        return this.props.children;
      }
    }
  }

  renderContent() {
    if (Array.isArray(this.props.children)) {

      return _.filter(this.props.children, function (item) {
        if (item && (_.get(item, 'type', null) == ViewNB || _.get(item, 'type', null) == Content
          || _.get(item, 'type', null) == Image || _.get(item, 'type', null) == View
          || _.get(item, 'type', null) == ScrollView || _.get(item, 'type', null) == AEModal)
          || _.get(item, 'type', null) == AEGridContainer) {

          return true;
        }
      });
    }

    else {
      if (this.props.children && (this.props.children.type == Content || this.props.children.type == ViewNB
        || this.props.children.type == View || this.props.children.type == Image
        || this.props.children.type == ScrollView || _.get(item, 'type', null) == AEModal
        || _.get(item, 'type', null) == AEGridContainer )) {
        return this.props.children;
      }
    }
  }
  renderFooter() {
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
    let content = this.renderModalContent();
    let modalContent = this.props.modalVisible ? [this.renderHeader(), content] : (<AEModalContent></AEModalContent>) ;
    return (
      <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {console.log("Modal Closed")}}
       >
          { modalContent }
       </Modal>
    );
  }

  renderRegularScreen() {
    return (
      <View ref={c => this._root = c} {...this.prepareRootProps() }>

        {this.renderHeader()}

        {this.renderContent()}

        {this.renderFooter()}

        {this.renderModal()}


      </View>



    )
  }

  render() {
   return this.renderRegularScreen();

  }

}
