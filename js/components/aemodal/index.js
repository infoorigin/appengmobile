'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { StyleSheet,  ScrollView } from 'react-native';
import {Button, Icon,Text, View } from 'native-base';
import styles from './styles';
import AEBaseComponent from '../../widgets/base/AEBaseComponent';


class AEModal extends AEBaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3
        };
    }

    openModal(id) {
        console.log("openModal");
        //this.refs.modal1.open();
    }

    closeModal(id) {
        this.setState({isOpen: false});
    }

    toggleDisable() {
        this.setState({ isDisabled: !this.state.isDisabled });
    }

    toggleSwipeToClose() {
        this.setState({ swipeToClose: !this.state.swipeToClose });
    }

    onClose() {
        console.log('Modal just closed');
    }

    onOpened() {
        console.log('Modal just openned');
    }

    onClosingState(state) {
        console.log('the open/close of the swipeToClose just changed');
    }

    componentDidMount() {
        if(this.props.isOpen){
            console.log("componentDidMount open modal :");
            this.refs.modal1.open();
        }
    
    }

  componentWillReceiveProps(newprops) {
   console.log("componentWillReceiveProps :");
    if(this.newprops.isOpen){
            console.log("componentWillReceiveProps open modal :");
            this.refs.modal1.open();
        }
        else {
            this.refs.modal1.close();
        }
  }

    render() {
         ;
        return (
            <Modal ref={"modal1"} swipeToClose={this.state.swipeToClose} onClosed={this.onClose} onOpened={this.onOpen} onClosingState={this.onClosingState}>
                <Text>Basic modal</Text>
            </Modal>
        );
    }
}

function bindAction(dispatch) {
    return {
       
    };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AEModal);