'use strict';

import React from 'react';
import { View, TextInput, Text, Platform } from 'react-native';
import AEBaseComponent from './base/AEBaseComponent';
import computeProps from '../utils/computeProps';
import AESelectPickerIOS from './AESelectPickerIOS';
import AESelectPickerAndroid from './AESelectPickerAndroid';


export default class AESelectPicker extends AEBaseComponent {

    constructor(props) {
        super(props);
        this._renderIOSSelectPicker = this._renderIOSSelectPicker.bind(this);
        this._renderAndroidSelectPicker = this._renderAndroidSelectPicker.bind(this);
    }


    getInitialStyle() {
        return {

            select: {
                normal: Platform.select({
                    android: {
                        paddingLeft: 7,
                        color: this.getTheme().inputColor,
                    },
                    ios: {

                    }
                }),
                // the style applied when a validation error occours
                error: Platform.select({
                    android: {
                        paddingLeft: 7,
                        color: this.getTheme().brandDanger,
                    },
                    ios: {

                    }
                })
            },
            pickerTouchable: {
                normal: {
                    height: 44,
                    flexDirection: 'row',
                    alignItems: 'center'
                },
                error: {
                    height: 44,
                    flexDirection: 'row',
                    alignItems: 'center'
                },
                active: {
                    borderBottomWidth: 1,
                    borderColor: this.getContextForegroundColor(),
                }
            },
            pickerValue: {
                normal: {
                    fontSize: this.getTheme().fontSizeBase,
                    paddingLeft: 7
                },
                error: {
                    fontSize: this.getTheme().fontSizeBase,
                    paddingLeft: 7
                }
            },

            formGroup: {
                normal: {
                    marginBottom: 4,
                    borderRadius: 4,
                    borderColor: this.getContextForegroundColor(),
                    borderWidth: 1
                },
                error: {
                    borderColor: this.getTheme().brandDanger,
                },
                open: {
                    // Alter styles when select container is open
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


        }
    }

    componentStyle() {
        const isError = this.props.hasError;
        const initialStyle = this.getInitialStyle();

        let pickerValueStyle = isError ? initialStyle.pickerValue.error : initialStyle.pickerValue.normal;
        let pickerTouchableStyle = isError ? initialStyle.pickerTouchable.error : initialStyle.pickerTouchable.normal;
        let selectStyle = isError ? initialStyle.select.error : initialStyle.select.normal;

        let formGroupStyle = isError ? initialStyle.formGroup.error : initialStyle.formGroup.normal;
        let controlLabelStyle = isError ? initialStyle.controlLabel.error : initialStyle.controlLabel.normal;
        let helpBlockStyle = isError ? initialStyle.helpBlock.error : initialStyle.helpBlock.normal;
        let errorBlockStyle = initialStyle.errorBlock;

        return {
            pickerValueStyle: pickerValueStyle,
            pickerTouchableStyle: pickerTouchableStyle,
            selectStyle: selectStyle,
            formGroupStyle: formGroupStyle,
            controlLabelStyle: controlLabelStyle,
            helpBlockStyle: helpBlockStyle,
            errorBlockStyle: errorBlockStyle
        }

    }

    _renderIOSSelectPicker(label, help, error, styles) {
        return (
            <View style={formGroupStyle}>
                {label}
                <AESelectPickerIOS {...this.props} styles={styles} />
                {help}
                {error}
            </View>
        );
    }

    _renderAndroidSelectPicker(label, help, error, styles) {
        return (
            <View style={styles.formGroupStyle}>
                {label}
                <AESelectPickerAndroid {...this.props} styles={styles} />
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
        let selectpicker = null;
        if (Platform.OS === 'ios') {
            selectpicker = this._renderIOSSelectPicker(label, help, error, styles);
        }
        else { // android
            selectpicker = this._renderAndroidSelectPicker(label, help, error, styles);
        }

        return selectpicker;
    }


}