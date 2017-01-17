import React, { PropTypes } from 'react';
import { Animated, View, TouchableOpacity, Text, Picker } from 'react-native';

const UIPICKER_HEIGHT = 216;

export default class AESelectPickerIOS extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0)
    };
  }

  render() {
    const styles = this.props.styles;
    let pickerContainer = styles.pickerContainer.normal;
    let pickerContainerOpen = styles.pickerContainer.open;
    let selectStyle = styles.select.normal;
    let touchableStyle = styles.pickerTouchable.normal;
    let touchableStyleActive = styles.pickerTouchable.active;
    let pickerValue = styles.pickerValue.normal;
    if (this.props.hasError) {
      selectStyle = styles.select.error;
      touchableStyle = styles.pickerTouchable.error;
      pickerValue = styles.pickerValue.error;
    }

    let animation = Animated.timing;
    let animationConfig = {
      duration: 200
    };
    if (this.props.config) {
      if (this.props.config.animation) {
        animation = this.props.config.animation;
      }
      if (this.props.config.animationConfig) {
        animationConfig = this.props.config.animationConfig;
      }
    }

    const options = this.props.options.map(({value, label}) => <Picker.Item key={value} value={value} label={label} />);
    const selectedOption = this.props.options.find(option => option.value === this.props.value);

    const height = (this.state.isCollapsed) ? 0 : UIPICKER_HEIGHT;
    return (
      <View style={[pickerContainer, (!this.state.isCollapsed) ? pickerContainerOpen : {}]}>
        <TouchableOpacity style={[touchableStyle, this.state.isCollapsed ? {} : touchableStyleActive]}
          onPress={() => {
            animation(this.state.height, Object.assign({
              toValue: (this.state.isCollapsed) ? UIPICKER_HEIGHT : 0
            }, animationConfig)).start();
            this.setState({isCollapsed: !this.state.isCollapsed});
          }}>
          <Text style={pickerValue}>
            {selectedOption.text}
          </Text>
        </TouchableOpacity>
        <Animated.View style={{height: this.state.height, overflow: 'hidden'}}>
          <Picker
            accessibilityLabel={this.props.label}
            ref="input"
            style={selectStyle}
            selectedValue={this.props.value}
            onValueChange={this.props.onChange}
            help={this.props.help}
            enabled={this.props.enabled}
            mode={this.props.mode}
            prompt={this.props.prompt}
            itemStyle={this.props.itemStyle}
          >
            {options}
          </Picker>
        </Animated.View>
      </View>
    );
  }
}

AESelectPickerIOS.propTypes = {
  
};