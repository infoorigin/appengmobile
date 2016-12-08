
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, View ,H1} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  replaceAt,
} = actions;

class MyClaimDetail extends Component {

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
          <Title>Claim Detail</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
        
            <View style={styles.personClaim}>
            	<View style={styles.personClaimHeader}><H1>Processed</H1></View>
            	<View style={styles.claimDetailRecord}><Text style={styles.detailLabel}>Service From : </Text><Text>CT Med Helth</Text></View>
            	<View style={styles.claimDetailRecord}><Text style={styles.detailLabel}>For : </Text><Text>Robert</Text></View>
            	<View style={styles.claimDetailRecord}><Text style={styles.detailLabel}>On : </Text><Text>19 OCT 2016</Text></View>
            	<View style={styles.claimDetailRecord}><Text style={styles.detailLabel}>Claim Processed : </Text><Text>26 OCT 2016</Text></View>
            	<View style={styles.claimDetailRecord}><Text style={styles.detailLabel}>Members Pay : </Text><Text>$15</Text></View>
            </View>
            
            <View style={styles.claimBill}>
            	<View style={styles.claimDetailRecord}><Text style={styles.detailLabel}>Billed : </Text><Text>$80</Text></View>
            	<View style={styles.claimDetailRecord}><Text style={styles.detailLabel}>Applied Towards Deductable : </Text><Text>$0.0</Text></View>
            	<View style={styles.claimDetailRecord}><Text style={styles.detailLabel}>Paid by Coverage : </Text><Text>$36</Text></View>
            	<View style={styles.claimDetailRecord}><Text style={styles.detailLabel}>Paid by Spending Account : </Text><Text>$0.0</Text></View>
            </View>

          
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

export default connect(mapStateToProps, bindAction)(MyClaimDetail);
