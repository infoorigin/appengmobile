import React, { Component,TextInput } from 'react';
import { InputGroup, Input, TextArea } from 'native-base';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';




export default class AETextArea extends Component {

    constructor(props) {
        super(props);
        this.state = { text: props.value};
    }

    
    render() {
     
        return (

         <View>
             <Text>{this.props.field.label}</Text>   
            <InputGroup borderType='rounded'>
                <TextInput
                    multiline = {true}
                    numberOfLines = {10}
                    onChangeText={(text) => this.setState({text})}
                    onBlur={(event) => this.props.onInputChange(this.props.field.logicalColumn.jsonName, this.state.text)}
                    value={this.state.text} />
            </InputGroup>   
        </View>
        );

    }

}

