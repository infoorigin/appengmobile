import React, { Component, PropTypes } from 'react';
import {StyleSheet,View } from 'react-native';
import { connect } from 'react-redux';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import {loginAction} from '../../actions/user'

class LoginScreen extends Component {

	constructor(props) {
    super(props);

    this.state = {
      userid:"",
			password:""
    };
		this._login = this._login.bind(this);
	}

_login(){
	console.log("Submitting :",this.state) ;
	this.props.login(this.state.userid, this.state.password);
}

onUserIdInput
onPasswordInput

	render() {
		return (
			<View style={styles.container}>
				<Wallpaper>
					<Logo />
					<Form onUserIdInput={(userid) => this.setState({userid})} onPasswordInput={(password) => this.setState({password})}   />
					<SignupSection/>
					<ButtonSubmit isAuthenticated={this.props.isAuthenticated} onSubmit={this._login}/>
				</Wallpaper>
			</View>
		);
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

const bindAction = dispatch => ({
  login: (userid, password) => dispatch(loginAction(userid, password)),
});

const mapStateToProps = state => ({
  message : state.ae.userSession.message,
	isAuthenticated : state.ae.userSession.isAuthenticated
});


export default connect(mapStateToProps, bindAction)(LoginScreen);