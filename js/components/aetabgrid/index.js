import React, { Component } from 'react';
import { Modal, Image, TouchableHighlight, Alert } from 'react-native';
import { Text, List, ListItem } from 'native-base';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';
import styles from './styles';
import GridRow from './row';
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
    

	render() {
        let header = this._gridHeader();
        let keyColumns = this._keyColumns();
       
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
	}

	componentDidMount() {
        
	}

}

