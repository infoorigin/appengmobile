
import React, { Component } from 'react';
import ModalPicker from 'react-native-modal-picker'
import { InputGroup, Input } from 'native-base';

import {
  StyleSheet,
  Text,
  View,TextInput
} from 'react-native';



export default class AEDropdown extends Component {
  
  constructor(props) {
    super(props);
    this.state = { text: props.field.placeholder,
                   value: props.value , data:[],
    }
  }

   componentDidMount(){
   //static list
   let data = this.props.field.metadataUISelectItems.filter(function(d){d["key"]=d["value"];return true;});
  
   let selected = data.filter(function(d){if(d["key"] == this.props.value){return true;}}.bind(this))[0];
    
   this.setState({data:data,text:selected.label, value:selected.key});
      
   }

  render() { 
    console.log("=-=-=-=-=-=-=-=-=-=:");
    return (
                <View style={{flex:1, justifyContent:'space-around'}}>
                    
                    <ModalPicker
                    data={this.state.data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ 
                        this.setState({text:option.label,value:option.key});
                        this.props.onInputChange(this.props.field.logicalColumn.jsonName, option.key);
                    }}>
                            <Text>{this.props.field.label}</Text>   
                                <TextInput editable={false} underlineColorAndroid='transparent' 
                                style={{borderWidth:1, borderColor:'#ccc', height:40, borderRadius: 10, padding:10}}
                                value={this.state.text}
                                />
                        
                    </ModalPicker>
                </View>
    );
  }
}
