
import React, { Component, Input } from 'react';
import { connect } from 'react-redux';
import { Container,CheckBox , Header, Title, Content, Button, Icon, List, ListItem, Radio, Text,View,CardItem, Card } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

export default class AECheckbox extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    var selectedValues =  this.props.value ? this.props.value :[];
    this.state = {
      data: [],
      value:selectedValues,
    };
  }

 componentDidMount(){
   //static list
   let data = this.props.field.metadataUISelectItems.filter(function(d){d["key"]=d["value"];return true;});

       console.log('===============================================');
      console.log(JSON.stringify(data));
      console.log('===============================================');

   this.setState({data:data});
 }

 isChecked(key){
     return this.state.value.indexOf(key)!=-1;
 }
 
 setSelected(newValue){
     if(this.state.value.indexOf(newValue)==-1){
     this.state.value.push(newValue);
     this.props.onInputChange(this.props.field.logicalColumn.jsonName,this.state.value);
     }else{
     this.state.value.pop(newValue);
     this.props.onInputChange(this.props.field.logicalColumn.jsonName,this.state.value);
     }
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
                            <CheckBox   
                             checked={this.isChecked(radioData.key)} onPress={() => this.setSelected(radioData.key)} />
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


