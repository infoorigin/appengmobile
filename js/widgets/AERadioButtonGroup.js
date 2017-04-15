'use strict';

import React from 'react';
import {View, TextInput, Text, Platform} from 'react-native';
import AEBaseOptionsWidget from './base/AEBaseOptionsWidget';
import computeProps from '../utils/computeProps';
import AERadioButton from './AERadioButton';

export default class AERadioButtonGroup extends AEBaseOptionsWidget {

   constructor(props) {
		super(props);
		
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

    _renderOptions(styles){
        let radioOptions = this.state.options.map(function(option, i){
                return ( 
                    <View style={{flexDirection:'row' , margin :5}}>
                    <AERadioButton key={"rd"+i} animation={'bounceIn'}
                            isSelected={this._getData() == option.value}
                        onPress={() => this._onChange(option.value)}
                    />
                <Text style={styles.textStyle}>{option.label}</Text>
                </View>
                )
        }.bind(this));
        return radioOptions;
    }


    render() {

        const styles = this.componentStyle();
        const baseRender = this._baseRender(styles);

        return (
            <View style={styles.formGroupStyle}>
                {baseRender.label}
                 <View  key="1" style={{flexDirection:'row' , margin :10}} >
                   {this._renderOptions(styles)}                    
                 </View>
                {baseRender.help}
                {baseRender.error}
            </View>
        );
    }


}