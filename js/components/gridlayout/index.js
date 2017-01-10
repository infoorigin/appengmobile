
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import AEContainer from '../../widgets/AEContainer';
import AEHeader from '../../widgets/AEHeader';
import AECard from '../aecard';

import { openDrawer } from '../../actions/drawer';

class AEGridLayout extends Component {  // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  render() {
    return (
      <AEContainer>
        <AEHeader>
          <Title>GridLayout with AECard</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </AEHeader>

        <Content>
          <AECard>
          </AECard>
        </Content>
      </AEContainer>
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
  config: state.ae.layout.config,
	data: [],
});

export default connect(mapStateToProps, bindAction)(AEGridLayout);
