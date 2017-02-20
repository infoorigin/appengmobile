
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel as REFormLabel, FormInput as REFormInput, Card as RECard, Button as REButton } from 'react-native-elements';
import { CheckBox as NBCheckBox, Card as NBCard, CardItem as NBCardItem, Text as NBText } from 'native-base';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';
import AECardGrid from '../aecardgrid';
import { getBindingIdByNodeId, getDataByBindingId, getAllBindingIdsForNodeId } from '../../utils/uiData';



export default class DashBoardTab extends AEBaseComponent {  // eslint-disable-line

  static propTypes = {


  }

  constructor(props) {
    super(props);

    this._gridCallBacks = this._gridCallBacks.bind(this);
  }
  getInitialStyle() {
    return {
      itemText: {
        fontSize: 15,
        color: this.getContextForegroundColor(),
        flex: 1
      },
      dividerItemText: {
        fontSize: 17,
        textAlign: 'left',
        fontWeight: '500',
        color: this.getContextForegroundColor(),
        flex: 1,
        paddingLeft: 10,
        backgroundColor: 'transparent'
      }
    };
  }

  _onGridDetail(keys, gridConfigId) {
    this.props.onGridDetail(keys, gridConfigId, this.props.nodeId);
  }


  _gridCallBacks() {
    return {
      onGridDetail: this._onGridDetail.bind(this),
    };
  }


  _renderGrid(grid) {
    return (<AECardGrid searchText="" key={grid.configObjectId} config={grid} data={this.props.data} {...this._gridCallBacks() }> </AECardGrid>);
  }

  _renderTab() {
    switch (this.props.config.cardType) {
      case "Grid":
        return this._renderGrid(this.props.config.grid);
      default:
        console.log("Invalid or unsupported view Item Type in Card Renderer", this.props.config.cardType);
        return null;
    }

  }

  render() {
    return (
      
        <RECard containerStyle={{  marginHorizontal : 0, marginVertical : 5 }} titleStyle={this.getInitialStyle().dividerItemText}
          title={this.props.config.displayLabel}>
          {this._renderTab()}
        </RECard>
     
    );
  }
}


