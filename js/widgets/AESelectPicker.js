'use strict';

import React from 'react';
import { View, TextInput, Text, Platform } from 'react-native';
import AEBaseWidget from './base/AEBaseWidget';
import computeProps from '../utils/computeProps';
import AESelectPickerIOS from './AESelectPickerIOS';
import AESelectPickerAndroid from './AESelectPickerAndroid';


export default class AESelectPicker extends AEBaseWidget {

    constructor(props) {
        super(props);
        this._renderIOSSelectPicker = this._renderIOSSelectPicker.bind(this);
        this._renderAndroidSelectPicker = this._renderAndroidSelectPicker.bind(this);
        this._queryOptions = this._queryOptions.bind(this);
         this.state = {
             options: this.props.config.metadataUISelectItems && this.props.config.metadataUISelectItems.length ?
                        this.props.config.metadataUISelectItems :[],
         }
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
		if(!this.state.options.length)
            this. _queryOptions();
	}

    _queryOptions() {
        /*
        this.serverRequest = AEReactUtils.restAjaxCall(AEAPIUtils.selectOptionsURL(this.props.field.md.configObjectId), 
                "POST", this.props.formInput.internalApiKey, stateDataToCode);
        
        this.serverRequest.done(function( result ) {
            if(result.status){
                this.setState({
                    options : result.returnData.data
                });
            }
        } */
        const selectOptions = [{value:"1", id:"1" ,label:"one"}, {value:"2", id:"2", label:"two"}, {value:"3", id:"3", label:"three"}, {value:"4", id:"4", label:"four"}];
        
        this.setState({
            options : selectOptions,
        });
					
				
	}

    _onChange(text){
         this.props.onBlur(this._fieldDBCode(), text);
    }

    defaultProps() {
        return {
            placeholder : this.props.config.placeHolder ? this.props.config.placeHolder:"", 
            value : this._getData(),
            onChange: this._onChange,
        };
    }

    _renderIOSSelectPicker(baseRender, styles) {
        return (
            <View style={styles.formGroupStyle}>
                {baseRender.label}
                <AESelectPickerIOS options={this.state.options} {...this.props} {...this.defaultProps()} styles={styles} />
                {baseRender.help}
                {baseRender.error}
            </View>
        );
    }


    _renderAndroidSelectPicker(baseRender, styles) {
        return (
            <View style={styles.formGroupStyle}>
                {baseRender.label}
                <AESelectPickerAndroid options={this.state.options} {...this.props} {...this.defaultProps()} styles={styles} />
                {baseRender.help}
                {baseRender.error}
            </View>
        );
    }

    render() {

        const styles = this.componentStyle();
        const baseRender = this._baseRender(styles);

        let selectpicker = null;
        if (Platform.OS === 'ios') {
            selectpicker = this._renderIOSSelectPicker(baseRender, styles);
        }
        else { // android
            selectpicker = this._renderAndroidSelectPicker(baseRender, styles);
        }

        return selectpicker;
    }


}