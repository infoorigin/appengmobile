import React, { Component,TextInput } from 'react';
import { InputGroup, Input, TextArea } from 'native-base';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';




export default class AETextInput extends Component {

    constructor(props) {
        super(props);
        this.state = { text: props.value};
    }

    
    render() {
        console.log("field name :",this.props.field.name);
        return (

         <View>
             <Text>{this.props.field.label}</Text>   
            <InputGroup borderType='rounded'>
                <TextInput
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText={(text) => this.setState({text})}
                    onBlur={(event) => this.props.onInputChange(this.props.field.name, this.state.text)}
                    value={this.state.text} />
            </InputGroup>   
        </View>
        );

    }

}

AETextInput.propTypes = {
  value: React.PropTypes.string,
  field: React.PropTypes.object.isRequired,
  onInputChange:React.PropTypes.func.isRequired
};