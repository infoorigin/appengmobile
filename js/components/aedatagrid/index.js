import React, { Component } from 'react';
import { Image,TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,Content, Button, View, H3, Text,Header,Title,Icon, Card, CardItem, List, ListItem} from 'native-base';
import GridRow from './row.js'; 
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';

const contentscreenBg = require('../../../img/basescreen.png');
const launchscreenBg = require('../../../img/launchscreen-bg.png');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

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



 class AEDataGrid extends Component { 



	static propTypes = {
    	girdId: React.PropTypes.string,
		nodeId: React.PropTypes.string,
		baseUrl: React.PropTypes.string,
		onClick: React.PropTypes.func,
		openDrawer: React.PropTypes.func,
  	 }
  	 
	constructor(props) {
	  super(props);
	  this.state = {
	    header: [],
	    dataList:[],
		gridInfo:{}
	  };
	}

	render(){

		if(this.state.header.length==0 || this.state.dataList.length==0){
			return (<Text> Loading..... </Text>);
		}
		console.log(this.state);
		return (
		 <Container theme={myTheme}>
			<Header>
			<Title>E-Care</Title>
			<Button transparent onPress={this.props.openDrawer}>
				<Icon name="ios-menu" />
			</Button>
			</Header>
      
        	<Image source={launchscreenBg} style={styles.imageContainer}>
         
			<View style={{ alignItems: 'center', marginBottom: 50, marginTop:10}}>
				<H3 style={styles.text}>Robert's Claims</H3>
				<View style={{ marginTop: 8 }} />
				<H3 style={styles.text}>{this.state.gridInfo.dataSet.name}</H3>
			</View>
			<Image source={contentscreenBg} style={styles.imageContainer}>
			<List dataArray={this.state.dataList}
					renderRow={(item,i,iteration) =>
							<ListItem  key={i}>
								<GridRow  rowData={item} rowDescription={this.state.header}/>
							</ListItem>
					}>  
			</List>

			</Image>
		   </Image>
		</Container>
	 
	    );
	
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
				var gridInfo=jsondata.returnData.data;
				console.log('------------------------------------');
				console.log(gridInfo.label);
				console.log('------------------------------------');
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
				this.setState({gridInfo:gridInfo});
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

function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(AEDataGrid);
