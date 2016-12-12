import React, { Component } from 'react';
import { Image,TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem, List, ListItem} from 'native-base';
import styles from './styles';
class NumericCell extends Component{
 
    constructor(props){
        super(props);
        this.state={
                cellData:this.props.cellData, 
                cellDescription:this.props.cellDescription,
        };
    }

    render(){   
        return (<Text style={styles.numberCell}>{this.state.cellDescription.headerName} : {this.state.cellData}</Text>);    
    }

}

class TextCell extends Component{

    constructor(props){
        super(props);
        this.state={
                cellData:this.props.cellData, 
                cellDescription:this.props.cellDescription,
        };
    }

    render(){   
        return (<Text>{this.state.cellDescription.headerName} : {this.state.cellData}</Text>);    
    }

}
export default (NumericCell,TextCell);