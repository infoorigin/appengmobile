import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput ,
  Input,
  TouchableHighlightS
} from 'react-native';

import AEDropdown from './aedropdown.js';
import AETextInput from './aetextinput.js';
import AERadio from './aeradio.js';
import AECheckbox from './aecheckbox.js';
import AETextArea from './aetextarea.js';

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

  return(
 
    <View style={{padding:10}}>
      {
        this.props.sectionItem.renderColumns.map(function(field, key){
             console.log('------------------------------>');
             console.log(field);
             switch(field.type) {
                                case 'selectoption':
                                   return(
                                          <AEDropdown key={key}
                                            value={this.state.data[field.logicalColumn.jsonName]}
                                              onInputChange={this._onInputChange2} 
                                            field = {field}
                                          />
                                         );
                                case 'checkbox':
                                   return(
                                          <AECheckbox key={key}
                                              value={this.state.data[field.logicalColumn.jsonName]}
                                                onInputChange={this._onInputChange2} 
                                              field = {field}
                                              itemsPerRow='4'
                                            />
                                          );
                                case 'radiooption':
                                   return(
                                          <AERadio key={key}
                                            value={this.state.data[field.logicalColumn.jsonName]}
                                              onInputChange={this._onInputChange2} 
                                            field = {field}
                                            itemsPerRow='4'
                                          />
                                        );
                                case 'textarea':
                                     return(
                                        <AETextArea key={key}
                                            value={this.state.data[field.logicalColumn.jsonName]}
                                              onInputChange={this._onInputChange2} 
                                            field = {field}
                                            itemsPerRow='4'
                                          />
                                     );
                                default:
                                return(
                                   <AETextInput key={key}
                                    value={this.state.data[field.logicalColumn.jsonName]}
                                      onInputChange={this._onInputChange2} 
                                    field = {field}
                                  />
                                );
             }

        }.bind(this))
      }
      </View>   

        
  );    

}

}
