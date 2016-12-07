import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlightS
} from 'react-native';

import { List, ListItem, InputGroup, Input} from 'native-base';
import AETextInput from './aetextinput.js';

export default class AEFormSection extends Component {

constructor(props) {
    super(props);
    
    this.state = { 
        data : props.sectionData
     };
     this._onInputChange2 = this._onInputChange2.bind(this);
     this._onInputBlur = this._onInputBlur.bind(this);
   }

   componentDidMount() {
       
   }

_onInputChange2(fieldName, value){
    let data = this.state.data;
    
    data[fieldName] = value;
    this.setState({ 
        data : data
     });
     console.log("updated input :",fieldName, value, JSON.stringify(data));
    
     this.props.onSectionDataChange(this.props.sectionItem.name, data);
}

_onInputBlur(){
  console.log("On Input Blur called");
  //submit action here
}  

render() {
 
  return (
      <List>
        {this.props.sectionItem.fields.map((field, key) => (
            <ListItem key={key}>
             <InputGroup> 
                  <Input inlineLabel label={field.name} 
                    onBlur = {() => this._onInputBlur()}
                    onChangeText = {(text) => {this._onInputChange2(field.name, text);}}
                    placeholder={field.placeholder} 
                    value={this.state.data[field.name]} />
               </InputGroup> 
            </ListItem>
        ))}
      </List>
     );
}

}