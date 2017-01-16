'use strict';

import React from 'react';
import {View, TextInput, Text, Platform} from 'react-native';
import AEBaseComponent from './base/AEBaseComponent';
import computeProps from '../utils/computeProps';
import { CheckBox as NBCheckBox } from 'native-base';

export default class AECheckboxGroup extends AEBaseComponent {



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
            text: {
                normal: {
                    color: this.getTheme().inputColor,
                    fontSize: this.getTheme().fontSizeBase,
                    marginLeft: 5,
                    marginRight: 5,
               },
                // the style applied when a validation error occours
                error: {
                    color: this.getTheme().brandDanger,
                    fontSize: this.getTheme().inputFontSize,
                    marginLeft:5, 
                    marginRight:5,
                },
                // the style applied when the textbox is not editable
                notEditable: {
                    fontSize: this.getTheme().fontSizeBase,
                    marginLeft:5, 
                    marginRight:5,
                    color: this.getTheme().inputDisableColor,
                    backgroundColor: this.getTheme().inputDisableBackGroundColor
                }
            }
        }
    }

    componentStyle() {
        const isError = this.props.hasError;
        const initialStyle = this.getInitialStyle();

        let textStyle = initialStyle.text.normal;
        if (this.props.editable === false) {
            textStyle = initialStyle.text.notEditable;
        }
        let formGroupStyle = isError ? initialStyle.formGroup.error : initialStyle.formGroup.normal;
        let controlLabelStyle = isError ? initialStyle.controlLabel.error : initialStyle.controlLabel.normal;
        let helpBlockStyle = isError ? initialStyle.helpBlock.error : initialStyle.helpBlock.normal;
        let errorBlockStyle = initialStyle.errorBlock;

        return {
            textStyle: textStyle,
            formGroupStyle: formGroupStyle,
            controlLabelStyle: controlLabelStyle,
            helpBlockStyle: helpBlockStyle,
            errorBlockStyle: errorBlockStyle
        }

    }


    render() {

        let styles = this.componentStyle();

        let label = this.props.label ? <Text style={styles.controlLabelStyle}>{this.props.label}</Text> : null;
        let help = this.props.help ? <Text style={styles.helpBlockStyle}>{this.props.help}</Text> : null;
        let error = this.props.hasError && this.props.error ? <Text accessibilityLiveRegion="polite" style={styles.errorBlockStyle}>{this.props.error}</Text> : null;

        return (
            <View style={styles.formGroupStyle}>
                {label}
                 <View  key="1" style={{flexDirection:'row' , margin :5}} >
                    <NBCheckBox   
                        checked="true"  />
                     <Text style={styles.textStyle}>Check Box Text 2</Text>
                 </View>
                {help}
                {error}
            </View>
        );
    }


}