
import React, { Component } from 'react';
import { Image,TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem} from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const launchscreenBg = require('../../../img/launchscreen-bg.png');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

class Home extends Component { // eslint-disable-line

  static propTypes = {
   openDrawer: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
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
         
          <View style={{ alignItems: 'center', marginBottom: 50, marginTop:10, backgroundColor: 'transparent' }}>
            <H3 style={styles.text}>E-Care</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}>Welcome Robert</H3>
          </View>
          
          <View >	
   
          <View style={styles.cardContainer}> 

           <View style={{justifyContent:'space-around', padding:2}}> 
            <CardItem style={styles.cardItems} onPress={() => this.navigateTo('mysummary')}>
                  <Text style={styles.cardText}>VIEW MY SUMMARY</Text>
            </CardItem>
           
            <CardItem style={styles.cardItems} onPress={() => this.navigateTo('finddoctor')}>
              <Text style={styles.cardText}>FIND A DOCTOR</Text>
            </CardItem>
            </View>

            <View style={{justifyContent:'space-around', padding:2}}>
            <CardItem style={styles.cardItems} onPress={() => this.navigateTo('myclaim')}>
              <Text style={styles.cardText}>My Claims</Text>
            </CardItem>
            
            <CardItem style={styles.cardItems} onPress={() => this.navigateTo('mycoverage')}>
              <Text style={styles.cardText}>Coverage</Text>
            </CardItem>
            </View>
           
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
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Home);
