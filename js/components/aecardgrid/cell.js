import React, { Component } from 'react';
import {  Text} from 'native-base';
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