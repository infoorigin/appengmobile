import React, { Component } from 'react';
import { Image,TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem, List, ListItem} from 'native-base';
import GridRow from './row.js';

const configUrl='/rest/md/';
const dataUrl='/rest/gridData/';

const configRequestHeader= {
			  method: 'GET',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			    'app-key':'db6003e6-0093-4e3d-a8d0-d4ff26b750c2',
				 'mediaType' :'json'
			  }
};

const dataRequestHeader= {
			  method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			    'app-key':'db6003e6-0093-4e3d-a8d0-d4ff26b750c2',
				 'mediaType' :'json'
			  },
			  body:JSON.stringify( { 
				  baseEntity : {
					  				name : "Business Process",
									attributes : {APP_LOGGED_IN_PROJECT_ID:0 }, 
									childEntities :[] 
								}
				}),
};



 class DataGrid extends Component { 

	static propTypes = {
    	girdId: React.PropTypes.string,
		nodeId: React.PropTypes.string,
		baseUrl: React.PropTypes.string,
		onClick: React.PropTypes.func,
  	 }
  	 
	constructor(props) {
	  super(props);
	  this.state = {
	    header: [],
	    dataList:[]
	  };
	}


	render(){

		if(this.state.header.length==0 || this.state.dataList.length==0){
			return (<Text> Loading..... </Text>);
		}

		return (
		  
		  <List dataArray={this.state.dataList}
                renderRow={(item,i,iteration) =>
             <ListItem  onPress={this.props.onClick}>
			 	<GridRow  rowData={item} rowDescription={this.state.header}/>
			
				<Icon name="ios-arrow-forward"></Icon>
					
             </ListItem>
         }> 
     </List>);
	
	}
	componentDidMount(){
		this.loadData();
	}


	async loadData(){
	      
			var headerCompleteUrl=this.props.baseUrl+ configUrl + this.props.girdId;
			var dataCompleteUrl=this.props.baseUrl+ dataUrl + this.props.nodeId;
			
			 await fetch(headerCompleteUrl,configRequestHeader).then((response)=> response.json()).then(
	        	function (jsondata) {  
 	   			var headerdata=jsondata.returnData.data.gridColumns;
 	   			headerdata = headerdata.filter(function(d){return d.actionColoum==false; });
 	   			headerdata = headerdata.sort(function(d1,d2){ 
 	   				if(d1.order>d2.order){
 	   					return 1;
 	   				}else if(d1.order<d2.order){
 	   					return -1;
 	   				}else{
 	   					return 0;
 	   				}
 	   			});

 	   			this.setState({header:headerdata});
				}.bind(this)).catch(function (error) {  
  					console.log('Request failure: ', error);  
				}); 

			await fetch(dataCompleteUrl,dataRequestHeader).then((response)=> response.json()).then(
	        	function (jsondata) {  
 	   			var businessData=jsondata.returnData.data;
 	   			
			   this.setState({dataList:businessData});
				
			   }.bind(this)).catch(function (error) {  
  					console.log('Request failure: ', error);  
				});

	      
				
				
	}

}
export default (DataGrid);