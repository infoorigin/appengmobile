
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import AEContainer from '../../widgets/AEContainer';
import AEHeader from '../../widgets/AEHeader';
import AETabNavigator from './AETabNavigator' ;
import AECard from '../aecard';
import { putCENodeData, submitNodeData } from '../../actions/ce';
import {activeNodeGrid} from '../../actions/grid';
import { updateAttributes, getKeysByNode } from '../../utils/uiData'

import { openDrawer } from '../../actions/drawer';

class AETabLayout extends Component {  // eslint-disable-line

    static propTypes = {
        openDrawer: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTab : null,
        };
        this._renderHeaderAndScene = this._renderHeaderAndScene.bind(this);
        this._activetUITab = this._activetUITab.bind(this);
        this._uiTabCard = this._uiTabCard.bind(this);
        this._setDataForScene = this._setDataForScene.bind(this);


    }

    _activetUITab() {
        if( this.state.activeTab)
            return this.state.activeTab 
        else {
            let uiCard = this._uiTabCard();
            return uiCard.uitabs[0] ;
        }    
    }

    _uiTabById(tabConfigId){
         let uiCard = this._uiTabCard();
        return uiCard.uitabs.find((t) => t.configObjectId === tabConfigId)
    }

    componentDidMount() {
       this.setState({
           activeTab : this._activetUITab()
       });
    }

    _submitData() {

    }

    _setDataForScene(tabConfigId){
        console.log("OnTabSelect :",tabConfigId);
         // First fetch the data required for the rendering of this Tabs
        let uiTab = this._uiTabById(tabConfigId);
        let nodeId = uiTab.compositeEntityNode ? uiTab.compositeEntityNode.configObjectId :"";
        let data = {};
        let baseNodeKeys = getKeysByNode(this.props.baseNodeData, this.props.basenode.configObjectId).toJS();

        switch(uiTab.viewType){
            case "DataGrid" :
                if(nodeId){ // Grid for the node
                    console.log("send action to load griddata from node ");
                    this.props.activeNodeGrid(nodeId,baseNodeKeys )
                }
                else{ // Grid without node
                    // send action to load griddata by gridId
                }
                break;
            case "Form" :
            case "FormSection" :
                if(nodeId){
                    if(nodeId == this.props.basenode.configObjectId){
                        //do nothing basenode data already avlbl during mounting
                    }
                    else {
                        //send  action to get childnodedata
                    }
                }
                    break;
            default :
              console.log("Invalid or unsupported card viewtype :",uiTab.viewType);
        }

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

    _isBaseNodeId(nodeId){
        console.log("_isBaseNodeId :",nodeId === this.props.basenode.configObjectId,nodeId,this.props.basenode.configObjectId)
        return  nodeId === this.props.basenode.configObjectId ;
    }

    _getData(uiTab){
        switch(uiTab.viewType){
            case "DataGrid":
                return this.props.activeNode.grid.data;
            case "Form":
             let nodeId = uiTab.compositeEntityNode.configObjectId;
             if(this._isBaseNodeId(nodeId))
                return  this.props.baseNodeData;
             else
                return this.props.activeNode.data;   
        }

    }

    _renderScene(){
        let uiTab = this.state.activeTab;
        if (uiTab) {
            return (
                <Content>
                    <Text> Tabs Layout :{uiTab.configObjectId} </Text>
                    <Text> Node :{ uiTab.compositeEntityNode.configObjectId} </Text>
                    <AECard key={uiTab.configObjectId} 
                        type="Card"
                        configObjectId={uiTab.configObjectId} 
                        uiItems={uiTab.uiItems} 
                        uiCard={this._uiTabCard()}
                        nodeId={uiTab.compositeEntityNode ? uiTab.compositeEntityNode.configObjectId :"" }
                        data={this._getData(uiTab)} 
                        {...this._callBacks()}> 
                    </AECard>
                </Content>
            );
        }
        else {
            return (
                <Content>
                    <Text> ......loading </Text>
                </Content> 
            );  
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

    _callBacks(){
        return {
            onNodeDataChange : this._onNodeDataChange.bind(this),
            onUIBlur : this._onUIBlur.bind(this),
        };
    }

   _uiTabCard(){
        let card = this.props.config.uicard.find(function (card, i) {
            return card.viewType === "Tabs";
        });
        return card;
    }


    render() {
        console.log(" using AETabNavigator ");
        return <AETabNavigator 
                    uiCard={this._uiTabCard()}
                    activeTab={this.state.activeTab}
                    onTabActive={this._setDataForScene}
                    renderHeaderAndScene={this._renderHeaderAndScene}>  
                </AETabNavigator>
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        activeNodeGrid :(nodeId, keys) => dispatch(activeNodeGrid(nodeId, keys))

    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    config: state.ae.layout.config,
    basenode : state.ae.cenode.config,
    baseNodeData: state.ae.nodeData,
    activeNode : state.ae.activenode,
    // activenode : config
    //             : grid
    //                  :config
    //                   :data
});

export default connect(mapStateToProps, bindAction)(AETabLayout); 
