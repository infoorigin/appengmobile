import React, { Component } from 'react';
import { Image,TouchableHighlight,TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem, List, ListItem} from 'native-base';

import { NumericCell,TextCell } from './cell.js';
import styles from './styles';
const rightArrowImage = require('../../../img/Icon-Arrow-Right.png');

class GridRow extends Component{

    constructor(props){
        super(props);
        this.state={
                rowData:this.props.rowData, 
                rowDescription:this.props.rowDescription,
        };
        this.recordClicked = this.recordClicked.bind(this); 
    }

    
	recordClicked(){
		console.log('Record Selected');
		console.log(this.props.rowData);
	}
 
    render(){
                return (
                  
                   
                     
                     <View  style={styles.gridRow}>   

                        <View style={styles.gridRowData}>
                        {this.state.rowDescription.map(function(cellDetail,key){
                           
                           switch(cellDetail.logicalColumn.datatype) {
                                case 'NUMBER':
                                  
                                  return (
                                    <View key={key} style={styles.girdCell}>
                                         <Text style={styles.gridLabel}> {cellDetail.headerName}:</Text>
                                         <Text style={styles.gridText}> {this.state.rowData[cellDetail.logicalColumn.dbColumn.code]}</Text>
                                    </View>
                                  );

                                default:
                                    return (
                                        <View key={key} style={styles.girdCell}>
                                         <Text style={styles.gridLabel}> {cellDetail.headerName}:</Text>
                                         <Text style={styles.gridText}> {this.state.rowData[cellDetail.logicalColumn.dbColumn.code]}</Text>
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

}export default (GridRow);