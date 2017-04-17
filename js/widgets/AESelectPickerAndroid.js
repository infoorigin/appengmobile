import React, { PropTypes } from 'react';
import {  View,Text, Picker } from 'react-native';

export default class AESelectPickerAndroid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value : this.props.onChange
    };
    this._onChange = this._onChange.bind(this);
  }

  _onChange(value){
    this.setState({
      value,
    });
    this.props.onChange(value);
  }

  render() {
    let options = this.props.options.map(({id, value, label}) => <Picker.Item key={id} value={id} label={label} />);
    const defaultSelect = <Picker.Item key="d000-0" value="" label={" "} />;
    options.unshift(defaultSelect);

    return (
      <Picker
        accessibilityLabel={this.props.label}
        ref="input"
        style={this.props.styles.selectStyle}
        selectedValue={this.state.value}
        onValueChange={this._onChange}
        help={this.props.help}
        enabled={this.props.enabled}
        mode={this.props.mode}
        prompt={this.props.prompt}
        itemStyle={this.props.itemStyle}
      >
        {options}
      </Picker>
    );
  }
}

AESelectPickerAndroid.propTypes = {
  
};