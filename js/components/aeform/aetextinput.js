import React, { Component } from 'react';
import { InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const mystyle={
      lable:{
        NOMESSAGE:{},
        ERRORMESSAGE:{color:'red'}
      },
      message:{
        NOMESSAGE:{},
        ERRORMESSAGE:{color:'red'}
      },
      input:{
        NOMESSAGE:{},
        ERRORMESSAGE:{color:'red'}
      }
   }


 

export default class AETextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
             text: props.value,
             validationFlag:props.validationFlag,
             validationMessage:props.validationMessage
        };

    }

   
    render() {
        console.log("field............................................" +this.props.validationFlag);
        return (

         <View>
             <Text style={mystyle.message[this.props.validationFlag]}>{this.props.field.label}</Text>   
            <InputGroup borderType='rounded' style={{borderRadius:10}}>
                <Input
                    keyboardType='default'
                    onChangeText={(text) => this.setState({text})}
                    onBlur={(event) => this.props.onInputChange(this.props.field.logicalColumn.jsonName, this.state.text)}
                    value={this.state.text} />
            </InputGroup>  
            <Text style={mystyle.message[this.props.validationFlag]}>{this.props.validationMessage}</Text> 
        </View>
        );

    }

}

AETextInput.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  field: React.PropTypes.object.isRequired,
  onInputChange:React.PropTypes.func.isRequired
};