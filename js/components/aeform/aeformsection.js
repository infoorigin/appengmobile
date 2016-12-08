import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput ,
  TouchableHighlightS
} from 'react-native';


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

  return(
 
    <View style={{padding:10}}>
      {
        this.props.sectionItem.renderColumns.map((field, key)=>(
          

          <AETextInput key={key}
            value={this.state.data[field.logicalColumn.jsonName]}
              onInputChange={this._onInputChange2} 
             field = {field}
          />

          
                
        ))
      }
      </View>
 
  );    

}

}