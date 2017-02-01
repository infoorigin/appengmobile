
import React, { Component } from 'react';
import { View} from 'react-native';
import { connect } from 'react-redux';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import AEContainer from '../../widgets/AEContainer';
import AEHeader from '../../widgets/AEHeader';
import AETabNavigator from './AETabNavigator' ;
import AECard from '../aecard';
import { putCENodeData, submitNodeData } from '../../actions/ce';
import {renderTabAction} from '../../actions/layout';
import {gridDetailAction} from '../../actions/grid';
import { updateAttributes, getKeysByNode } from '../../utils/uiData'
import { openDrawer } from '../../actions/drawer';

import _ from 'lodash';

class AETabLayout extends Component {  // eslint-disable-line

    static propTypes = {
        openDrawer: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this._renderHeaderAndScene = this._renderHeaderAndScene.bind(this);
        this._setDataForScene = this._setDataForScene.bind(this);
    }

    componentDidMount() {
      
    }

    componentWillReceiveProps(nextProps) {
     
  }

    _submitData() {

    }

    _setDataForScene(tabConfigId){
        console.log("OnTabSelect :",tabConfigId);
        this.props.renderTabAction(tabConfigId, this.props.baseNodeKeys)
   }

   

     _renderHeaderAndScene(sceneprops){
         return [
           this._renderHeader(sceneprops),
           this._renderScene(sceneprops)
       ];
    }

    _renderHeader(sceneprops){
        return (
            <AEHeader>
                    <Title>Test Header</Title>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
             </AEHeader>
        )
    }
 
    _renderScene(){
        let card = this.props.card;
        let uiTab = card.activeTab;
        if(uiTab) {
            return (
                <Content>
                    <AECard key={uiTab.configObjectId} 
                        type="Card"
                        configObjectId={uiTab.configObjectId} 
                        uiItems={card.ui.config} 
                        uiCard={card.config}
                        nodeId={uiTab.compositeEntityNode ? uiTab.compositeEntityNode.configObjectId :null }
                        data={card.ui.data} 
                        {...this._callBacks()}> 
                    </AECard>
                </Content>
            );
        }
        else {
            return (<Content> <Text> ..... loading </Text> </Content>); 
        }
        

           
    }


    _onNodeDataChange(nodeId, bindingId, updateData){
        console.log("layoutchange _onNodeDataChange ",nodeId, bindingId, updateData);
        //let nodeData = updateAttributes(this.props.data, nodeId, bindingId, updateData);
       // this.props.updateNodeData(nodeData);
        
    }

     _onUIBlur(nodeId, bindingId, updateData){
        console.log("layoutchange _onUIBlur",nodeId, bindingId, updateData);
       // let nodeData = updateAttributes(this.props.data, nodeId, bindingId, updateData);
       // this.props.submitNodeData(nodeId, bindingId,nodeData);
    }

    _onGridDetail(keys, gridConfigId, nodeId){
        let cardConfigId = this.props.card.config.configObjectId ;
        this.props.gridDetailAction(keys, cardConfigId, gridConfigId, nodeId);
        console.log(" _onGridDetail params ", keys, cardConfigId, gridConfigId, nodeId);
    }

    _callBacks(){
        return {
            onNodeDataChange : this._onNodeDataChange.bind(this),
            onUIBlur : this._onUIBlur.bind(this),
            onGridDetail : this._onGridDetail.bind(this),
        };
    }

    render() {
        console.log("this.props.card "+this.props.card.config);
        if(this.props.card.config) {
            console.log(" rendering AETabNavigator ... ")
            return (<AETabNavigator 
                        uiCard={this.props.card.config}
                        activeTab={this.props.card.activeTab}
                        onTabActive={this._setDataForScene}
                        renderHeaderAndScene={this._renderHeaderAndScene}>  
                    </AETabNavigator>
            );
        }
        else {
            console.log(" rendering loading without space ... ")
             return (<AEContainer>
                          <AEHeader></AEHeader> 
                          <Content>
                            <View>
                                <Text>Loading ..</Text>
                            </View>
                        </Content>
                        <Footer></Footer>
                    </AEContainer>
             );
        }
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        gridDetailAction : (keys, cardConfigId, gridConfigId, nodeId) => dispatch(gridDetailAction(keys, cardConfigId, gridConfigId, nodeId)),
        renderTabAction :(tabConfigId, keys) => dispatch(renderTabAction(tabConfigId, keys))

    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    config: state.ae.layout.config,
    basenode : state.ae.cenode.config,
    baseNodeKeys : state.ae.cenode.keys,
    card : state.ae.cards.length ? state.ae.cards[0] : {},
});

export default connect(mapStateToProps, bindAction)(AETabLayout); 
