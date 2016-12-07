
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import AccordionView from './aeaccordian.js';
import AEFormSection from './aeformsection.js'

const Item = Picker.Item;
const camera = require('../../../img/camera.png');





class AEForm extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    

    this.state = {
      formsections : [],
      formdata : []
    };
     this._onSectionDataChange = this._onSectionDataChange.bind(this);
     this._buildSection = this._buildSection.bind(this);
 
  }

  _initialSectionData(sectionItem) {
      let initialData = {};
      sectionItem.fields.forEach(f => initialData[f.name] = "");
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

  componentDidMount() {
    let sectionConfigs = [
      {
        name :"section1",
        fields : [
          {
          name : "S1Fld1",
          placeholder : "plc11"
          },
          {
            name : "S1Fld2",
            placeholder : "plc12"
          }
        ]
      },
      {
        name :"section2",
        fields : [
          {
          name : "S2Fld1",
          placeholder : "plc21"
          },
          {
            name : "S2Fld2",
            placeholder : "plc122"
          }
        ]
      }

    ]
    let formData = new Object();
    sectionConfigs.forEach(function(sf) {
        formData[sf.name] = this._initialSectionData(sf);
    }.bind(this)); 
    console.log("Component mount:",JSON.stringify(formData));
    let sections = sectionConfigs.map(function(sf){ 
                    return this._buildSection(sf,formData[sf.name]);
                  }.bind(this)); 
    

     this.setState({
      formsections: sections,
      formdata : formData
    });
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
          
        </Content>  
      </Container>
      
    );
  }
} 

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AEForm);
