
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
import AECardGrid from '../aetabgrid'
import {getBindingIdByNodeId, getDataByBindingId} from '../../utils/uiData'



export default class  AECard extends AEBaseComponent {  // eslint-disable-line

static propTypes = {
    type: React.PropTypes.string,
    configId:React.PropTypes.string,
    uiItems: React.PropTypes.array,
    nodeId:React.PropTypes.string,

  }
  
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
        this.props.onNodeDataChange(this.props.nodeId, bindingId, updateData);
    }

    _onUIBlur(bindingId, updateData){
        this.props.onUIBlur(this.props.nodeId, bindingId, updateData);
    }

    _onGridDetail(keys){
        this.props.onGridDetail(keys);
    }

    _callBacks(){
        return {
            onUIDataChange : this._onUIDataChange.bind(this),
            onUIBlur : this._onUIBlur.bind(this),
        };
    }

    _gridCallBacks(){
        return {
            onGridDetail : this._onGridDetail.bind(this),
        };
    }

    _renderFormSection(section){
        let uiBindingId = getBindingIdByNodeId(this.props.data, this.props.nodeId);
        let sectiondata = getDataByBindingId(this.props.data, this.props.nodeId, uiBindingId)
        return (<AEFormSection key={uiBindingId+section.configObjectId} bindingId={uiBindingId} config={section} data={sectiondata} {...this._callBacks()}> </AEFormSection>);
    }

    _renderForm(form){
        let uiBindingId = getBindingIdByNodeId(this.props.data, this.props.nodeId);
        let sectiondata = getDataByBindingId(this.props.data, this.props.nodeId, uiBindingId)
        let section = form.sections[0];
        return (<AEFormSection key={uiBindingId+section.configObjectId} bindingId={uiBindingId} config={section} data={sectiondata} {...this._callBacks()}> </AEFormSection>);
    }

    _renderGrid(grid){
       return (<AECardGrid key={grid.configObjectId}config={grid} data={this.props.data} {...this._gridCallBacks()}> </AECardGrid>);
    }

    _renderSingleForm(){ 
        
    }

    _renderFormRepeatable(){ 
        
    }


    render() {

         return (
            <View>
                
                <RECard containerStyle={{margin: 5}} titleStyle = {this.getInitialStyle().dividerItemText} 
                    title='React Native Element Card'>
                    {this.props.uiItems.map(function(item, i){
                        console.log("item.configObjectType :",item.configObjectType);
                        switch(item.configObjectType){
                            case "FormSection":
                                return this._renderFormSection(item);
                            case "Form" :
                                return this._renderForm(item);
                            case "DataGrid"  :
                                console.log("Data in Data Grid ",this.props.data);
                                return this._renderGrid(item);
                            default :
                                console.log("Invalid or unsupported view Item Type in Card Renderer",item.configObjectType)    ;
                        }

                    }.bind(this))}
               
               </RECard>

            </View>
        );
    }
}


