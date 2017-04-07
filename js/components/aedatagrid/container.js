
import React, { Component } from 'react';
import { View, ListView} from 'react-native';
import styles from './styles';
import GridRow from './row.js';
const contentscreenBg = require('../../../img/basescreen.png');
import { NO_PRIVILEGE, getPrivilege } from '../../services/usercontext.js';

export default class GridContainer extends Component {


    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(" shouldComponentUpdate :", nextProps.isRenderContent);
        return nextProps.isRenderContent ? true : false;
        
    }

    _filtertedData() {
        const searchText = this.props.searchText ? this.props.searchText : "";
        const searchTextRegex = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
        let filteredColumns = this.props.header.filter(function (gcolumn) {
            return getPrivilege(gcolumn) != NO_PRIVILEGE;
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
        //console.log(" using filterDatafilterData for ", filterData);
        return filterData;
    }

    render() {

        console.log("Get FilterData ");
        const filterData = this._filtertedData();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log("GridContainer Render ");

        return (
            <View source={contentscreenBg} style={styles.gridContainer}>
                <ListView 
                    enableEmptySections 
                    dataSource={ds.cloneWithRows(filterData)}
                    initialListSize={3}
                    renderRow={(item, sectionId, rowId) =>
                        <GridRow key={rowId} rownum={rowId} keyColunms={this.props.keyColunms} rowData={item} rowDescription={this.props.header} />
                    }
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} >
                </ListView>
            </View>
        ); 
    }



}