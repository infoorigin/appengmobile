'use strict';

import React from 'react';
import {View, TextInput, Text, Platform} from 'react-native';
import AEBaseComponent from './base/AEBaseComponent';
import computeProps from '../utils/computeProps';


export default class AETextInput extends AEBaseComponent {



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
                    height: this.getTheme().inputHeightBase,
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
                    borderColor: this.getTheme().inputBorderColor,
                    borderWidth: 1,
                    marginBottom: 5,
                    color: this.getTheme().inputDisableColor,
                    backgroundColor: this.getTheme().inputDisableBackGroundColor
                }
            }
        }
    }

    componentStyle() {
        const isError = this.props.hasError;
        const initialStyle = this.getInitialStyle();

        let textboxStyle = isError ? initialStyle.textbox.error : initialStyle.textbox.normal;
        if (this.props.editable === false) {
            textboxStyle = initialStyle.textbox.notEditable;
        }
        let formGroupStyle = isError ? initialStyle.formGroup.error : initialStyle.formGroup.normal;
        let controlLabelStyle = isError ? initialStyle.controlLabel.error : initialStyle.controlLabel.normal;
        let helpBlockStyle = isError ? initialStyle.helpBlock.error : initialStyle.helpBlock.normal;
        let errorBlockStyle = initialStyle.errorBlock;

        return {
            textboxStyle: textboxStyle,
            formGroupStyle: formGroupStyle,
            controlLabelStyle: controlLabelStyle,
            helpBlockStyle: helpBlockStyle,
            errorBlockStyle: errorBlockStyle
        }

    }

    prepareRootProps(textboxStyle) {
        var defaultProps = {
            style: textboxStyle
        }
        return computeProps(this.props, defaultProps);
    }

    render() {

        var styles = this.componentStyle();

        let label = this.props.label ? <Text style={styles.controlLabelStyle}>{this.props.label}</Text> : null;
        let help = this.props.help ? <Text style={styles.helpBlockStyle}>{this.props.help}</Text> : null;
        let error = this.props.hasError && this.props.error ? <Text accessibilityLiveRegion="polite" style={styles.errorBlockStyle}>{this.props.error}</Text> : null;

        return (
            <View style={styles.formGroupStyle}>
                {label}
                <TextInput
                    ref="input"
                    {...this.prepareRootProps(styles.textboxStyle) }
                    placeholderTextColor={this.getTheme().inputColorPlaceholder}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    />
                {help}
                {error}
            </View>
        );
    }


}