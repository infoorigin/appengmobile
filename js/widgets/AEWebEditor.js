'use strict';

import React from 'react';
import { View, TextInput, Platform, Button, Text, WebView, StyleSheet } from 'react-native';
import AEBaseWidget from './base/AEBaseWidget';
import computeProps from '../utils/computeProps';
import { NavigationActions } from 'react-navigation';

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';

const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://m.facebook.com';

export default class AEWebEditor extends AEBaseWidget {
 webview = null
    constructor(props) {
        super(props);
        this.state = {
            messagesReceivedFromWebView: 0,
            message: '',
        }
        this.postMessage = this.postMessage.bind(this);
         this.onMessage = this.onMessage.bind(this); 
         this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    }


    getInitialStyle() {
        return {

            editor: {
                default: {

                },
                normal: {

                },
                // the style applied when a validation error occours
                error: {

                },
                // the style applied when the textbox is not editable
                notEditable: {

                }
            }
        }
    }

    componentDidMount() {
        console.log("Component mounting done ");
    }

    componentStyle() {
        const isError = this._hasError();
        const initialStyle = this.getInitialStyle();

        let editorStyle = isError ? initialStyle.editor.error : initialStyle.editor.normal;
        if (!this._editable()) {
            textboxStyle = initialStyle.editor.notEditable;
        }


        return {
            ...this._baseComponentStyle(),
            editorStyle: editorStyle,
        }

    }

    _editable() {
        return this.props.config.type !== "LabelField";
    }

    prepareRootProps(textboxStyle) {
        var defaultProps = {

        }
        //return computeProps(this.props, defaultProps);
        return defaultProps;
    }

    _isTextArea() {

    }

    _multilineProps() {
        if (this._isTextArea())
            return { multiline: true, numberOfLines: 2 };
        else
            return { multiline: false };

    }

    onMessage(e) {
        console.log("received message from react :",e.nativeEvent.data);
        this.setState({
            messagesReceivedFromWebView: this.state.messagesReceivedFromWebView + 1,
            message: e.nativeEvent.data,
        })
    }

    postMessage() {
        console.log("postmessage 11 :");
        if (this.webview) {
            console.log("postmessage 2");
            this.webview.postMessage('"Hello" from React Native!');
        }
    }

    onNavigationStateChange(navstate){
        if(!navstate.loading) {
            console.log("loading done ? :",!navstate.loading);
            this.postMessage();
        }
            
    }



    render() {
        //const styles = this.componentStyle();
        // const base = this._baseRender(styles);
         const {messagesReceivedFromWebView, message} = this.state;
        return (
            
             <View style={styles.container}>
                 <Button
                onPress={() =>  this.props.dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }))}
                title="Open drawer2"
                />
                <Text>Messages received from web view: {messagesReceivedFromWebView}</Text>
                <Text>{message || '(No message)'}</Text>
                <View style={styles.buttons}>
                    <Button title="Send Message to Web View" enabled onPress={this.postMessage} />
                </View>
                   
                <WebView
                    ref={webview => {  this.webview = webview; }}
                    onNavigationStateChange={this.onNavigationStateChange}    
                    startInLoadingState = {true}
                    style={styles.webView}
                    source={{uri: "http://ec2-52-4-99-199.compute-1.amazonaws.com:9800/featuremanagement/static/editor.html"}}
                    onMessage={this.onMessage}
                />
           </View>
        );
    }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },
  spinner: {
    width: 20,
    marginRight: 6,
  },
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.5,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
});