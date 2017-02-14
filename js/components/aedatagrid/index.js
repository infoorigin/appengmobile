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
import AEModalContent from '../../widgets/AEModalContent';
import { getPrivilege } from '../../services/usercontext.js';
import { modalAddUIAction, resetModalAction, saveGridModalAction } from '../../actions/modal';

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
			header: [],
			searchText: ""
		};
		this._renderSearchHeader = this._renderSearchHeader.bind(this);
		this._renderTitleHeader = this._renderTitleHeader.bind(this);
		this._filterGrid = this._filterGrid.bind(this);
		this._onAddSave = this._onAddSave.bind(this);
		this._onCancelModal = this._onCancelModal.bind(this);
		this._onAdd = this._onAdd.bind(this);
	}

	_onAdd() {
		let nodeId = this.props.basenode.configObjectId;
		console.log(" _onAdd modalAddUI ", nodeId);
		this.props.modalAddUI(nodeId, this.props.baseNodeKeys);
	}

	_onAddSave() {
		console.log(" _onAdd Save ");
		let gridConfigId = this.props.config.configObjectId;
		let nodeId = this.props.basenode.configObjectId;
		this.props.saveModal(gridConfigId, nodeId);
		// cancel modal and refresh data action
	}

	_onCancelModal() {
		console.log(" _onCancelModal ");
		this.props.resetModal();
	}

	_filterGrid(text) {
		console.log('Search Text ', text);
		this.setState({
			searchText: text
		})
	}

	_renderSearchHeader() {
		return (
			<AEHeader searchBar="true">
				<InputGroup>
					<Icon name="ios-search" />
					<Input placeholder="Search" onChangeText={this._filterGrid} />
				</InputGroup>

				<Button transparent onPress={() => this.setState({ isSearchHeader: false, searchText: "" })}>
					Cancel
				</Button>
			</AEHeader>
		);
	}

	_renderModalHeader() {
		let title = this.props.basenode.name ? this.props.basenode.name : "";
		return (
			<AEHeader>
				<Button transparent onPress={this._onCancelModal}>
					<Icon name="md-close" />
				</Button>
				<Title>{title}</Title>
				<Button transparent onPress={this._onAddSave}>
					Save
                </Button>
			</AEHeader>
		);
	}

	_renderTitleHeader() {
		console.log("_renderTitleHeader");
		return (
			<AEHeader>
				<Button transparent onPress={this.props.openDrawer}>
					<Icon name="ios-menu" />
				</Button>
				<Title>E-Care</Title>
				<Button transparent onPress={() => this.setState({ isSearchHeader: true })}>
					<Icon name="ios-search" />
				</Button>
				<Button transparent onPress={this._onAdd}>
					<Icon name="md-add" />
				</Button>
			</AEHeader>
		);
	}

	_renderModalContent() {
		let nodeId = this.props.basenode.configObjectId;
		return (
			<AEModalContent modalUI={this.props.modalUI} nodeId={nodeId}>
			</AEModalContent>
		);
	}

	_renderHeader() {
		console.log("this.props.modalVisible :", this.props.modalVisible);
		if (this.props.modalVisible) {
			return this._renderModalHeader();
		}

		if (this.state.isSearchHeader)
			return this._renderSearchHeader();
		else
			return this._renderTitleHeader();
	}

	render() {

		if (this.state.header.length == 0 || this.props.data.length == 0) {
			return (<Text> Loading..... </Text>);
		}
		else {
			let modalContent = this._renderModalContent();
			let filterData = this._filtertedData();
			return (
				<AEContainer modalVisible={this.props.modalVisible} theme={myTheme} >

					{this._renderHeader()}

					<Image source={launchscreenBg} style={styles.imageContainer}>
						<View style={styles.gridHeaderSection}>
							<H3 style={styles.text}>{this.props.config.dataSet.name}</H3>
						</View>

						<View source={contentscreenBg} style={styles.gridContainer}>
							<List dataArray={filterData}
								renderRow={(item, i, iteration) =>
									<GridRow key={i} keyColunms={this.state.keyColunms} rowData={item} rowDescription={this.state.header} >
									</GridRow>
								}>
							</List>
						</View>
					</Image>

					{modalContent}
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
		this.setState({ header: headerdata, keyColunms: keyColunms });
	}

	_filtertedData() {
		const searchText = this.state.searchText ? this.state.searchText : "";
		const searchTextRegex = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
		let filteredColumns = this.state.header.filter(function (gcolumn) {
			if (getPrivilege(gcolumn).privilegeType) {
				return true;
			}
		}.bind(this));
		let filterData = [];
		this.props.data.map(function (rowData) {
			let filterRow = {};
			let isSearch = false;
			filteredColumns.map(function (cellDetail) {
				let cellData = rowData[cellDetail.logicalColumn.dbColumn.code] != null ? rowData[cellDetail.logicalColumn.dbColumn.code] : "";
				filterRow[cellDetail.logicalColumn.dbColumn.code] = cellData;
				isSearch = isSearch ? isSearch : searchTextRegex.test(cellData);
			});
			if (isSearch)
				filterData.push(filterRow);
		}.bind(this));
		console.log(" using filterDatafilterData for ", filterData);
		return filterData;
	}

}



function bindActions(dispatch) {
	return {
		openDrawer: () => dispatch(openDrawer()),
		resetModal: () => dispatch(resetModalAction()),
		modalAddUI: (nodeId, baseKeys) => dispatch(modalAddUIAction(nodeId, baseKeys)),
		saveModal: (gridConfigId, nodeId) => dispatch(saveGridModalAction(gridConfigId, nodeId)),
	};
}

const mapStateToProps = state => ({
	navigation: state.cardNavigation,
	config: state.ae.grid.config,
	data: state.ae.grid.data ? state.ae.grid.data : [],
	basenode: state.ae.cenode.config,
	baseNodeKeys: state.ae.cenode.keys ? state.ae.cenode.keys : {},
	modalUI: state.ae.modal.ui,
	modalVisible: state.ae.modal.visible,
});

export default connect(mapStateToProps, bindActions)(AEDataGrid);
