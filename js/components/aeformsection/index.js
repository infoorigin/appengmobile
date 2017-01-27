
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel as REFormLabel, FormInput as REFormInput,  Button as REButton } from 'react-native-elements';
import { CheckBox as NBCheckBox, Card as NBCard, CardItem as NBCardItem, Text as NBText } from 'native-base';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';
import AETextInput from '../../widgets/AETextInput';
import AECheckboxGroup from '../../widgets/AECheckboxGroup';
import AERadioButtonGroup from '../../widgets/AERadioButtonGroup';
import AEDatePicker from '../../widgets/AEDatePicker';
import AESelectPicker from '../../widgets/AESelectPicker';
import { Map } from 'immutable';

export default class  AEFormSection extends AEBaseComponent {  // eslint-disable-line

constructor(props) {
    super(props);

    }

    getInitialStyle() {
        return {
            itemText: {
                fontSize:  15,
                color: this.getContextForegroundColor(),
                flex: 1
            },
            dividerItemText: {
                fontSize: 17,
                textAlign:'left',
                fontWeight: '500',
                color: this.getContextForegroundColor(),
                flex: 1,
                paddingLeft: 10,
                backgroundColor: 'transparent'
            }
        };
    }

    _renderFormField(){

    }

    _onFieldChange(code, value){
        console.log("Form2 secton field _onFieldChange ", code,value);
        this.props.onUIDataChange(this.props.bindingId, {[code]:value});
    }

    _onFieldBlur(code, value){
        console.log("Form2 secton field _onFieldBlur ", code,value);
        this.props.onUIBlur(this.props.bindingId, {[code]:value});
    }

   
    _defaultFieldProps(){
        return {
            onChange : this._onFieldChange.bind(this),
            onBlur : this._onFieldBlur.bind(this),
            data : this.props.data.get("attributes") ? this.props.data.get("attributes") : Map() ,
            error : this.props.data.get("error") ? this.props.data.get("error") : Map() ,
       }
    }


    render() {

        const selectOptions = [{value:1, text:"one"}, {value:2, text:"two"}, {value:3, text:"three"}, {value:4, text:"four"}];

        return (
            <View>
                
                 {
                     this.props.config.renderColumns.map(function(col, i){
                          
                          switch(col.type){
                            case "TextBox":
                            case "Password":
                            case "TextArea":
                            case "LabelField":
                                return (<AETextInput key={col.configObjectId} config={col}  {...this._defaultFieldProps()} >
                                </AETextInput>);
                            case "SelectOption":
                                return (<AESelectPicker key={col.configObjectId} config={col} {...this._defaultFieldProps()} > </AESelectPicker>);
                            case "RadioButton":
                                return (<AERadioButtonGroup key={col.configObjectId} config={col} {...this._defaultFieldProps()} > </AERadioButtonGroup>);
                            case "CheckBox" :
                                return (<AECheckboxGroup key={col.configObjectId} config={col} {...this._defaultFieldProps()} > </AECheckboxGroup>);
                            case "DatePicker" :
                            case "TimePicker" :
                                return (<AEDatePicker key={col.configObjectId} config={col} {...this._defaultFieldProps()} ></AEDatePicker>);
                            case "Hiddenfield":
                                break;
                             default :
                                console.log("Invalid or unspported Form field :",col.type) ;  
                          }
                    }.bind(this)) 

                    /* 
                     <AESelectPicker hasError="true" error="Error message" label="Select Picker" value={new Date()}
                        options={selectOptions} >
                    </AESelectPicker>

                     <AERadioButtonGroup hasError="true" error="Error message" label="Radio Label">
                    </AERadioButtonGroup>

                    <AECheckboxGroup hasError="true" error="Error message" label="Checkbox Label">
                    </AECheckboxGroup>

                    <AEDatePicker hasError="true" error="Error message" label="Date Picker" value={new Date()}>
                    </AEDatePicker>
                    */
                 }
                    
                    
                    
                    
                   

                    
                    
                    
                    <Text style={this.getInitialStyle().itemText}>
                        The idea with React Native Elements is more about component structure than actual SB design.
                    </Text>
                    
                    <REFormLabel>Name</REFormLabel>
                    <REFormInput />

                    <REButton
                        raised
                        icon={{ name: 'cached' }}
                        title='BUTTON WITH ICON' />

                
            </View>
        );
    }
}


