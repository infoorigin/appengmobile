'use strict';

import React from 'react';
import {View, TextInput, Text, Platform} from 'react-native';
import TagInput from 'react-native-tag-input';
import AEBaseWidget from './base/AEBaseWidget';
import computeProps from '../utils/computeProps';
import Tags from '../components/aetags';


import { VIEW_PRIVILEGE, EDIT_PRIVILEGE } from '../services/usercontext.js';

export default class AETextInput extends AEBaseWidget {

constructor(props) {
    super(props);
    this.state = {
        textValue : this._getData()
    }
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
            value : this.state.textValue,
            secureTextEntry : this.props.config.type == "Password",
            onChangeText: this._onChangeText.bind(this),
            onBlur : this._onBlurTextInput.bind(this),
            editable : this._editable(),
            ...this._multilineProps()
        }
       //return computeProps(this.props, defaultProps);
       return defaultProps;
    }

    _onChangeText(text) {
        this.setState({
            textValue : text,
        });
    }

    _onBlurTextInput() {
        this.props.onBlur(this._fieldDBCode(), this.state.textValue);
    }

    _input(styles){
        if(this.props.privilege == VIEW_PRIVILEGE){
           return this._nonEditableField();
       }
       else {
        return ( 
            <TextInput
                    ref="input"
                    {...this.prepareRootProps(styles.textboxStyle) }
                    placeholderTextColor={this.getTheme().inputColorPlaceholder}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    />
        );
       }
    }

    _onTagsInputBlur(){
        this.props.onBlur(this._fieldDBCode(), this._getData());
    }

    _inputTags(styles){
       if(this.props.privilege == VIEW_PRIVILEGE){
           return (  
             <Tags 
                ref="input"
                initialText="" 
                initialTags= {this._parseTags()}
                editable = {false}
                inputStyle={{ backgroundColor: 'white' }}
                />
           );
       }
       else {
        return ( 
            <Tags 
                ref="input"
                initialText="  " 
                initialTags= {this._parseTags()}
                editable = {true}
                onChangeTags={(tags) => this.setState({textValue : tags.join(",")})}
                onBlur =  {this._onTagsInputBlur.bind(this)}
                onTagPress={ (index, tagLabel, event) => console.log(index, tagLabel) }
                inputStyle={{ backgroundColor: 'white' }}
                />
        );
       }
    } 

    _parseTags(){
        return this.state.textValue ? this.state.textValue.split(',') :[];
    }


    render() { 
       const styles = this.componentStyle();
       const base = this._baseRender(styles);
       return (
            <View style={styles.formGroupStyle}>
                {base.label}
                {this.props.config.tagsInput ? this._inputTags(styles) : this._input(styles)}
                {base.help}
                {base.error}
            </View>
        );
    }


}