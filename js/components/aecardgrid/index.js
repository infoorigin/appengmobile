import React, { Component } from 'react';
import {Dimensions, StyleSheet, Modal, Image, TouchableHighlight, Alert, ListView } from 'react-native';
import { View, Text, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';

import GridRow from './row';
import uuid from 'uuid';
const contentscreenBg = require('../../../img/basescreen.png');
import { getPrivilege } from '../../services/usercontext.js';
import {gridAction, configToStandardGridAction, NEW_CE_RENDER_BASE_GRID} from '../../actions/grid';
import {RENDER_LAYOUT_FOR_CE} from '../../actions/layout';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {
    //height: height*0.8,
 //   backgroundColor: 'lightblue',
  },
});

class AECardGrid extends AEBaseComponent {
    static propTypes = {
        config: React.PropTypes.object,
        data: React.PropTypes.array,
    }

    constructor(props) {
        super(props);
        this._onGridAction = this._onGridAction.bind(this);

    }

    _gridHeader() {
        let headerdata = this.props.config.gridColumns;
         // Skip the action columns which are not mapped to logical columns
        headerdata = headerdata.filter(function (d) { return  d.visible && d.logicalColumn && d.logicalColumn.dbColumn ; });
        
        headerdata = headerdata.sort(function (d1, d2) {
            if (d1.order > d2.order) {
                return 1;
            } else if (d1.order < d2.order) {
                return -1;
            } else {
                return 0;
            }
        });
        headerdata.forEach(function (d) { console.log(d.headerName, d.visible) });
        return headerdata;
    }

    _keyColumns() {
        let keyColunms = this.props.config.gridColumns.filter(function (gc) {
            return gc.logicalColumn.dbColumn.primaryKey | gc.logicalColumn.dbColumn.key;
        });
        return keyColunms;
    }

    _rowActions(){
        let actions = this.props.config.gridColumns
                        .filter(function (d) { return  d.actionColoum && d.visible; })
                        .map(function (d) { 
                            return {
                                type : configToStandardGridAction(RENDER_LAYOUT_FOR_CE),
                                target : d.goToLink,
                                icon : d.icon,
                                actionColumnType : d.actionColoumType,
                                targetConfig : d.goToLink,
                                dbCode : d.logicalColumn && d.logicalColumn.dbColumn ? d.logicalColumn.dbColumn.code :""
                            }
                         })
         return actions;                
    }

    _onGridAction(action, keys) {
        console.log(" _onGridAction: ", action, keys);
        this.props.onGridAction(action, keys);
    }



    _renderRow(rowData, header, keyColumns, actions) {
        return (<GridRow key={uuid.v1()} keyColumns={keyColumns} data={rowData} header={header} actions={actions} onGridAction={this._onGridAction} >
        </GridRow>
        );

    }

    _filtertedData(header) {
        const searchText = this.props.searchText ? this.props.searchText : "";
        const searchTextRegex = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
        let filteredColumns = header.filter(function (gcolumn) {
            if (getPrivilege(gcolumn).privilegeType) {
                return true;
            }
        }.bind(this));
        let filterData = [];
        this.props.data.map(function (rowData) {
            let filterRow = {};
            let isSearch = false;
            filteredColumns.map(function (cellDetail) {
                let cellData = rowData[cellDetail.logicalColumn.dbColumn.code] != null ? rowData[cellDetail.logicalColumn.dbColumn.code] : "";
                filterRow[cellDetail.logicalColumn.dbColumn.code] = cellData;
                isSearch = isSearch ? isSearch : searchTextRegex.test(cellData);
            });
            if (isSearch)
                filterData.push(filterRow);
        }.bind(this));
        return filterData;
    }

    render() {
       const header = this._gridHeader();
        const keyColumns = this._keyColumns();
        const actions = this._rowActions();
         console.log("Render AEECardGrid ",actions);
       
       const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var dataSource = ds.cloneWithRows(this._filtertedData(header));
        return (
            <ListView style={styles.container}
                enableEmptySections ={true}
                dataSource={dataSource}
                scrollRenderAheadDistance={100}
                initialListSize={3}
                renderRow={(rowData) => this._renderRow(rowData, header, keyColumns, actions)}
                />
        );  
  
    }

    componentDidMount() {

    }

}

function bindActions(dispatch) {
  return {
    onGridAction: (action , keys) => dispatch(gridAction(action , keys)),
  };
}

const mapStateToProps = state => ({
  
});

 export default connect(mapStateToProps, bindActions)(AECardGrid);   

