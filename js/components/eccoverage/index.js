
import React, { Component } from 'react';
import { Image,TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem,List, ListItem} from 'native-base';

import DataGrid from '../aedatagrid/';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const launchscreenBg = require('../../../img/basescreen.png');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

class Coverage extends Component { // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }
  render() {
  
  
  return (
  		

      <Container theme={myTheme}>
      	<Header>
          <Title>E-Care</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>
      
        <Image source={launchscreenBg} style={styles.imageContainer}>
         
          <View style={{ alignItems: 'flex-start', marginBottom: 50, marginTop:10}}>
            <H3 style={styles.text}>XXXXXX</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}>Coverage</H3>
          </View>
          
          <View >	
   				
						 
						 <View>
						 
             <DataGrid 
             girdId='8505ee57-8b85-42e4-a3e7-2481e3371d62' 
             nodeId='05817d40-92f2-4694-a1bb-9eeb5b6772cc' 
             baseUrl='http://ec2-52-4-99-199.compute-1.amazonaws.com:9900/mconfig'
						 onClick={()=>Alert.alert('Ok')}
						 />

						 </View>
						 
   					 

		   </View>
		   
        </Image>
      </Container>
    );
  }





}



function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Coverage);
