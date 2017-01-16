
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel as REFormLabel, FormInput as REFormInput, Card as RECard, Button as REButton } from 'react-native-elements';
import { CheckBox as NBCheckBox, Card as NBCard, CardItem as NBCardItem, Text as NBText } from 'native-base';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';
import AETextInput from '../../widgets/AETextInput';
import AECheckboxGroup from '../../widgets/AECheckboxGroup';
import AERadioButtonGroup from '../../widgets/AERadioButtonGroup';
import AEDatePicker from '../../widgets/AEDatePicker';
import AESelectPicker from '../../widgets/AESelectPicker';
import AEFormSection from '../aeformsection';
import {getBindingIdByNodeId, getDataByBindingId} from '../../utils/uiData'


export default class  AECard extends AEBaseComponent {  // eslint-disable-line

constructor(props) {
    super(props);

    this._callBacks = this._callBacks.bind(this);
  }
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

    _onUIDataChange(bindingId, updateData){
        let nodeId = this.props.basenode.configObjectId;
        this.props.onNodeDataChange(nodeId, bindingId, updateData);
    }

    _onUIBlur(bindingId, updateData){
        let nodeId = this.props.basenode.configObjectId;
        this.props.onUIBlur(nodeId, bindingId, updateData);
    }

    _callBacks(){
        return {
            onUIDataChange : this._onUIDataChange.bind(this),
            onUIBlur : this._onUIBlur.bind(this),
        };
    }

    _renderFormSection(section){
        let nodeId = this.props.basenode.configObjectId;
        let uiBindingId = getBindingIdByNodeId(this.props.data, nodeId);
        let sectiondata = getDataByBindingId(this.props.data, nodeId, uiBindingId)
        return (<AEFormSection key={uiBindingId+section.configObjectId} bindingId={uiBindingId} config={section} data={sectiondata} {...this._callBacks()}> </AEFormSection>);
    }

    _renderSingleForm(){ 
        
    }

    _renderFormRepeatable(){ 
        
    }


    render() {

        const selectOptions = [{value:1, text:"one"}, {value:2, text:"two"}, {value:3, text:"three"}, {value:4, text:"four"}];

        return (
            <View>
                
                <RECard containerStyle={{margin: 5}} titleStyle = {this.getInitialStyle().dividerItemText} 
                    title='React Native Element Card'>
                    {this.props.config.viewItems.map(function(item, i){
                        switch(item.configObjectType){
                            case "FormSection":
                                return this._renderFormSection(item);
                            case "Form" :
                                break;
                            case "Grid"  :
                                break;
                            default :
                                console.log("Invalid or unsupported view Item Type in Card Renderer",item.configObjectType)    ;
                        }

                    }.bind(this))}
               
               </RECard>

            </View>
        );
    }
}


