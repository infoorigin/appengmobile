import React, { Component } from 'react';
import { Image, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, Header, View, H3, Text, Title, Icon, InputGroup,Input, Card, CardItem, List, ListItem } from 'native-base';
import GridRow from './row.js';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
import { SearchBar } from 'react-native-elements';
import AEContainer from '../../widgets/AEContainer';
import AEHeader from '../../widgets/AEHeader';


const contentscreenBg = require('../../../img/basescreen.png');
const launchscreenBg = require('../../../img/launchscreen-bg.png');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

class AEDataGrid extends Component {
	static propTypes = {
		config: React.PropTypes.object,
		data: React.PropTypes.array,
		onClick: React.PropTypes.func,
		openDrawer: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			isSearchHeader : false,
			header: []
		};
		this._renderTitleHeader = this._renderTitleHeader.bind(this);
		this._renderSearchHeader = this._renderSearchHeader.bind(this);
	}

	_renderTitleHeader(){
		return (

			
			
				<AEHeader>
					<Button transparent onPress={this.props.openDrawer}>
						<Icon name="ios-menu" />
					</Button>
					<Title>E-Care2</Title>
					<Button transparent>
						<Icon name="ios-search" />
					</Button>
					<Button transparent>
						<Icon name="md-add" />
					</Button>
				</AEHeader>
		);
	}

	_onSearchInput(val){
		console.log("Input changed");
	}

	_renderSearchHeader(){
		return (
/*
			<SearchBar
				onChangeText={this._onSearchInput}
				placeholder='Type Here...' />
*/

			<AEHeader searchBar="true">
				<InputGroup>
					<Icon name="ios-search" />
					<Input placeholder="Search" />
				</InputGroup>
				<Button transparent>
					Search2
				</Button>
			</AEHeader>
			
			
		);
	}

	render() {

		if (this.state.header.length == 0 || this.props.data.length == 0) {
			return (<Text> Loading..... </Text>);
		}
		else {
			let header = this.state.isSearchHeader ? this._renderTitleHeader() : this._renderSearchHeader()  ;
		return (
			<AEContainer theme={myTheme}>
				{header}
			<SearchBar
				onChangeText={this._onSearchInput}
				placeholder='Type Here...' />

				<View>

					<View style={styles.gridHeaderSection}>
						<H3 style={styles.text}>Robert's Claims</H3>
						<H3 style={styles.text}>{this.props.config.dataSet.name}</H3>
					</View>

					<SearchBar
				onChangeText={this._onSearchInput}
				placeholder='Type Here...' />

					<View source={contentscreenBg} style={styles.gridContainer}>
						<List dataArray={this.props.data}
							renderRow={(item, i, iteration) =>
								<GridRow  key={i} keyColunms={this.state.keyColunms} rowData={item} rowDescription={this.state.header} >
								</GridRow>
							}>
						</List>

					</View>
				</View>
			</AEContainer>

		);
		}

	}
	componentDidMount() {
		console.log("Config item from redux state :" + this.props.config);
		console.log("Config Init Grid Data[0] from redux state :", this.props.data[0]);
		this.initGrid();
	}


	initGrid() {
		var headerdata = this.props.config.gridColumns;
		headerdata = headerdata.filter(function (d) { return d.actionColoum == false; });
		headerdata = headerdata.sort(function (d1, d2) {
			if (d1.order > d2.order) {
				return 1;
			} else if (d1.order < d2.order) {
				return -1;
			} else {
				return 0;
			}
		});

		var keyColunms = headerdata.filter(function(gc){ return gc.logicalColumn.dbColumn.primaryKey | gc.logicalColumn.dbColumn.key;});

		this.setState({ header: headerdata,keyColunms:keyColunms});
	}

}

function bindActions(dispatch) {
	return {
		openDrawer: () => dispatch(openDrawer()),
	};
}

const mapStateToProps = state => ({
	navigation: state.cardNavigation,
	config: state.ae.grid.config,
	data: state.ae.grid.data ? state.ae.grid.data : [],
});

export default connect(mapStateToProps, bindActions)(AEDataGrid);
