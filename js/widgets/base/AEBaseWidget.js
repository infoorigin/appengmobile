'use strict';

import React from 'react';
import {View, Text, Platform} from 'react-native';
import AEBaseComponent from './AEBaseComponent';

export default class AEBaseWidget extends AEBaseComponent {

    constructor(props) {
        super(props);
        this._onBlur = this._onBlur.bind(this);
        this._onChange = this._onChange.bind(this);
        this._hasError = this._hasError.bind(this);
        this._error = this._error.bind(this);
    }

    _baseInitialStyle() {
        return {
            formGroup: {
                normal: {
                    marginBottom: 10
                },
                error: {
                    marginBottom: 10
                }
            },
            
            controlLabel: {
                normal: {
                    color: this.getContextForegroundColor(),
                    fontSize: this.getTheme().fontSizeBase,
                    marginBottom: 2,
                    fontWeight: this.getTheme().inputFontWeight
                },
                // the style applied when a validation error occours
                error: {
                    color: this.getTheme().brandDanger,
                    fontSize: this.getTheme().inputFontSize,
                    marginBottom: 2,
                    fontWeight: this.getTheme().inputFontWeight
                }
            },
            
            helpBlock: {
                normal: {
                    color: this.getTheme().brandInfo,
                    fontSize: this.getTheme().infoFontSize,
                    marginBottom: 2
                },
                // the style applied when a validation error occours
                error: {
                    color: this.getTheme().brandDanger,
                    fontSize: this.getTheme().infoFontSize,
                    marginBottom: 2
                }
            },
            
            errorBlock: {
                fontSize: this.getTheme().infoFontSize,
                marginBottom: 2,
                color: this.getTheme().brandDanger
            },
           
        }
    }

    _baseComponentStyle() {
        const isError = this._hasError();
        const initialStyle = this._baseInitialStyle();

        let formGroupStyle = isError ? initialStyle.formGroup.error : initialStyle.formGroup.normal;
        let controlLabelStyle = isError ? initialStyle.controlLabel.error : initialStyle.controlLabel.normal;
        let helpBlockStyle = isError ? initialStyle.helpBlock.error : initialStyle.helpBlock.normal;
        let errorBlockStyle = initialStyle.errorBlock;

        return {
            formGroupStyle: formGroupStyle,
            controlLabelStyle: controlLabelStyle,
            helpBlockStyle: helpBlockStyle,
            errorBlockStyle: errorBlockStyle
        }

    }

    
     _hasError(){
        return this.props.error.has(this._fieldDBCode());
    }

    _error(){
        return this._hasError() ? this.props.error.get(this._fieldDBCode()) :"";
    }

    _onBlur(){
        this.props.onBlur(this._fieldDBCode(),  this.refs.input.props.value);

    }

     _onChange(text){
         this.props.onChange(this._fieldDBCode(), text);
    }

    _fieldDBCode(){
        let logicalCol = this.props.config.logicalColumn;
        return logicalCol.jsonName ? logicalCol.jsonName  : logicalCol.dbColumn.code;
    }

    _getData(){
        let dbCode = this._fieldDBCode();
       return this.props.data.get(dbCode) != null ?  this.props.data.get(dbCode)  :""; 
    }

    _baseRender(styles){
        let label = this.props.config.label ? <Text style={styles.controlLabelStyle}>{this.props.config.label}</Text> : null;
        let help = this.props.help ? <Text style={styles.helpBlockStyle}>{this.props.help}</Text> : null;
        let error = this._hasError() ? <Text accessibilityLiveRegion="polite" style={styles.errorBlockStyle}>{this._error()}</Text> : null;

        return {
            label,
            help,
            error,
        }
    }

}
