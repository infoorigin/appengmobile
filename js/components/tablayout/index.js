
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { Container, Title, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import AEContainer from '../../widgets/AEContainer';
import AEHeader from '../../widgets/AEHeader';
import AETabNavigator from './AETabNavigator';
import AECard from '../aecard';
import AEModalContent from '../../widgets/AEModalContent';
import AETabLayoutHeader from './AETabLayoutHeader';
import { putCENodeData, submitNodeData, submitCardNodeDataAction } from '../../actions/ce';
import { renderTabAction, updateCardUIDataAction } from '../../actions/layout';
import { gridDetailAction } from '../../actions/grid';
import { updateAttributes, getKeysByNode, getBindingIdByNodeId } from '../../utils/uiData'
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

        this.state = {
            isModalOpen:false
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
        return (<AETabLayoutHeader card={this.props.card} modalVisible={this.state.isModalOpen} {...this._headerCallBacks() }></AETabLayoutHeader>);
    }

    _renderModalContent(){
        return (
        <AEModalContent>
              <View> 
                <Text>Modal Content</Text>
                </View>
       </AEModalContent>
        );
    }

    _renderScene() {
        let card = this.props.card;
        let uiTab = card.activeTab;
        console.log("this.state.isModalOpen :",this.state.isModalOpen);
        if (uiTab) {
            return (
                <Content>
                    <AECard key={uiTab.configObjectId}
                        type="Card"
                        configObjectId={uiTab.configObjectId}
                        uiItems={card.ui.config}
                        uiCard={card.config}
                        nodeId={uiTab.compositeEntityNode ? uiTab.compositeEntityNode.configObjectId : null}
                        data={card.ui.data}
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
        this.props.updateCardUIData(this.props.card.config.configObjectId, nodeData);
        //TODO condition for inline save 
        if (!this.props.card.node.editFormId) {
            this.props.submitCardNodeData(this.props.card.config.configObjectId, nodeId, bindingId);
        }
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
            openMenu: this.props.openDrawer,
            onAddSave : this._onAddSave.bind(this),
            onCancelModal : this._onCancelModal.bind(this)
        };
    }
    _onGridSearch(searchText) {
        console.log(" _onGridSearch called ", searchText);
    }

    _onAdd() {
        console.log(" _onAdd with state change called ", this.refs);
         this.setState({
             isModalOpen : !this.state.isModalOpen
         });
    }

    _onAddSave() {
        console.log(" _onAdd Save ");
    }

     _onCancelModal() {
        console.log(" _onCancelModal ");
        this.setState({
             isModalOpen : false,
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
        console.log("this.props.card " + this.props.card.config);
        if (this.props.card.config) {
            console.log(" rendering AETabNavigator ... ")
            return (<AETabNavigator
                uiCard={this.props.card.config}
                activeTab={this.props.card.activeTab}
                onTabActive={this._setDataForScene}
                renderHeaderAndScene={this._renderHeaderAndScene}
                modalVisible={this.state.isModalOpen}
                renderModal={this._renderModalContent}
                >
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
        gridDetailAction: (keys, cardConfigId, gridConfigId, nodeId) => dispatch(gridDetailAction(keys, cardConfigId, gridConfigId, nodeId)),
        renderTabAction: (cardConfigId, tabConfigId, keys) => dispatch(renderTabAction(cardConfigId, tabConfigId, keys)),
        updateCardUIData: (cardConfigId, data) => dispatch(updateCardUIDataAction(cardConfigId, data)),
        submitCardNodeData: (cardConfigId, nodeId, bindingId) => dispatch(submitCardNodeDataAction(cardConfigId, nodeId, bindingId)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    config: state.ae.layout.config,
    basenode: state.ae.cenode.config,
    baseNodeKeys: state.ae.cenode.keys,
    card: state.ae.cards.length ? state.ae.cards[0] : {},
});

export default connect(mapStateToProps, bindAction)(AETabLayout); 
