'use strict';

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AEBaseComponent from './base/AEBaseComponent';
import computeProps from '../utils/computeProps';
import AECard from '../components/aecard';
import { updateAttributes } from '../utils/uiData';
import {putModalData} from '../actions/modal';
import _ from 'lodash';


class AEModalContent extends AEBaseComponent {

  propTypes: {
      padder: React.PropTypes.bool,
      style : React.PropTypes.object,
      disableKBDismissScroll: React.PropTypes.bool
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
    let ui = this.props.modalUI;
    if(_.isEmpty(ui)) {
      return (<View></View>);
    }
    else {
      return (
        <AECard key={ui.configObjectId}
            type="Card"
            configObjectId={ui.configObjectId}
            uiItems={[ui]}
            nodeId={this.props.nodeId}
            data={this.props.data}
            user={this.props.user}
            {...this._callBacks() }>
        </AECard>
    );
    }
    
  }

  _onNodeDataChange(nodeId, bindingId, updateData) {
    console.log("Modal Data Change");
        let nodeData = updateAttributes(this.props.data, nodeId, bindingId, updateData);
        this.props.putModalData(nodeData);

    }
    _onUIBlur(nodeId, bindingId, updateData) {
        console.log("Modal Data Blur");
         let nodeData = updateAttributes(this.props.data, nodeId, bindingId, updateData);
        this.props.putModalData(nodeData);
    }
    _onGridDetail(keys, gridConfigId, nodeId) {
        console.log("_onGridDetail no implemented");
    }

  _callBacks() {
        return {
            onNodeDataChange: this._onNodeDataChange.bind(this),
            onUIBlur: this._onUIBlur.bind(this),
            onGridDetail: this._onGridDetail.bind(this),
        };
    }

  render() {

    const contentContainerStyle = this.props.contentContainerStyle || {};
    contentContainerStyle.padding = (this.props.padder) ? this.getTheme().contentPadding : 0;
    const modalUI = this._renderModalUI();
    console.log("Modal UI rendered with blank");
    return(
      <KeyboardAwareScrollView automaticallyAdjustContentInsets={false} ref={(c) => {this._scrollview = c; this._root = c;}} {...this.prepareRootProps()} contentContainerStyle={contentContainerStyle}>
        {modalUI}
      </KeyboardAwareScrollView>
    );
  }
}

function bindAction(dispatch) {
    return {
       putModalData: (data) => dispatch(putModalData(data)),
    };
}

const mapStateToProps = state => ({
    data : state.ae.modal.data,
});

export default connect(mapStateToProps, bindAction)(AEModalContent); 
