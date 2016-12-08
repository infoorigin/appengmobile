
import React, { Component } from 'react';
import { Image,TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const launchscreenBg = require('../../../img/basescreen.png');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

class Summary extends Component { // eslint-disable-line

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
         
          <View style={{ alignItems: 'flex-start', marginBottom: 50, marginTop:10, backgroundColor: 'transparent' }}>
            <H3 style={styles.text}>XXXXXX</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}>My Summary</H3>
          </View>
          
          <View >	
   			<Text> Message List </Text>
       
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

export default connect(mapStateToProps, bindActions)(Summary);
