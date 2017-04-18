'use strict';

import React from 'react';
import { Text, View, ListView, StyleSheet, Modal } from 'react-native';
import { Icon, Button } from 'native-base';
import HTMLView from 'react-native-htmlview';
import AEBaseWidget from './base/AEBaseWidget';
import AEModalEditor from './AEModalEditor';
import computeProps from '../utils/computeProps';
import { NavigationActions } from 'react-navigation';

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';

const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://m.facebook.com';

export default class AEHTMLView extends AEBaseWidget {
    webview = null
    constructor(props) {
        super(props);
        this.state = {
            isModalEditor : false,
            value : this._getData(),
        }
        this._closeModalAndSave = this._closeModalAndSave.bind(this);

    }


    getInitialStyle() {
        return {

            editicon : {
                container: {
                    flex: 1,
                    flexDirection: 'row'
                }, 
                button : {
                    marginBottom: 2,
                }
            },
            editor: {
                default: {
                     a: {
                        fontWeight: '300',
                        color: '#FF3366', // pink links
                    },
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
        const initial = this.getInitialStyle().editor;

        let editorStyle = isError ? {...initial.default, ...initial.error} : {...initial.default, ...initial.normal};
        
        return {
            ...this._baseComponentStyle(),
            editorStyle: editorStyle,
            editicon : this.getInitialStyle().editicon,
        }

    }



    prepareRootProps(textboxStyle) {
        var defaultProps = {
            
        }
        //return computeProps(this.props, defaultProps);
        return defaultProps;
    }

    _renderEditIcon(styles){
        return (
            <Button  transparent  
                onPress={() => this._enableModal()}
            >
                <Icon  style={ { marginBottom: 10, fontSize: 30, color: 'dodgerblue'}} name='ios-create' />
            </Button>
           //<Icon name='ios-create' />
        )
    }

    _renderModal(){
        return <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.isModalEditor}
            onRequestClose={() => {console.log("Editor Modal Closed")}} >
                <AEModalEditor content={this._getData()} closeModalAndSave={this._closeModalAndSave}/>
        </Modal> ;
    }

    _enableModal(){
        console.log("Enabling Modal");
        this.setState({
            isModalEditor : true,
        });
    }

    _closeModalAndSave(value){
        console.log("Closing Editor ", value) ;
        this.setState({
            isModalEditor : false,
            value
        });
        this.props.onBlur(this._fieldDBCode(), value);
    }

    render() {
        const styles = this.componentStyle();
        const base = this._baseRender(styles);
        base.label = base.label != null ? base.label : <Text style={styles.controlLabelStyle}>{"Description"}</Text> ;
        console.log("this._getData() :",this._getData());
        return (
            <View>
                <View style={styles.editicon.container} > 
                    {base.label}
                    {this._renderEditIcon(styles)}
                </View>
                 <HTMLView value={this.state.value} stylesheet={styles.editorStyle} />
                {base.help}
                {base.error}
                {this._renderModal()}
            </View>
        );
    }


}

// const styles = StyleSheet.create({
//     a: {
//         fontWeight: '300',
//         color: '#FF3366', // pink links
//     },
// });