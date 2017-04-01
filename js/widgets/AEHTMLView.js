'use strict';

import React from 'react';
import { Text, View, ListView, StyleSheet, Button } from 'react-native';
import HTMLView  from 'react-native-htmlview';
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
            
        }
      
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

    
    render() {
        //const styles = this.componentStyle();
        // const base = this._baseRender(styles);
        const htmlContent = '<p>hi</p><ul><li>111</li><li>222</li><li>333</li><li>444</li></ul><p><b>ddd</b></p>';

        return (
            <View>
                  <Button
                onPress={() =>  this.props.dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }))}
                title="Open drawer2"
                />
            <HTMLView
            value={htmlContent}
            stylesheet={styles}
            />    
            </View>         
        );
    }


}

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // pink links
  },
});