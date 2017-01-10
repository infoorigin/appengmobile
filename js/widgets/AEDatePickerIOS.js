import React, { PropTypes } from 'react';
import { Animated, View, TouchableOpacity, Text, DatePickerIOS } from 'react-native';

const UIPICKER_HEIGHT = 216;

export default class AEDatePickerIOS extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0)
    };
  }

  render() {
    const stylesheet = this.props.stylesheet;
    let touchableStyle = stylesheet.dateTouchable.normal;
    let datepickerStyle = stylesheet.datepicker.normal;
    let dateValueStyle = stylesheet.dateValue.normal;
    if (this.props.hasError) {
      touchableStyle = stylesheet.dateTouchable.error;
      datepickerStyle = stylesheet.datepicker.error;
      dateValueStyle = stylesheet.dateValue.error;
    }
    let formattedValue = String(this.props.value);
    let animation = Animated.timing;
    let animationConfig = {
      duration: 200
    };
    if (this.props.config) {
      if (this.props.config.format) {
        formattedValue = this.props.config.format(this.props.value);
      }
      if (this.props.config.animation) {
        animation = this.props.config.animation;
      }
      if (this.props.config.animationConfig) {
        animationConfig = this.props.config.animationConfig;
      }
    }
    const height = (this.state.isCollapsed) ? 0 : UIPICKER_HEIGHT;
    return (
      <View>
        <TouchableOpacity style={touchableStyle}
          onPress={() => {
            animation(this.state.height, Object.assign({
              toValue: (this.state.isCollapsed) ? UIPICKER_HEIGHT : 0
            }, animationConfig)).start();
            this.setState({isCollapsed: !this.state.isCollapsed});
          }}>
          <Text style={dateValueStyle}>
            {formattedValue}
          </Text>
        </TouchableOpacity>
        <Animated.View style={{height: this.state.height, overflow: 'hidden'}}>
          <DatePickerIOS
            ref="input"
            accessibilityLabel={this.props.label}
            date={this.props.value}
            maximumDate={this.props.maximumDate}
            minimumDate={this.props.minimumDate}
            minuteInterval={this.props.minuteInterval}
            mode={this.props.mode}
            onDateChange={(value) => this.props.onChange(value)}
            timeZoneOffsetInMinutes={this.props.timeZoneOffsetInMinutes}
            style={[datepickerStyle, {height: height}]}
          />
        </Animated.View>
      </View>
    );
  }
}

AEDatePickerIOS.propTypes = {
  
};