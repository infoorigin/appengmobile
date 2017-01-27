'use strict';

import React from 'react';
import {View, Text, Platform} from 'react-native';
import AEBaseWidget from './AEBaseWidget';
import { getSelectOptions } from '../../services/api';

export default class AEBaseOptionsWidget  extends AEBaseWidget {

    constructor(props) {
        super(props);
         this._queryOptions = this._queryOptions.bind(this);
        this.state = {
            options: this.props.config.metadataUISelectItems && this.props.config.metadataUISelectItems.length ?
                this.props.config.metadataUISelectItems : [],
            radioSelected: false,    
        }
    }

     _onChange(text) {
        this.props.onBlur(this._fieldDBCode(), text);
    }

    defaultProps() {
        return {
            placeholder: this.props.config.placeHolder ? this.props.config.placeHolder : "",
            value: this._getData(),
            onChange: this._onChange,
        };
    }

    _queryOptions() {
        let options = getSelectOptions(this.props.config.configObjectId, this.props.data);
        options.then(function (response) {
                if (response.data.status) {
                    this.setState({
                        options: response.data.returnData.data,
                    });
                }
            }.bind(this))
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });

    }

}