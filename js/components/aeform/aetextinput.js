import React, { Component } from 'react';
import { InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TextInput ,
  TouchableHighlightS
} from 'react-native';


export default class AETextInput extends Component {

    constructor(props) {
        super(props);
    //    console.log("Props inside AETextInput",JSON.stringify(props));
        this.state = { text: props.value};
    }

    
    render() {
       // console.log("field name :",this.props.field.name);
        return (

         <View>
             <Text>{this.props.label}</Text>   
            <InputGroup borderType='rounded'>
                <Input
                    onChangeText={(text) => this.setState({text})}
                    
                    value={this.state.text} />
            </InputGroup>   
        </View>
        );

    }

}