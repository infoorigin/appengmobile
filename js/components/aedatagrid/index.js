import React, { Component } from 'react';
import { Image, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, View, H3, Text, Header, Title, Icon, Card, CardItem, List, ListItem } from 'native-base';
import GridRow from './row.js';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';

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
			header: []
		};
	}

	render() {

		if (this.state.header.length == 0 || this.props.data.length == 0) {
			return (<Text> Loading..... </Text>);
		}
		return (
			<Container theme={myTheme}>
				<Header>
					<Title>E-Care</Title>
					<Button transparent onPress={this.props.openDrawer}>
						<Icon name="ios-menu" />
					</Button>
				</Header>

				<Image source={launchscreenBg} style={styles.imageContainer}>

					<View style={{ alignItems: 'center', marginBottom: 50, marginTop: 10 }}>
						<H3 style={styles.text}>Robert's Claims</H3>
						<View style={{ marginTop: 8 }} />
						<H3 style={styles.text}>{this.props.config.dataSet.name}</H3>
					</View>
					<Image source={contentscreenBg} style={styles.imageContainer}>
						<List dataArray={this.props.data}
							renderRow={(item, i, iteration) =>
								<ListItem key={i}>
									<GridRow rowData={item} rowDescription={this.state.header} />
								</ListItem>
							}>
						</List>

					</Image>
				</Image>
			</Container>

		);

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
		this.setState({ header: headerdata });
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
