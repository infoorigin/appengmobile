'use strict';

import React from 'react';
import { View, TextInput, Text, Platform } from 'react-native';
import AEBaseOptionsWidget from './base/AEBaseOptionsWidget';
import computeProps from '../utils/computeProps';
import AESelectPickerIOS from './AESelectPickerIOS';
import AESelectPickerAndroid from './AESelectPickerAndroid';
import { NO_PRIVILEGE, VIEW_PRIVILEGE, EDIT_PRIVILEGE, getPrivilege } from '../services/usercontext.js';

export default class AESelectPicker extends AEBaseOptionsWidget {

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


        }
    }

    componentStyle() {
        const isError = this.props.hasError;
        const initialStyle = this.getInitialStyle();

        let pickerValueStyle = isError ? initialStyle.pickerValue.error : initialStyle.pickerValue.normal;
        let pickerTouchableStyle = isError ? initialStyle.pickerTouchable.error : initialStyle.pickerTouchable.normal;
        let selectStyle = isError ? initialStyle.select.error : initialStyle.select.normal;

        return {
            ...this._baseComponentStyle(),
            pickerValueStyle: pickerValueStyle,
            pickerTouchableStyle: pickerTouchableStyle,
            selectStyle: selectStyle,

        }

    }

    componentDidMount() {
        if (!this.state.options.length)
            this._queryOptions();
    }

    _renderIOSSelectPicker(baseRender, styles) {
        return (
            <View style={styles.formGroupStyle}>
                {baseRender.label}
                <AESelectPickerIOS options={this.state.options} {...this.props} {...this.defaultProps() } styles={styles} />
                {baseRender.help}
                {baseRender.error}
            </View>
        );
    }


    _renderAndroidSelectPicker(baseRender, styles) {
        return (
            <View style={styles.formGroupStyle}>
                {baseRender.label}
                <AESelectPickerAndroid options={this.state.options} {...this.props} {...this.defaultProps() } styles={styles} />
                {baseRender.help}
                {baseRender.error}
            </View>
        );
    }

    _input(styles, privilege) {
        let input = null;
        if (privilege == VIEW_PRIVILEGE) {
            input = this._nonEditablePickerField();
        }
        else {
            if (Platform.OS === 'ios') {
                input = <AESelectPickerIOS options={this.state.options} {...this.props} {...this.defaultProps() } styles={styles} />;
            }
            else { // android
                input = <AESelectPickerAndroid options={this.state.options} {...this.props} {...this.defaultProps() } styles={styles} />;
            }

        }
        return input;
    }

    render() {
        const privilege = getPrivilege(this.props.config, this.props.user);
        if (privilege == NO_PRIVILEGE)
            return null;

        const styles = this.componentStyle();
        const baseRender = this._baseRender(styles);
        return (
            <View style={styles.formGroupStyle}>
                {baseRender.label}
                {this._input(styles, privilege)}
                {baseRender.help}
                {baseRender.error}
            </View>
        );
       
    }


}