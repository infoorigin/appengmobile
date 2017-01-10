import React, { Component } from 'react';
import { Image,TouchableHighlight,TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem, List, ListItem} from 'native-base';

import { NumericCell,TextCell } from './cell.js';
import styles from './styles';
import {getPrivilege} from '../../services/usercontext.js';

import {RENDER_GRID_DETAIL, gridAction} from '../../actions/grid';
import * as ceActions from '../../actions/ce.js';

const rightArrowImage = require('../../../img/Icon-Arrow-Right.png');

class GridRow extends Component{
    
    static propTypes = {
        keyValue:React.PropTypes.string,
        renderCEEditForm : React.PropTypes.func,
        getPrivilege:React.PropTypes.func
    }

    constructor(props){
        super(props);
        this.state={
                rowData:this.props.rowData, 
                rowDescription:this.props.rowDescription,
        };
        this.recordClicked = this.recordClicked.bind(this); 
    }

    
	recordClicked(){
        console.log('Key Selected----'+JSON.stringify(this.state.rowKeyData));
        this.props.gridAction(RENDER_GRID_DETAIL,this.state.rowKeyData.primaryKey);
	}
 
    getElementsWithPrivilege(){
       let filteredColumns = this.props.rowDescription.filter(function(gcolumn){
            if(this.props.getPrivilege(gcolumn).privilegeType){
                return true;
            }
        }.bind(this));
        return  filteredColumns;
    }
    

    componentDidMount(){
        let keyCoulumns =   this.props.keyColunms.filter(function(gc){ 
            return  gc.logicalColumn.dbColumn.key;
        });
        let primaryKeyColumn =   this.props.keyColunms.filter(function(gc){ 
            return  gc.logicalColumn.dbColumn.primaryKey;
        })[0];
        let rowKeyData={"primaryKey":this.props.rowData[primaryKeyColumn.logicalColumn.dbColumn.code]};
        if(keyCoulumns.length>0){
            let keys={};
            keyCoulumns.forEach(function(keyColunm){
                    keys[keyColunm.logicalColumn.dbColumn.code]=this.props.rowData[primaryKeyColumn.logicalColumn.dbColumn.code];
            });
            rowKeyData["keys"]=keys;
        }
        this.setState({"rowKeyData":rowKeyData});
    }

    render(){
                return (

                     <View  style={styles.gridRow}>   

                        <View style={styles.gridRowData}>
                        {this.getElementsWithPrivilege().map(function(cellDetail,key){
                           
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

}


function bindAction(dispatch) {
  return {
    gridAction :(actionType,keyValue) => dispatch(gridAction(actionType ,keyValue)),
    getPrivilege: (configItem) => getPrivilege(configItem)
  };
}
const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction) (GridRow);