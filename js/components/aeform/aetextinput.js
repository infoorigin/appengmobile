import React, { Component } from 'react';
import { InputGroup, Input } from 'native-base';


export default class AETextInput extends Component {

    constructor(props) {
        super(props);
        this.state = { text: props.field.placeholder };
    }

    
    render() {
        console.log("field name :",this.props.field.name);
        return (
            <InputGroup>
                <Input inlineLabel label={this.props.field.name} 
                    onChangeText={(text) => this.setState({text})}
                    onBlur={(event) => this.props.onInputChange(this.props.field.name, this.state.text)}
                    placeholder={this.props.field.placeholder} 
                    value={this.state.text} />
            </InputGroup>
        );

    }

}