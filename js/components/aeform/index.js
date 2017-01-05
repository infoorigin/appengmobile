
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, 
  InputGroup, Input, Picker, Text, Thumbnail,View } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import AccordionView from './aeaccordian.js';
import AEFormSection from './aeformsection.js'
import {getPrivilege} from '../../services/usercontext.js';
import {updateBaseForm} from '../../actions/ce.js';

const Item = Picker.Item;
const camera = require('../../../img/camera.png');

const configUrl='/rest/md/';
const configRequestHeader= {
			  method: 'GET',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			    'app-key':'db6003e6-0093-4e3d-a8d0-d4ff26b750c2',
				 'mediaType' :'json'
			  }
};
class AEForm extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    formid:React.PropTypes.string,
    baseUrl: React.PropTypes.string,
    getPrivilege:React.PropTypes.func,
    updateBaseForm:React.PropTypes.func,
    messageData:React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      formMD:{},
      formsections : [],
      formdata : [],
      messageData:this.props.messageData?this.props.messageData:{},
    };
     this._onSectionDataChange = this._onSectionDataChange.bind(this);
     this._buildSection = this._buildSection.bind(this);
     this.submit = this.submit.bind(this);
     this.testRefresh=this.testRefresh.bind(this);
     
  }
  

  _initialSectionData(sectionItem,data) {
      let initialData = {};
     //.filter(function(rc){if(rc.type != 'Hiddenfield')return true;})
      sectionItem.renderColumns.forEach(f => initialData[f.logicalColumn.jsonName] = data[f.logicalColumn.jsonName]);
    return initialData;
  }

  _buildSection(sectionItem, sectionData) {
    console.log("this.state.messageData :", JSON.stringify(this.state.messageData))
      let section = {
          title: sectionItem.name,
          content: <AEFormSection 
                    messageData={this.state.messageData}
                    onSectionDataChange={this._onSectionDataChange} 
                    sectionData={sectionData} 
                    sectionItem={sectionItem}> 
                    </AEFormSection>,
        };
      return section;
  }

 getElementsWithPrivilege(){
    
       let filteredSection = this.props.formMD.sections.filter(function(section){
            if(this.props.getPrivilege(section).privilegeType){
                return true;
            }
        }.bind(this));
        
        return  filteredSection;
  }

  testRefresh(){
    console.log('------------------------------->testRefresh',JSON.stringify(this.state));
  }

  submit(){
    console.log('form is getting submitted...');
    let mergedFormData = {};
    this.props.formMD.sections.forEach(function(section){
      mergedFormData= Object.assign(mergedFormData,this.state.formdata[section.name]);
    }.bind(this));
    console.log('------------------------------->merged'+JSON.stringify(mergedFormData));
    this.props.updateBaseForm(mergedFormData);
    
  }

 async prepareFormSections(){

          
          var formMD=this.props.formMD;
          
          let formData = new Object();

          formMD.sections.forEach(function(sf) {
              formData[sf.name] = this._initialSectionData(sf,this.props.data);
          }.bind(this)); 
          
          let sections = this.getElementsWithPrivilege().map(function(sf){ 
                          return this._buildSection(sf,formData[sf.name]);
                        }.bind(this)); 
      
          this.setState({
            formsections: sections,
            formdata : formData
          });
      
  }
  
  componentDidMount() {
    this.prepareFormSections();
  }

  _onSectionDataChange(name, sectiondata) {
    let formdata = this.state.formdata;
    formdata[name] = sectiondata;
    this.setState({
      formdata: formdata,
    });

    console.log("After FormData2 value :",JSON.stringify(formdata));
  }
  
  componentWillReceiveProps(nextProps)
  {
     this.state.messageData=nextProps.messageData;
     this.prepareFormSections();
     console.log('nextProps of form ======================');
  }
  render() {
    console.log("Form............................................");
    return (

      <Container style={styles.container}>
        <Header>
          <Title>Form8</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
          <Text>{this.state.messageData.globalMessage}</Text>         
          <AccordionView  sections = {this.state.formsections}/>
          <View style={{flexDirection:'row', flex:1,padding:10,justifyContent:'space-around'}}>
          <Button primary style={{alignSelf:'center'}} onPress={this.submit}> Submit </Button>
          <Button primary style={{alignSelf:'center'}} onPress={this.testRefresh}> Refresh </Button>
          </View>
        </Content>  
      </Container>
      
    );
  }
} 


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    getPrivilege:(configItem) => getPrivilege(configItem),
    updateBaseForm:(mergedFormData) => dispatch(updateBaseForm(mergedFormData)),
  };
}

const mapStateToProps = state => ({
	navigation: state.cardNavigation,
	formMD: state.ae.form.config,
  data: state.ae.form.data ? state.ae.form.data.baseEntity.attributes : {},
  messageData:state.ae.form.messageData,
});

export default connect(mapStateToProps, bindAction)(AEForm);
