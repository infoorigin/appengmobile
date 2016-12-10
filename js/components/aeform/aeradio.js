
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Radio, Text,View,CardItem, Card } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

export default class AERadio extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [{key:"Java",label:"Java"},{key:"C++",label:"C++"},{key:"Python",label:"Python"},{key:"Java",label:"Java"},{key:"C++",label:"C++"},{key:"Python",label:"Python"}],//this.props.data,
      value: this.props.value,
    };
  }

 isSelected(key){
     return key == this.state.value;
 }
 
 setSelected(newValue){
     this.props.onInputChange(this.props.field.logicalColumn.jsonName,newValue);
     this.state.value=newValue;
 }

 arrangeItems(items, itemsPerRow) {
        var itemsGroups = [];
        var group = [];
        items.forEach(function(item) {
          if (group.length == itemsPerRow) {
            itemsGroups.push(group);
            group = [item];
          } else {
            group.push(item);
          }
        });
        if (group.length > 0) {
          itemsGroups.push(group);
        }
        return itemsGroups;
 }



  render() {
    var groupedItems = this.arrangeItems(this.state.data,this.props.itemsPerRow);
    console.log('total item per row'+this.props.itemsPerRow);
    console.log(groupedItems);
    return (
        <View>
        <Text>{this.props.field.label}</Text>
        <View style={styles.aeradiocol}>
         {
            groupedItems.map((rowItems,rowKey)=>(
                <View key={rowKey} style={{flexDirection:'row'}}  >
                    {
                    rowItems.map((radioData, key)=>(
                        <View  key={key} style={{flexDirection:'row'}} >
                            <Radio  selected={this.isSelected(radioData.key)} onPress={() => this.setSelected(radioData.key)} />
                            <Text style={{marginLeft:5, marginRight:5}}>{radioData.label}</Text>
                        </View>
                        ))
                    }
                </View>
            ))        
         }
        </View>  
        </View>
    );
  }
}


