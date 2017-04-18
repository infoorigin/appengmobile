'use strict';

import React from 'react';
import { View, TextInput, Platform, Text, WebView, StyleSheet } from 'react-native';
import AEBaseWidget from './base/AEBaseWidget';
import computeProps from '../utils/computeProps';
import { NavigationActions } from 'react-navigation';

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';

const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://m.facebook.com';

export default class AEModalEditor extends AEBaseWidget {
 webview = null
    constructor(props) {
        super(props);
        this.state = {
          
        }
        
    }


    onMessage(e) {
        console.log("received message from react :",e.nativeEvent.data);
         this.props.closeModalAndSave(e.nativeEvent.data)
       
    }

    postMessage() {
        if (this.webview) {
            this.webview.postMessage(this.props.content);
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
                
                <WebView
                    ref={webview => {  this.webview = webview; }}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}    
                    startInLoadingState = {true}
                    style={styles.webView}
                    source={{uri: "http://ec2-52-4-99-199.compute-1.amazonaws.com:9800/featuremanagement/static/editor.html"}}
                    onMessage={this.onMessage.bind(this)}
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
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  
});