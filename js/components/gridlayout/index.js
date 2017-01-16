
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import AEContainer from '../../widgets/AEContainer';
import AEHeader from '../../widgets/AEHeader';
import AECard from '../aecard';
import {putCENodeData } from '../../actions/ce';
import {updateAttributes} from '../../utils/uiData'

import { openDrawer } from '../../actions/drawer';

class AEGridLayout extends Component {  // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

// Antipattern ?? http://stackoverflow.com/questions/28785106/reactjs-why-is-passing-the-component-initial-state-a-prop-an-anti-pattern
    this.state = {
      data:this.props.data,
    }

    this._callBacks = this._callBacks.bind(this);
  }

  componentDidMount() {
    console.log("data :" + this.props.data);
  }

   _onNodeDataChange(nodeId, bindingId, updateData){
        console.log("layoutchange _onNodeDataChange ",nodeId, bindingId, updateData);
        let nodeData = updateAttributes(this.props.data, nodeId, bindingId, updateData);
        this.props.updateNodeData(nodeData);
        
    }

     _onUIBlur(nodeId, bindingId, updateData){
        console.log("layoutchange _onUIBlur",nodeId, bindingId, updateData);
        let nodeData = updateAttributes(this.props.data, nodeId, bindingId, updateData);
        this.props.updateNodeData(nodeData);
    }

    _callBacks(){
        return {
            onNodeDataChange : this._onNodeDataChange.bind(this),
            onUIBlur : this._onUIBlur.bind(this),
        };
    }

  _renderUICards() {
    let uiCards = this.props.config.uicard.map(function(card){
        return (<AECard key={card.configObjectId} basenode={this.props.basenode}  config={card} data={this.props.data} {...this._callBacks()}> </AECard>);
     }.bind(this))
   return uiCards;
  }

  _handleDataChanges(){

  }

  _submitData(){

  }

  render() {
    return (
      <AEContainer>
        <AEHeader>
          <Title>GridLayout with AECard Config And Data</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </AEHeader>

        <Content>
          {this._renderUICards()}
        </Content>
      </AEContainer>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    updateNodeData: (nodeData) => dispatch(putCENodeData(nodeData))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  config: state.ae.layout.config,
  basenode : state.ae.cenode.config,
  data: state.ae.nodeData,
});

export default connect(mapStateToProps, bindAction)(AEGridLayout);
