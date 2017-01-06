import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput ,
  Input,
  TouchableHighlightS
} from 'react-native';
import { connect } from 'react-redux';
import AEDropdown from './aedropdown.js';
import AETextInput from './aetextinput.js';
import AERadio from './aeradio.js';
import AECheckbox from './aecheckbox.js';
import AEDatePicker from './aedatepicker';
import {getPrivilege} from '../../services/usercontext.js';

class AEFormSection extends Component {
 static propTypes = {
    getPrivilege:React.PropTypes.func,
  }

constructor(props) {
    super(props);
    
    this.state = { 
        data : props.sectionData,
        messageData:props.messageData
     };
     this._onInputChange2 = this._onInputChange2.bind(this);
     this._onInputBlur = this._onInputBlur.bind(this);
   }

   componentDidMount() {
       
   }

_onInputChange2(fieldName, value){
    let data = this.state.data;
    
    data[fieldName] = value;
    this.setState({ 
        data : data
     });
     console.log("updated input :",fieldName, value, JSON.stringify(data));
     this.props.onSectionDataChange(this.props.sectionItem.name, data);
}

 componentWillReceiveProps(nextProps)
  {
    //this.pullMD();
    this.setState({messageData:nextProps.messageData});
    console.log('nextProps of formsection ======================');
  }

_onInputBlur(){
  console.log("On Input Blur called");
  //submit action here
}  

getElementsWithPrivilege(){
    
       let filteredFields = this.props.sectionItem.renderColumns.filter(function(rc){
            if(this.props.getPrivilege(rc).privilegeType){
                return true;
            }
        }.bind(this));
        
        return  filteredFields;
  }


render() {
  console.log("Form Section rendered............................................");
  return(
 
    <View style={{padding:10}}>
      {
        this.getElementsWithPrivilege().filter(function(rc){if(rc.type != 'Hiddenfield')return true;}).map(function(field, key){
            
            
             let validationFlag="NOMESSAGE";
             let validationMessage="";
             
             if(this.state.messageData.dataValidationMessages){
               if(this.state.messageData.dataValidationMessages[field.logicalColumn.jsonName]){
                 validationFlag="ERRORMESSAGE";
                 validationMessage=this.props.messageData.dataValidationMessages[field.logicalColumn.jsonName];
                 console.log("Validation message ================="+validationMessage);
               }
             }
             console.log("field.type>>>>>>>>>>>>>>>>>>>>>>>>"+field.type);


         
            
             switch(field.type) {
                                case 'SelectOption':
                                   return(
                                          <AEDropdown key={key} 
                                            validationFlag={validationFlag}
                                            validationMessage={validationMessage}
                                            value={this.state.data[field.logicalColumn.jsonName]}
                                            onInputChange={this._onInputChange2} 
                                            field = {field}
                                          />
                                         );
                                case 'CheckBox':
                                   return(
                                          <AECheckbox key={key}
                                               validationFlag={validationFlag}
                                               validationMessage={validationMessage}
                                               
                                               value={this.state.data[field.logicalColumn.jsonName]}
                                                onInputChange={this._onInputChange2} 
                                              field = {field}
                                              itemsPerRow='4'
                                            />
                                          );
                                case 'RadioButton':
                                   return(
                                          <AERadio key={key}
                                            validationFlag={validationFlag}
                                            validationMessage={validationMessage}

                                            value={this.state.data[field.logicalColumn.jsonName]}
                                              onInputChange={this._onInputChange2} 
                                            field = {field}
                                            itemsPerRow='4'
                                          />
                                        );
                               case 'DatePicker':
                                     return(
                                        <AEDatePicker />
                                        
                                     );
                                default:
                                return(
                                   <AETextInput key={key}
                                    
                                     validationFlag={validationFlag}
                                     validationMessage={validationMessage}

                                    value={this.state.data[field.logicalColumn.jsonName]}
                                      onInputChange={this._onInputChange2} 
                                    field = {field}
                                  />
                                );
             }

        }.bind(this))
      }
      </View>   

        
  );    

}

}

function bindAction(dispatch) {
  return {
    getPrivilege:(configItem) => getPrivilege(configItem)
  };
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, bindAction)(AEFormSection);