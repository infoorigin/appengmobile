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
import AETextArea from './aetextarea.js';
import {getPrivilege} from '../../services/usercontext.js';

class AEFormSection extends Component {
 static propTypes = {
    getPrivilege:React.PropTypes.func,
  }

constructor(props) {
    super(props);
    
    this.state = { 
        data : props.sectionData
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

  return(
 
    <View style={{padding:10}}>
      {
        this.getElementsWithPrivilege().filter(function(rc){if(rc.type != 'Hiddenfield')return true;}).map(function(field, key){
       
             switch(field.type) {
                                case 'selectoption':
                                   return(
                                          <AEDropdown key={key}
                                            value={this.state.data[field.logicalColumn.jsonName]}
                                              onInputChange={this._onInputChange2} 
                                            field = {field}
                                          />
                                         );
                                case 'checkbox':
                                   return(
                                          <AECheckbox key={key}
                                              value={this.state.data[field.logicalColumn.jsonName]}
                                                onInputChange={this._onInputChange2} 
                                              field = {field}
                                              itemsPerRow='4'
                                            />
                                          );
                                case 'radiooption':
                                   return(
                                          <AERadio key={key}
                                            value={this.state.data[field.logicalColumn.jsonName]}
                                              onInputChange={this._onInputChange2} 
                                            field = {field}
                                            itemsPerRow='4'
                                          />
                                        );
                                case 'textarea':
                                     return(
                                        <AETextArea key={key}
                                            value={this.state.data[field.logicalColumn.jsonName]}
                                              onInputChange={this._onInputChange2} 
                                            field = {field}
                                            itemsPerRow='4'
                                          />
                                     );
                                default:
                                return(
                                   <AETextInput key={key}
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