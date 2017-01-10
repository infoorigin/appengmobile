'use strict';

import React from 'react';
import { View, TextInput, Text, Platform } from 'react-native';
import AEBaseComponent from './base/AEBaseComponent';
import computeProps from '../utils/computeProps';
import AEDatePickerIOS from './AEDatePickerIOS';
import AEDatePickerAndroid from './AEDatePickerAndroid';


export default class AEDatePicker extends AEBaseComponent {

    constructor(props) {
		super(props);
		this._renderIOSDatePicker = this._renderIOSDatePicker.bind(this);
        this._renderAndroidDatePicker = this._renderAndroidDatePicker.bind(this);
    }


    getInitialStyle() {
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
                    marginBottom: 7,
                    fontWeight: this.getTheme().inputFontWeight
                },
                // the style applied when a validation error occours
                error: {
                    color: this.getTheme().brandDanger,
                    fontSize: this.getTheme().inputFontSize,
                    marginBottom: 7,
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

            datepicker: {
                normal: {
                    marginBottom: 4
                },
                // the style applied when a validation error occours
                error: {
                    marginBottom: 4
                }
            },
            dateTouchable: {
                normal: {},
                error: {}
            },
            dateValue: {
                normal: {
                    color: this.getTheme().inputColor,
                    fontSize: this.getTheme().fontSizeBase,
                    padding: 7,
                    marginBottom: 5
                },
                error: {
                    color: this.getTheme().brandDanger,
                    fontSize: this.getTheme().fontSizeBase,
                    padding: 7,
                    marginBottom: 5
                }
            },

        }
    }

    componentStyle() {
        const isError = this.props.hasError;
        const initialStyle = this.getInitialStyle();

        let dateValueStyle = isError ? initialStyle.dateValue.error : initialStyle.dateValue.normal;
        let dateTouchableStyle = isError ? initialStyle.dateTouchable.error : initialStyle.dateTouchable.normal;
        let datepickerStyle = isError ? initialStyle.datepicker.error : initialStyle.datepicker.normal;
        
        let formGroupStyle = isError ? initialStyle.formGroup.error : initialStyle.formGroup.normal;
        let controlLabelStyle = isError ? initialStyle.controlLabel.error : initialStyle.controlLabel.normal;
        let helpBlockStyle = isError ? initialStyle.helpBlock.error : initialStyle.helpBlock.normal;
        let errorBlockStyle = initialStyle.errorBlock;

        return {
            dateValueStyle: dateValueStyle,
            dateTouchableStyle : dateTouchableStyle,
            datepickerStyle : datepickerStyle,
            formGroupStyle: formGroupStyle,
            controlLabelStyle: controlLabelStyle,
            helpBlockStyle: helpBlockStyle,
            errorBlockStyle: errorBlockStyle
        }

    }

    _renderIOSDatePicker(label, help, error, styles){
        return (
            <View style={styles.formGroupStyle}>
                {label}
                <AEDatePickerIOS {...this.props} styles = {styles}/>
                {help}
                {error}
             </View>
        );
    }

    _renderAndroidDatePicker(label, help, error, styles){
        return (
            <View style={styles.formGroupStyle}>
                <AEDatePickerAndroid {...this.props} label={label} styles = {styles}  />
                {help}
                {error}
             </View>
        );
    }

    render() {

        const styles = this.componentStyle();

        const label = this.props.label ? <Text style={styles.controlLabelStyle}>{this.props.label}</Text> : null;
        const help = this.props.help ? <Text style={styles.helpBlockStyle}>{this.props.help}</Text> : null;
        const error = this.props.hasError && this.props.error ? <Text accessibilityLiveRegion="polite" style={styles.errorBlockStyle}>{this.props.error}</Text> : null;
        let datepicker =  null;
        if(Platform.OS === 'ios'){
            datepicker =  this._renderIOSDatePicker(label, help, error, styles);
        }
        else { // android
            datepicker =  this._renderAndroidDatePicker(label, help, error, styles);
        }

        return datepicker ;
    }


}