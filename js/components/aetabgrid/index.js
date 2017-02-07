import React, { Component } from 'react';
import { Modal, Image, TouchableHighlight, Alert, ListView } from 'react-native';
import { Text, List, ListItem } from 'native-base';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';
import styles from './styles';
import GridRow from './row';
import uuid from 'uuid';
const contentscreenBg = require('../../../img/basescreen.png');

export default class AECardGrid extends AEBaseComponent  {
	static propTypes = {
		config: React.PropTypes.object,
		data: React.PropTypes.array,
	}

	constructor(props) {
		super(props);
		this.state = {
		};
        this._onGridDetail = this._onGridDetail.bind(this);
        
	}

    

    _gridHeader(){
        let headerdata = this.props.config.gridColumns;
		headerdata = headerdata.filter(function (d) { return d.actionColoum == false; });
		headerdata = headerdata.sort(function (d1, d2) {
			if (d1.order > d2.order) {
				return 1;
			} else if (d1.order < d2.order) {
				return -1;
			} else {
				return 0;
			}
		});
        return headerdata;
    }

    _keyColumns(){
        let keyColunms = this.props.config.gridColumns.filter(function (gc) {
                                     return gc.logicalColumn.dbColumn.primaryKey | gc.logicalColumn.dbColumn.key; 
                            });
         return  keyColunms;                
	}

    _onGridDetail(keys){
        this.props.onGridDetail(keys, this.props.config.configObjectId);
    }

    
    
    _renderRow( rowData, header, keyColumns){
         return(<GridRow  key={uuid.v1()} keyColumns={keyColumns} data={rowData} header={header} onGridDetail={this._onGridDetail} >
                 </GridRow>
                 );
        
    }

	render() {
        let header = this._gridHeader();
        let keyColumns = this._keyColumns();
        console.log("**Sudhr 4**");
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var dataSource = ds.cloneWithRows(this.props.data);
            return (
                <ListView
                    dataSource={dataSource}
                    renderRow={(rowData) => this._renderRow(rowData, header, keyColumns)}
                />
            );

/*
         return (
            <List dataArray={this.props.data}
                    renderRow={(item, i) =>
                    <ListItem>
                        <GridRow key={i} keyColumns={keyColumns} data={item} header={header} onGridDetail={this._onGridDetail} >
                        </GridRow>
                    </ListItem>
                }>
            </List>
        );
        */
	}

	componentDidMount() {
        
	}

}

