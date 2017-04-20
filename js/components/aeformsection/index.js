
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox as NBCheckBox, Card as NBCard, CardItem as NBCardItem, Text as NBText } from 'native-base';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';
import AETextInput from '../../widgets/AETextInput';
import AECheckboxGroup from '../../widgets/AECheckboxGroup';
import AERadioButtonGroup from '../../widgets/AERadioButtonGroup';
import AEDatePicker from '../../widgets/AEDatePicker';
import AESelectPicker from '../../widgets/AESelectPicker';
import AEHTMLView from '../../widgets/AEHTMLView';
import { Map } from 'immutable';
import { NO_PRIVILEGE, VIEW_PRIVILEGE, EDIT_PRIVILEGE, getPrivilege } from '../../services/usercontext.js';
import {resolveExpression} from '../../utils/exprexecutor';

export default class AEFormSection extends AEBaseComponent {  // eslint-disable-line

    constructor(props) {
        super(props);

    }

    getInitialStyle() {
        return {
            itemText: {
                fontSize: 15,
                color: this.getContextForegroundColor(),
                flex: 1
            },
            dividerItemText: {
                fontSize: 17,
                textAlign: 'left',
                fontWeight: '500',
                color: this.getContextForegroundColor(),
                flex: 1,
                paddingLeft: 10,
                backgroundColor: 'transparent'
            }
        };
    }

    _renderFormField() {

    }

    _onFieldChange(code, value) {
        console.log("Form2 secton field _onFieldChange ", code, value);
        this.props.onUIDataChange(this.props.bindingId, { [code]: value });
    }

    _onFieldBlur(code, value) {
        console.log("Form2 secton field _onFieldBlur ", code, value);
        this.props.onUIBlur(this.props.bindingId, { [code]: value });
    }


    _defaultFieldProps(privilege, config, data) {
        return {
            onChange: this._onFieldChange.bind(this),
            onBlur: this._onFieldBlur.bind(this),
            error: this.props.data.get("error") ? this.props.data.get("error") : Map(),
            user : this.props.user,
            privilege,
            config,
            data,
        }
    }

    _renderField(col, privilege, attrbdata) {

         switch (col.type) {
            case "TextBox":
            case "Password":
            case "TextArea":
            case "LabelField":
                return (<AETextInput key={col.configObjectId}  {...this._defaultFieldProps(privilege,col,attrbdata) } >
                </AETextInput>);
            case "SelectOption":
                return (<AESelectPicker key={col.configObjectId} {...this._defaultFieldProps(privilege,col,attrbdata) } > </AESelectPicker>);
            case "RadioButton":
                return (<AERadioButtonGroup key={col.configObjectId} {...this._defaultFieldProps(privilege,col,attrbdata) } > </AERadioButtonGroup>);
            case "CheckBox":
                return (<AECheckboxGroup key={col.configObjectId} {...this._defaultFieldProps(privilege,col,attrbdata) } > </AECheckboxGroup>);
            case "DatePicker":
            case "TimePicker":
                return (<AEDatePicker key={col.configObjectId} {...this._defaultFieldProps(privilege,col,attrbdata) } ></AEDatePicker>);
            case "cktexteditor" :
                return (<AEHTMLView key={col.configObjectId} {...this._defaultFieldProps(privilege,col,attrbdata) } ></AEHTMLView>);   
            case "Hiddenfield":
                return null;;
            default:
                console.log("Invalid or unspported Form field :", col.type);
                return null;
        }
    }

    render() {

        const attrbs  = this.props.data.get("attributes") ? this.props.data.get("attributes").toJS() : {};
        const attrbdata = Object.assign(attrbs, this.props.user.attributes);
        //console.log("User Props Data ,", JSON.stringify(attrbdata));
        return (

            <View>
                {
                    this.props.config.renderColumns.map(function (col, i) {
                        const privilege = getPrivilege(col, this.props.user); 
                        const isAccesible = resolveExpression(col.accessbilityRegEx, attrbdata);
                        if( isAccesible && privilege != NO_PRIVILEGE) 
                            return this._renderField(col, privilege, attrbdata);
                        else
                            return null;
                    }.bind(this))
                }
            </View>
        );
    }
}


