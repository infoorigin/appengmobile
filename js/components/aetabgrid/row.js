import React, { Component } from 'react';
import { Image, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, View, H3, Text, Header, Title, Icon, Card, CardItem, List, ListItem } from 'native-base';

import { NumericCell, TextCell } from './cell.js';
import styles from './styles';
import { getPrivilege } from '../../services/usercontext.js';

import { RENDER_GRID_DETAIL, gridAction } from '../../actions/grid';
import { RENDER_LAYOUT } from '../../actions/layout';
import * as ceActions from '../../actions/ce.js';

const rightArrowImage = require('../../../img/Icon-Arrow-Right.png');

export default class GridRow extends Component {

    static propTypes = {
        keyValue: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.recordClicked = this.recordClicked.bind(this);
    }


    recordClicked() {
        let keys = this._keys();
        console.log('Key Selected----', keys);
        this.props.onGridDetail(keys);
    }

    getElementsWithPrivilege() {
        let filteredColumns = this.props.header.filter(function (gcolumn) {
            if (getPrivilege(gcolumn).privilegeType) {
                return true;
            }
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

                <TouchableOpacity style={styles.gridRowDetailLink} onPress={this.recordClicked}>
                    <Image source={rightArrowImage} style={styles.gridRowDetailLinkImage}></Image>
                </TouchableOpacity>

            </View>



        );
    }

}
