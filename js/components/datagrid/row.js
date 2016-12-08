import React, { Component } from 'react';
import { Image,TouchableHighlight, Alert } from 'react-native';
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

    render(){
                return (
                    <View>

                        {this.state.rowDescription.map(function(cellDetail){
                           
                           switch(cellDetail.logicalColumn.datatype) {
                                case 'NUMBER':
                                  
                                  return (
                                    <Text>
                                          {cellDetail.headerName}: {this.state.rowData[cellDetail.logicalColumn.dbColumn.code]}
                                    </Text>
                                  );

                                default:
                                    return (
                                        <Text>{cellDetail.headerName}: {this.state.rowData[cellDetail.logicalColumn.dbColumn.code]}</Text>
                                    );
                           }   

                        }.bind(this))}
				    </View>
                );
    }

}export default (GridRow);