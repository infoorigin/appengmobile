
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
                   value:props.field.value };
  }

  render() { 

    return (
                <View style={{flex:1, justifyContent:'space-around'}}>
                    
                    <ModalPicker
                    data={[{label:"India",key:"India"},{label:"USA",key:"USA"},{label:"Germany",key:"Germany"}]}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ 
                        this.setState({text:option.label,value:option.key});
                        this.props.onInputChange(this.props.field.logicalColumn.jsonName, option.key);
                    }}>

                       
                            <Text>{this.props.field.label}</Text>   
                                <TextInput editable={false} underlineColorAndroid='transparent' 
                                style={{borderWidth:1, borderColor:'#ccc', height:40, borderRadius: 10}}
                                value={this.state.text}
                                />
                        
                    </ModalPicker>
                </View>
    );
  }
}
