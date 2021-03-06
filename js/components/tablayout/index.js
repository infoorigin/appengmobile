
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import {  NavigationActions } from 'react-navigation';
import _ from 'lodash';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import AEContainer from '../../widgets/AEContainer';
import AEHeader from '../../widgets/AEHeader';
import AETabNavigator from './AETabNavigator';
import AECard from '../aecard';
import AEModalContent from '../../widgets/AEModalContent';
import AEModalActions from '../../widgets/AEModalActions';
import AETabLayoutHeader from './AETabLayoutHeader';
import { putCENodeData, submitNodeData, submitCardNodeDataAction } from '../../actions/ce';
import { renderTabAction, updateCardUIDataAction,submitLayoutAction } from '../../actions/layout';
import {modalAddUIAction, resetModalAction, saveModalAction} from '../../actions/modal';
import { gridDetailAction } from '../../actions/grid';
import { updateAttributes, getKeysByNode, getBindingIdByNodeId } from '../../utils/uiData'

class AETabLayout extends Component {  // eslint-disable-line

    static propTypes = {
        openDrawer: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this._renderHeaderAndScene = this._renderHeaderAndScene.bind(this);
        this._setDataForScene = this._setDataForScene.bind(this);
        this._renderModalContent = this._renderModalContent.bind(this);
        this._renderModalAction = this._renderModalAction.bind(this);
        this.state = {
            isModalActionVisible : false,
            searchText: ""
        }

    }

    componentDidMount() {

    }
    _submitData() {

    }
    _setDataForScene(tabConfigId) {
        console.log("OnTabSelect :", tabConfigId);
        let cardConfigId = this.props.card.config.configObjectId;
        this.props.renderTabAction(cardConfigId, tabConfigId, this.props.baseNodeKeys)
    }
    _renderHeaderAndScene(sceneprops) {
        return [
            this._renderHeader(sceneprops),
            this._renderScene(sceneprops)
        ];
    }
    _renderHeader(sceneprops) {
        
        // TO do chnage the API of CE Node for display name 
        let title = this.props.card.node.name ? this.props.card.node.name : "";
        return (<AETabLayoutHeader ref={(c) => this.tabHeader = c}  card={this.props.card} modalVisible={this.props.isModalVisible} {...this._headerCallBacks() }></AETabLayoutHeader>);
    }
    
    _onModalAction(action){
        console.log("_onModalAction for other actions :",action);
        const card = this.props.card;
        
        if(action != "cancel"){
            let uiBindingId = getBindingIdByNodeId(card.ui.data, this.props.basenode.configObjectId);
            console.log(uiBindingId);
            this.props.submitLayoutAction(card.config.configObjectId, this.props.basenode.configObjectId, uiBindingId, action);
        }
        
        this.setState({
            isModalActionVisible:false
        });
    }

    _renderModalAction(){
        return (
        <AEModalActions buttons={this.props.buttons} processactions={this.props.processactions} onModalAction={this._onModalAction.bind(this)} ></AEModalActions>
        );
    }

    _renderModalContent(){
      let nodeId = this.props.card.node.configObjectId;
        return (
        <AEModalContent modalUI={this.props.modalUI} nodeId={nodeId} user={this.props.user}>
              <View> 
                <Text>Modal Content</Text>
                </View>
       </AEModalContent>
        );
    }

    _renderScene() {
        let card = this.props.card;
        let uiTab = card.activeTab;
        if (uiTab) {
            return (
                <Content>
                    <AECard key={uiTab.configObjectId}
                        type="Card"
                        configObjectId={uiTab.configObjectId}
                        uiItems={card.ui.config}
                        searchText={this.state.searchText}
                        uiCard={card.config}
                        nodeId={uiTab.compositeEntityNode ? uiTab.compositeEntityNode.configObjectId : null}
                        data={card.ui.data}
                        user={this.props.user}
                        {...this._callBacks() }>
                    </AECard>

                </Content>
            );
        }
        else {
            return (<Content> <Text> ..... loading </Text> </Content>);
        }
    }
    _onNodeDataChange(nodeId, bindingId, updateData) {
        console.log("layoutchange _onNodeDataChange ", nodeId, bindingId, updateData);
        let nodeData = updateAttributes(this.props.card.ui.data, nodeId, bindingId, updateData);
        this.props.updateCardUIData(this.props.card.config.configObjectId, nodeData);

    }
    _onUIBlur(nodeId, bindingId, updateData) {
        console.log("layoutchange _onUIBlur", nodeId, bindingId, updateData);
        let nodeData = updateAttributes(this.props.card.ui.data, nodeId, bindingId, updateData);
        this.props.submitCardNodeData(this.props.card.config.configObjectId, nodeId, bindingId, nodeData, "update");
    }
    _onGridDetail(keys, gridConfigId, nodeId) {
        let cardConfigId = this.props.card.config.configObjectId;
        let mergedKeys = update(this.props.baseNodeKeys, { $merge: keys });
        this.props.gridDetailAction(mergedKeys, cardConfigId, gridConfigId, nodeId);
    }
    _headerCallBacks() {
        return {
            onGridSearch: this._onGridSearch.bind(this),
            onAdd: this._onAdd.bind(this),
            onSave: this._onSave.bind(this),
            onEnableModalAction : this._onEnableModalAction.bind(this),
            openMenu: this.props.openDrawer,
            onAddSave : this._onAddSave.bind(this),
            onCancelModal : this._onCancelModal.bind(this)
        };
    }
    _onGridSearch(searchText) {
        console.log(" Refs headerText ", searchText);
        this.setState({searchText});
    }

    _onAdd() {
        let nodeId = this.props.card.node.configObjectId;
        console.log(" _onAdd modalAddUI ", nodeId);
        this.props.modalAddUI(nodeId, this.props.baseNodeKeys);
    }

    _onAddSave() {
        console.log(" _onAdd Save ");
        let cardConfigId = this.props.card.config.configObjectId;
        let nodeId = this.props.card.node.configObjectId;
        this.props.saveModal(cardConfigId,nodeId);
        // cancel modal and refresh data action
    }

     _onCancelModal() {
        console.log(" _onCancelModal ");
        this.props.resetModal();
    }

    _onEnableModalAction(){
         this.setState({
            isModalActionVisible : true
         });
    }

    _onSave() {
        console.log(" _onSave called ");
        let cardConfigId = this.props.card.config.configObjectId;
        this.props.submitCardNodeData(cardConfigId, this.props.card.node.configObjectId, null);
    }

    _callBacks() {
        return {
            onNodeDataChange: this._onNodeDataChange.bind(this),
            onUIBlur: this._onUIBlur.bind(this),
            onGridDetail: this._onGridDetail.bind(this),
        };
    }

    render() {
        if (this.props.card && this.props.card.config) {
            return (<AETabNavigator
                uiCard={this.props.card.config}
                activeTab={this.props.card.activeTab}
                onTabActive={this._setDataForScene}
                renderHeaderAndScene={this._renderHeaderAndScene}
                modalVisible={this.props.isModalVisible}
                renderModal={this._renderModalContent}
                renderModalAction = {this._renderModalAction}
                modalActionVisible={this.state.isModalActionVisible}
                >
            </AETabNavigator>
           
            );
        }
        else {
            console.log(" rendering loading without space ... ")
            return (
            <AEContainer modalVisible={false}>
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
        openDrawer: () => dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' })),
        gridDetailAction: (keys, cardConfigId, gridConfigId, nodeId) => dispatch(gridDetailAction(keys, cardConfigId, gridConfigId, nodeId)),
        renderTabAction: (cardConfigId, tabConfigId, keys) => dispatch(renderTabAction(cardConfigId, tabConfigId, keys)),
        updateCardUIData: (cardConfigId, data) => dispatch(updateCardUIDataAction(cardConfigId, data)),
        submitCardNodeData: (cardConfigId, nodeId, bindingId, nodedata, apiAction) => dispatch(submitCardNodeDataAction(cardConfigId, nodeId, bindingId, nodedata,apiAction)),
        submitLayoutAction: (cardConfigId, nodeId, bindingId, apiAction) => dispatch(submitLayoutAction(cardConfigId, nodeId, bindingId, apiAction)),
        modalAddUI: (nodeId, baseKeys) => dispatch(modalAddUIAction(nodeId, baseKeys)),
        resetModal : () => dispatch(resetModalAction()),
        saveModal : (cardConfigId, nodeId) => dispatch(saveModalAction(cardConfigId, nodeId)),
         
    };
}

const mapStateToProps = state => ({
    config: state.ae.layout.config,
    basenode: state.ae.cenode.config,
    baseNodeKeys: state.ae.cenode.keys,
    card: state.ae.cards[0],
    modalUI : state.ae.modal.ui,
    isModalVisible : state.ae.modal.visible,
    isModalActionVisible : false,//state.ae.modal.actionvisible,
    processactions : state.ae.cenode.processactions,
    buttons : state.ae.cenode.buttons,
    user : state.ae.userSession.user,
});

export default connect(mapStateToProps, bindAction)(AETabLayout); 
