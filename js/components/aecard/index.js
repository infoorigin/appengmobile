
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel as REFormLabel, FormInput as REFormInput, Card as RECard, Button as REButton } from 'react-native-elements';
import { CheckBox as NBCheckBox, Card as NBCard, CardItem as NBCardItem, Text as NBText } from 'native-base';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';
import AETextInput from '../../widgets/AETextInput';
import AECheckboxGroup from '../../widgets/AECheckboxGroup';
import AERadioButtonGroup from '../../widgets/AERadioButtonGroup'
import AEDatePicker from '../../widgets/AEDatePicker'

export default class  AECard extends AEBaseComponent {  // eslint-disable-line

    getInitialStyle() {
        return {
            itemText: {
                fontSize:  15,
                color: this.getContextForegroundColor(),
                flex: 1
            },
            dividerItemText: {
                fontSize: 17,
                textAlign:'left',
                fontWeight: '500',
                color: this.getContextForegroundColor(),
                flex: 1,
                paddingLeft: 10,
                backgroundColor: 'transparent'
            }
        };
    }


    render() {
        return (
            <View>
                
                <RECard containerStyle={{margin: 5}} titleStyle = {this.getInitialStyle().dividerItemText} 
                    title='React Native Element Card'>
                    <AETextInput hasError="true" error="Error message" label="Text Label" placeholder ="placeholder text">
                    </AETextInput>
                    <AECheckboxGroup hasError="true" error="Error message" label="Checkbox Label">
                    </AECheckboxGroup>
                    
                    <AERadioButtonGroup hasError="true" error="Error message" label="Radio Label">
                    </AERadioButtonGroup>

                    <AEDatePicker hasError="true" error="Error message" label="Date Picker" value={new Date()}>
                    </AEDatePicker>
                    
                    
                    <Text style={this.getInitialStyle().itemText}>
                        The idea with React Native Elements is more about component structure than actual SB design.
                    </Text>
                    
                    <REFormLabel>Name</REFormLabel>
                    <REFormInput />

                    <REButton
                        raised
                        icon={{ name: 'cached' }}
                        title='BUTTON WITH ICON' />

                </RECard>

            </View>
        );
    }
}


