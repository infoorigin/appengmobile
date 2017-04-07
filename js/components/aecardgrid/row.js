import React, { Component } from 'react';
import { Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {  View, Text, Header, Title, Icon } from 'native-base';

import { NumericCell, TextCell } from './cell.js';
import styles from './styles';
import { NO_PRIVILEGE, getPrivilege } from '../../services/usercontext.js';
import AEBaseComponent from '../../widgets/base/AEBaseComponent'

const rightArrowImage = require('../../../img/Icon-Arrow-Right.png');

export default class GridRow extends AEBaseComponent {

    static propTypes = {
        keyValue: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.recordClicked = this.recordClicked.bind(this);
        this.getInitialStyle = this.getInitialStyle.bind(this);
    }

   
    getInitialStyle() {

        return {
           
            listItemDivider: {
                //{flex:1, flexDirection:'row',alignItems:'center'}
                borderBottomWidth: this.getTheme().borderWidth,
                height: this.getTheme().listItemHeight,
                padding: this.getTheme().listItemPadding,
                backgroundColor: this.getTheme().listDividerBg,
                justifyContent:  'flex-start',
                flexDirection: 'row',
                borderColor: this.getTheme().listBorderColor
            }
        }
    }


    recordClicked() {
        const action = this.props.actions[0]
        const keys = this._keys();
        this.props.onGridAction(action, keys);
    }

    getElementsWithPrivilege() {
        let filteredColumns = this.props.header.filter(function (gcolumn) {
           return getPrivilege(gcolumn) != NO_PRIVILEGE ;
        }.bind(this));
        return filteredColumns;
    }

    _keys() {
        let rowKeyData = this.props.keyColumns
            .filter(function (gc) {
                return gc.logicalColumn.dbColumn.primaryKey;
            })
            .map(function (gc) {
                let val = this.props.data[gc.logicalColumn.dbColumn.code];
                return { primaryKey: val, [gc.logicalColumn.dbColumn.code]: val }
            }.bind(this));
        rowKeyData = rowKeyData.length ? rowKeyData[0] : {};
        let keyCoulumns = this.props.keyColumns
            .filter(function (gc) {
                return gc.logicalColumn.dbColumn.key;
            })
            .forEach(function (gc) {
                let newKey = { [gc.logicalColumn.dbColumn.code]: this.props.data[gc.logicalColumn.dbColumn.code] }
                Object.assign(rowKeyData, newKey);
            }.bind(this));
        return rowKeyData;
    }

    componentDidMount() {

    }

    _defaultProps() {
        return {
            style: this.getInitialStyle().listItemDivider
        };
    }

    _rowActions(){
        if(this.props.actions && this.props.actions.length == 1){
            return (
                <TouchableOpacity style={styles.gridRowDetailLink} onPress={this.recordClicked}>
                        <Image source={rightArrowImage} style={styles.gridRowDetailLinkImage}></Image>
                    </TouchableOpacity>
            );
        }
        else
            return null;
    
    }

    render() {
       
        return (
            <View style={styles.gridRow}>
                <View style={styles.gridRowData}>
                    {this.getElementsWithPrivilege().map(function (cellDetail, key) {
                        switch (cellDetail.logicalColumn.datatype) {
                            case 'NUMBER':
                                return (
                                    <View key={key} style={styles.gridCell}>
                                        <Text style={styles.gridLabel}> {cellDetail.headerName}:</Text>
                                        <Text style={styles.gridText}> {this.props.data[cellDetail.logicalColumn.dbColumn.code]}</Text>
                                    </View>
                                );

                            default:
                                return (
                                    <View key={key} style={styles.gridCell}>
                                        <Text style={styles.gridLabel}> {cellDetail.headerName}:</Text>
                                        <Text style={styles.gridText}> {this.props.data[cellDetail.logicalColumn.dbColumn.code]}</Text>
                                    </View>
                                );
                        }

                    }.bind(this))}
                </View>
                
                { this._rowActions() }
                
            </View>



        );
    }

}
