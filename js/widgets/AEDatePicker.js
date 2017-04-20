'use strict';

import React from 'react';
import { View, TextInput, Text, Platform } from 'react-native';
import AEBaseComponent from './base/AEBaseComponent';
import computeProps from '../utils/computeProps';
import AEDatePickerIOS from './AEDatePickerIOS';
import AEDatePickerAndroid from './AEDatePickerAndroid';
import AEBaseWidget from './base/AEBaseWidget';
import { resolveExpression } from '../utils/exprexecutor';
import { VIEW_PRIVILEGE, EDIT_PRIVILEGE } from '../services/usercontext.js';

export default class AEDatePicker extends AEBaseWidget {

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
            dateTouchableStyle: dateTouchableStyle,
            datepickerStyle: datepickerStyle,
            formGroupStyle: formGroupStyle,
            controlLabelStyle: controlLabelStyle,
            helpBlockStyle: helpBlockStyle,
            errorBlockStyle: errorBlockStyle
        }

    }

    _renderIOSDatePicker(baseRender, styles) {
        return (
            <View style={styles.formGroupStyle}>
                {baseRender.label}
                <AEDatePickerIOS {...this.defaultProps() } styles={styles} />
                {baseRender.help}
                {baseRender.error}
            </View>
        );
    }

    _onChange(text) {
        this.props.onBlur(this._fieldDBCode(), text);
    }

    defaultProps() {
        return {
            placeholder: this.props.config.placeHolder ? this.props.config.placeHolder : "",
            value: this._getData(),
            onChange: this._onChange,
            mode: this.props.config.type === "DatePicker" ? "date" : "time",
        };
    }

    _mode() {
        return this.props.config.type === "DatePicker" ? "date" : "time";
    }

    _renderAndroidDatePicker(baseRender, styles) {
        return (
            <View style={styles.formGroupStyle}>
                <AEDatePickerAndroid  {...this.defaultProps() } label={baseRender.label} styles={styles} />
                {baseRender.help}
                {baseRender.error}
            </View>
        );
    }

    _renderNonEditable(baseRender, styles) {
        return (
            <View style={styles.formGroupStyle}>
                {baseRender.label}
                {this._nonEditableField()}
                {baseRender.help}
                {baseRender.error}
            </View>
        );
    }



    render() {

        const styles = this.componentStyle();
        const baseRender = this._baseRender(styles);
        let datepicker = null;

        const isEditable = resolveExpression(this.props.config.editabilityRegEx, this.props.data);

        if (!isEditable || this.props.privilege == VIEW_PRIVILEGE) {
            return this._renderNonEditable(baseRender, styles);
        }

        if (Platform.OS === 'ios') {
            datepicker = this._renderIOSDatePicker(baseRender, styles);
        }
        else { // android
            datepicker = this._renderAndroidDatePicker(baseRender, styles);
        }

        return datepicker;
    }


}