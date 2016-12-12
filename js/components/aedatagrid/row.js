import React, { Component } from 'react';
import { Image,TouchableHighlight,TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem, List, ListItem} from 'native-base';

import { NumericCell,TextCell } from './cell.js';

class GridRow extends Component{

    constructor(props){
        super(props);
        this.state={
                rowData:this.props.rowData, 
                rowDescription:this.props.rowDescription,
        };
    }

    
	recordClicked(){
		console.log('Record Selected');
		console.log(this.props.rowData);
	}
 
    render(){
                return (
                    <TouchableOpacity onPress={this.recordClicked} style={{flex:1, flexDirection:'row'}}>
                    <View>

                        {this.state.rowDescription.map(function(cellDetail,key){
                           
                           switch(cellDetail.logicalColumn.datatype) {
                                case 'NUMBER':
                                  
                                  return (
                                    <Text key={key}>
                                          {cellDetail.headerName}: {this.state.rowData[cellDetail.logicalColumn.dbColumn.code]}
                                    </Text>
                                  );

                                default:
                                    return (
                                        <Text key={key}>{cellDetail.headerName}: {this.state.rowData[cellDetail.logicalColumn.dbColumn.code]}</Text>
                                    );
                           }   

                        }.bind(this))}
				    </View>
                    <Icon name="ios-arrow-forward"></Icon>
                    </TouchableOpacity>
                );
    }

}export default (GridRow);