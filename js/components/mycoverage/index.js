
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, H2,H1,View , Hr} from 'native-base';

import styles from './stylesk';

const {
  replaceAt,
} = actions;

class MyCoverage extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  replaceAt(route) {
    this.props.replaceAt('mycoverage', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.replaceAt('home')}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>My Coverage</Title>
        </Header>

        <Content>
          
          
          
          <List>
      
      		<ListItem>
            <View style={styles.detailCard}>
            	
              <H2>Coverage Detail</H2>
            
              <View style={styles.coverageDetailRecord}>
              		<Text style={styles.detailLabel}>Who Is Covered : </Text> 
              		<Text>Vikas Kumar</Text>
              </View>
              
               <View style={styles.coverageDetailRecord}>
              		<Text style={styles.detailLabel}>Relationship : </Text> 
              		<Text>Subscriber</Text>
              </View>
              
               <View style={styles.coverageDetailRecord}>
              		<Text style={styles.detailLabel}>Coverage From : </Text> 
              		<Text>19 JAN 2016</Text>
              </View>
              
               <View style={styles.coverageDetailRecord}>
              		<Text style={styles.detailLabel}>To : </Text> 
              		<Text>*</Text>
              </View>
             
            </View>
            </ListItem>
				
				<ListItem>
            
            <View style={{flex:1,flexDirection:'column'}}>
            
            <View style={styles.detailCard}>
            
              <H2>Preventive Care</H2>
              
              <View style={styles.oddRecord}>
             
              <View style={styles.coverageDetailRecord}>
              		<Text style={styles.detailLabel}>Coverages : </Text> 
              		<Text>Immunizations</Text>
              </View>
               <View style={styles.coverageDetailRecord}>
              		  <Text style={styles.detailLabel}>In Network : </Text> 
						
              </View>
              <View>
              			<Text style={styles.detailText}>You pay 100% until the plan deductible is met THEN Plan pays 100% of the remaining covered amount</Text>
              </View>
              
               <View style={styles.coverageDetailRecord}>
              		<Text style={styles.detailLabel}>Out of Network : </Text> 
              </View>
              <View>
              		<Text style={styles.detailText}>You pay 100% until the plan deductible is met THEN You pay 40% of the remaining covered amount
						</Text>
              </View>
              
             
             </View>
             
            </View>
            
            
            <View style={styles.detailCard}>
            
              <H2>Well Child Care</H2>
              
              <View style={styles.evenRecord}>
             
              <View style={styles.coverageDetailRecord}>
              		<Text style={styles.detailLabel}>Coverages : </Text> 
              		<Text>Immunizations</Text>
              </View>
               <View style={styles.coverageDetailRecord}>
              		  <Text style={styles.detailLabel}>In Network : </Text> 
						
              </View>
              <View>
              			<Text style={styles.detailText}>You pay 100% until the plan deductible is met THEN Plan pays 100% of the remaining covered amount</Text>
              </View>
              
               <View style={styles.coverageDetailRecord}>
              		<Text style={styles.detailLabel}>Out of Network : </Text> 
              </View>
              <View>
              		<Text style={styles.detailText}>You pay 100% until the plan deductible is met THEN You pay 40% of the remaining covered amount
						</Text>
              </View>
              
             
             </View>
             
            </View>
            </View>
				</ListItem>
				
				
				


		   </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(MyCoverage);
