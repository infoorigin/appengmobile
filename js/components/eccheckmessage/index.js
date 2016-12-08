
import React, { Component } from 'react';
import { Image,TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem,List, ListItem} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const launchscreenBg = require('../../../img/basescreen.png');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

class MyMessage extends Component { // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }



  render() {
  
   var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can','Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];
  
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
            <H3 style={styles.text}>Messages</H3>
          </View>
          
          <View >	
   			<Text> Message List </Text>
       		<List dataArray={items}
                        renderRow={(item) =>
                            <ListItem>
                                 <Text>{item}</Text>
                                <Text>Name : ok</Text>
                                 <Text>Name : ok1</Text>
                            </ListItem>
                        }>
                    </List>
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

export default connect(mapStateToProps, bindActions)(MyMessage);
