
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import AccordionView from './aeaccordian.js';
import AEFormSection from './aeformsection.js'
import {getPrivilege} from '../../services/usercontext.js';

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
  }

  constructor(props) {
    super(props);

    this.state = {
      formMD:{},
      formsections : [],
      formdata : []
    };
     this._onSectionDataChange = this._onSectionDataChange.bind(this);
     this._buildSection = this._buildSection.bind(this);
 
  }

  _initialSectionData(sectionItem,data) {
      let initialData = {};
      sectionItem.renderColumns
      .filter(function(rc){if(rc.type != 'Hiddenfield')return true;}).forEach(f => initialData[f.logicalColumn.jsonName] = data[f.logicalColumn.jsonName]);
    return initialData;
  }

  _buildSection(sectionItem, sectionData) {
    console.log("sectionConfig :", JSON.stringify(sectionItem))
      let section = {
          title: sectionItem.name,
          content: <AEFormSection onSectionDataChange={this._onSectionDataChange} sectionData={sectionData} sectionItem={sectionItem}> </AEFormSection>,
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


 async pullMD(){

          
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
    this.pullMD();
  }

  _onSectionDataChange(name, sectiondata) {
    let formdata = this.state.formdata;
    formdata[name] = sectiondata;
    this.setState({
      formdata: formdata,
    });

    console.log("After FormData2 value :",JSON.stringify(formdata));
  }
  

  render() {
    return (
      
      
      <Container style={styles.container}>
        <Header>
          <Title>Form8</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
          <AccordionView  sections = {this.state.formsections}/>
          <Button primary> Primary </Button>
        </Content>  
      </Container>
      
    );
  }
} 

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    getPrivilege:(configItem) => getPrivilege(configItem)
  };
}

const mapStateToProps = state => ({
	navigation: state.cardNavigation,
	formMD: state.ae.form.config,
  data: state.ae.form.data ? state.ae.form.data.baseEntity.attributes : {},
});


export default connect(mapStateToProps, bindAction)(AEForm);
