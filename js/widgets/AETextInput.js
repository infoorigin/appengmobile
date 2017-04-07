'use strict';

import React from 'react';
import {View, TextInput, Text, Platform} from 'react-native';
import AEBaseWidget from './base/AEBaseWidget';
import computeProps from '../utils/computeProps';
import { NO_PRIVILEGE, VIEW_PRIVILEGE, EDIT_PRIVILEGE, getPrivilege } from '../services/usercontext.js';

export default class AETextInput extends AEBaseWidget {

constructor(props) {
    super(props);
}


    getInitialStyle() {
        return {
            
            textbox: {
                default: {
                    height: this.props.toolbar ? 30 : this.getTheme().inputHeightBase,
                    color: this.getTheme().inputColor,
                    paddingLeft: 5,
                    paddingRight: 5,
                    fontSize: this.getTheme().fontSizeBase,
                    lineHeight: this.getTheme().inputLineHeight,
                    marginTop: (this.props.inlineLabel) ? ((Platform.OS === 'ios') ? undefined : 5) : undefined
                },
                normal: {
                    color: this.getTheme().inputColor,
                    fontSize: this.getTheme().fontSizeBase,
                    height: this._isTextArea() ? this.getTheme().inuputTextAreaHeightBase :  this.getTheme().inputHeightBase ,
                    padding: 7,
                    borderRadius: 4,
                    borderColor: this.getTheme().inputBorderColor,
                    borderWidth: 1,
                    marginBottom: 5
                },
                // the style applied when a validation error occours
                error: {
                    color: this.getTheme().brandDanger,
                    fontSize: this.getTheme().inputFontSize,
                    height: this.getTheme().inputHeightBase,
                    padding: 7,
                    borderRadius: 4,
                    borderColor: this.getTheme().brandDanger,
                    borderWidth: 1,
                    marginBottom: 5
                },
                // the style applied when the textbox is not editable
                notEditable: {
                    fontSize: this.getTheme().fontSizeBase,
                    height: 36,
                    padding: 7,
                    borderRadius: 4,
                    borderColor: this.getTheme().inputNonEditableBorderColor,
                    borderWidth: 1,
                    marginBottom: 5,
                    color: this.getTheme().inputDisableColor,
                    backgroundColor: this.getTheme().inputDisableBackGroundColor
                }
            }
        }
    }

    componentStyle() {
        const isError = this._hasError();
        const initialStyle = this.getInitialStyle();

        let textboxStyle = isError ? initialStyle.textbox.error : initialStyle.textbox.normal;
        if (! this._editable()) {
            textboxStyle = initialStyle.textbox.notEditable;
        }
        

        return {
            ...this._baseComponentStyle(),
            textboxStyle: textboxStyle,
        }

    }

    _editable(){
        return this.props.config.type !== "LabelField" ;
    }

    prepareRootProps(textboxStyle) {
        var defaultProps = {
            style: textboxStyle,
            placeholder : this.props.config.placeHolder ? this.props.config.placeHolder:"", 
            value : this._getData(),
            secureTextEntry : this.props.config.type == "Password",
            onChangeText: this._onChange,
            onBlur : this._onBlur,
            editable : this._editable(),
            ...this._multilineProps()
        }
       //return computeProps(this.props, defaultProps);
       return defaultProps;
    }

    _input(styles, privilege){
        if(privilege == VIEW_PRIVILEGE){
           return this._nonEditableField();
       }
       else {
        return ( <TextInput
                    ref="input"
                    {...this.prepareRootProps(styles.textboxStyle) }
                    placeholderTextColor={this.getTheme().inputColorPlaceholder}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    />
        );
       }
    }


    render() { 
       const privilege = getPrivilege(this.props.config, this.props.user);
       if(privilege == NO_PRIVILEGE) 
           return null;

       const styles = this.componentStyle();
       const base = this._baseRender(styles);
       return (
            <View style={styles.formGroupStyle}>
                {base.label}
                {this._input(styles,privilege)}
                {base.help}
                {base.error}
            </View>
        );
    }


}