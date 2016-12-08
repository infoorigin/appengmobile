
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, View } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  replaceAt,
} = actions;

class MyClaim extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  replaceAt(route) {
    this.props.replaceAt('myclaim', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>My Claims</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
        
            <View style={styles.headerRow}>
            
            	<View style={styles.serviceDate}><Text style={styles.serviceDateText}>Service Date</Text></View> 
            	<View style={styles.claimDescription}><Text style={styles.claimDescriptionText}>Description </Text></View> 
            	<View style={styles.claimMyCost}><Text style={styles.claimMyCostText}>My Cost </Text></View>
            </View>
            
         	<List>
	           
	            <ListItem style={styles.oddListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >OCT 19 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Vikash Visited CT Med Helth.. in the amount $80</Text>
		               	 <View>
		               	 		<Text style={styles['PROCESSED']} >PROCESSED on OCT 26 2016</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		                   <View>
			               	 <Text>I OWE </Text>
			               	 <Text style={styles.mycost}>$15</Text>
		               	 </View>
		               	 <Icon name="ios-arrow-forward"></Icon>
		               </View>
	               </View>
	            </ListItem>
	            
	             <ListItem style={styles.evenListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >OCT 28 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Vikash Visited CT Med Helth.. in the amount $150</Text>
		               	 <View>
		               	 		<Text style={styles['PROCESSING']} >PROCESSING</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		               	 <View>
			               	 <Text>I OWE </Text>
			               	 <Text style={styles.mycost}>$25</Text>
		               	 </View>
		               	 <Icon name="ios-arrow-forward"></Icon>
		               </View>
	               </View>
	            </ListItem>
	            
	            
	            <ListItem style={styles.oddListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >Nov 10 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Sourabh Visited CT Med Helth.. in the amount $100</Text>
		               	 <View>
		               	 		<Text style={styles['PROCESSING']} >PROCESSING</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		               	 <View>
			               	 <Text>I OWE </Text>
			               	 <Text style={styles.mycost}>$20</Text>
		               	 </View>
		               	 <Icon name="ios-arrow-forward"></Icon>
		               </View>
	               </View>
	            </ListItem>
	            
	             <ListItem style={styles.evenListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >OCT 19 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Vikash Visited CT Med Helth.. in the amount $50</Text>
		               	 <View>
		               	 		<Text style={styles['PROCESSING']} >PROCESSING</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		               	 <Text>I OWE </Text>
		               	 <Text  style={styles.mycost} >$15</Text>
		               </View>
	               </View>
	            </ListItem>
	            
	            
	            <ListItem style={styles.oddListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >OCT 19 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Vikash Visited CT Med Helth.. in the amount $50</Text>
		               	 <View>
		               	 		<Text style={styles['PROCESSED']} >PROCESSED on OCT 21 2016</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		               	 <Text>I OWE </Text>
		               	 <Text style={styles.mycost}>$15</Text>
		               </View>
	               </View>
	            </ListItem>
	            
	             <ListItem style={styles.evenListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >OCT 19 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Vikash Visited CT Med Helth.. in the amount $50</Text>
		               	 <View>
		               	 		<Text style={styles['PROCESSING']} >PROCESSING</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		               	 <Text>I OWE </Text>
		               	 <Text  style={styles.mycost} >$15</Text>
		               </View>
	               </View>
	            </ListItem>
	            
	            
	            <ListItem style={styles.oddListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >OCT 19 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Vikash Visited CT Med Helth.. in the amount $50</Text>
		               	 <View>
		               	 		<Text style={styles['DENIED']} >DENIED on OCT 21 2016</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		               	 <Text>I OWE </Text>
		               	 <Text style={styles.mycost}>$15</Text>
		               </View>
	               </View>
	            </ListItem>
	            
	             <ListItem style={styles.evenListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >OCT 19 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Vikash Visited CT Med Helth.. in the amount $50</Text>
		               	 <View>
		               	 		<Text style={styles['PROCESSING']} >PROCESSING</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		               	 <Text>I OWE </Text>
		               	 <Text  style={styles.mycost} >$15</Text>
		               </View>
	               </View>
	            </ListItem>
	            
	            <ListItem style={styles.oddListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >OCT 19 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Vikash Visited CT Med Helth.. in the amount $50</Text>
		               	 <View>
		               	 		<Text style={styles['PROCESSED']} >PROCESSED on OCT 21 2016</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		               	 <Text>I OWE </Text>
		               	 <Text style={styles.mycost}>$15</Text>
		               </View>
	               </View>
	            </ListItem>
	            
	             <ListItem style={styles.evenListItem} onPress={() => this.replaceAt('detailClaim')}>
	            	<View style={styles.dataOddRow}>
		            	<View style={styles.serviceDateValue}>
		              		<Text >OCT 19 2016</Text>
		               </View>
		               <View style={styles.claimDescriptionValue}>
		               	
		               	 <Text>Vikash Visited CT Med Helth.. in the amount $50</Text>
		               	 <View>
		               	 		<Text style={styles['PROCESSING']} >PROCESSING</Text> 
		               	 </View>
		               </View>
		                <View style={styles.claimMyCostValue}>
		               	 <Text>I OWE </Text>
		               	 <Text  style={styles.mycost} >$15</Text>
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
    openDrawer: () => dispatch(openDrawer()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(MyClaim);
