import React, { Component } from 'react';
import { Modal, Image, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, InputGroup, Input, View, H3, Text, Header, Title, Icon, Card, CardItem, List, ListItem } from 'native-base';
import GridRow from './row.js';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
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
			isSearchHeader: false,
			modalVisible: false,
			header: []
		};
		this._renderSearchHeader = this._renderSearchHeader.bind(this);
		this._renderTitleHeader = this._renderTitleHeader.bind(this);
		this._filterGrid = this._filterGrid.bind(this);
		this._setModalVisible = this._setModalVisible.bind(this);
		this._onModalHide = this._onModalHide.bind(this);
	}

	_setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	_onModalHide(hide){
		console.log("received modal callback ",hide);
		this.setState({ modalVisible: !hide });
	}

	_filterGrid(text) {
		console.log('Search Text ', text);
		this._setModalVisible(!this.state.modalVisible);
	}

	_renderSearchHeader() {
		return (
			<AEHeader searchBar="true">
				<InputGroup>
					<Icon name="ios-search" />
					<Input placeholder="Search" onChangeText={this._filterGrid} />
				</InputGroup>

				<Button transparent onPress={() => this.setState({ isSearchHeader: false })}>
					Cancel
				</Button>
			</AEHeader>
		);
	}

	_renderTitleHeader() {
		return (
			<AEHeader>
				<Button transparent onPress={this.props.openDrawer}>
					<Icon name="ios-menu" />
				</Button>
				<Title>E-Care</Title>
				<Button transparent onPress={() => this.setState({ isSearchHeader: true })}>
					<Icon name="ios-search" />
				</Button>
				<Button transparent onPress={this.props.openDrawer}>
					<Icon name="md-add" />
				</Button>
			</AEHeader>
		);
	}

	render() {

		if (this.state.header.length == 0 || this.props.data.length == 0) {
			return (<Text> Loading..... </Text>);
		}
		else {
			let header = this.state.isSearchHeader ? this._renderSearchHeader() : this._renderTitleHeader();
			return (
				<AEContainer theme={myTheme}  modalVisible={this.state.modalVisible}  onModalHide={this._onModalHide}>
					{header}

					
						<Image source={launchscreenBg} style={styles.imageContainer}>
							<View style={styles.gridHeaderSection}>
								<H3 style={styles.text}>Robert's Claims</H3>
								<H3 style={styles.text}>{this.props.config.dataSet.name}</H3>
							</View>

							<View source={contentscreenBg} style={styles.gridContainer}>
								<List dataArray={this.props.data}
									renderRow={(item, i, iteration) =>
										<GridRow key={i} keyColunms={this.state.keyColunms} rowData={item} rowDescription={this.state.header} >
										</GridRow>
									}>
								</List>

							</View>
						</Image>
					
				</AEContainer>

			);
		}

	}
	componentDidMount() {
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
		let keyColunms = this.props.config.gridColumns.filter(function (gc) { return gc.logicalColumn.dbColumn.primaryKey | gc.logicalColumn.dbColumn.key; });
		console.log("keyColunms :",keyColunms);
		this.setState({ header: headerdata, keyColunms: keyColunms });
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
