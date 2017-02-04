import React, { Component } from 'react';
import { View } from 'react-native';
import update from 'immutability-helper';
import { Title, Button, Icon, Text, InputGroup, Input } from 'native-base';
import AEHeader from '../../widgets/AEHeader';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';
import _ from 'lodash';


export default class AETabLayoutHeader extends AEBaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isSearchHeader: false
        }
    }

    _renderGridSearchHeader() {
        return (
            <AEHeader searchBar="true">
                <InputGroup>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" onChangeText={this.props.onGridSearch} />
                </InputGroup>

                <Button transparent onPress={() => this.setState({ isSearchHeader: false })}>
                    Cancel
				</Button>
            </AEHeader>
        );
    }

    _renderGridTitleHeader() {
        //TODO Change this
        let title = this.props.card.node.name ? this.props.card.node.name : "";
        return (
            <AEHeader>
                <Button transparent onPress={this.props.openMenu}>
                    <Icon name="ios-menu" />
                </Button>
                <Title>{title}</Title>
                <Button transparent onPress={() => this.setState({ isSearchHeader: true })}>
                    <Icon name="ios-search" />
                </Button>
                <Button transparent onPress={this.props.onAdd}>
                    <Icon name="md-add" />
                </Button>
            </AEHeader>
        );
    }

    _renderFormHeader() {
        //TODO Change this
        let title = this.props.card.node.name ? this.props.card.node.name : "";
        let buttons = [];
        buttons.push(
            <Button key="menu" transparent onPress={this.props.openMenu}>
                    <Icon name="ios-menu" />
            </Button>
        );
        //TODO create new attribute for inline save option
        if(this.props.card.node.editFormId) {
            buttons.push(
                <Button key="save" transparent onPress={this.props.onSave}>
                        Save
                </Button>
            );
        }
        return (
            <AEHeader>
                <Title>{title}</Title>
                {buttons}
            </AEHeader>
        );
    }

    _renderModalHeader(){
        let title = this.props.card.node.name ? this.props.card.node.name : "";
        return (
            <AEHeader>
                <Button transparent onPress={this.props.onCancelModal}>
                    <Icon name="md-close" />
                </Button>
                <Title>{title}</Title>
                <Button transparent onPress={this.props.onAddSave}>
                    Save
                </Button>
        </AEHeader>
        );
    }

    _renderUIHeader(uiItem) {
        let title = "";
        if(this.props.modalVisible){
            return this._renderModalHeader();
        }

        switch (uiItem.configObjectType) {
            case "FormSection":
            case "Form":
                return this._renderFormHeader();
            case "DataGrid":
                return this.state.isSearchHeader ? this._renderGridSearchHeader() : this._renderGridTitleHeader();
            default:
                console.log("Invalid or unsupported view Item Type in Card Renderer", uiItem.configObjectType);
        }
    }

    render() {
        let card = this.props.card;
        let uiItem = card.ui.config && card.ui.config.length ? card.ui.config[0] : null;
        let header = uiItem ? this._renderUIHeader(uiItem) : <AEHeader />;

        return header;
    }


}
