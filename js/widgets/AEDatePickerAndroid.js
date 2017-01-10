import React, { PropTypes } from 'react';
import { View, Text, DatePickerAndroid, TimePickerAndroid, TouchableNativeFeedback  } from 'react-native';



export default class AEDatePickerAndroid extends React.Component {

  constructor(props) {
    super(props);
    
  }

  render() {

// Setup the picker mode
  var datePickerMode = 'date';
  if (this.props.mode === 'date' || this.props.mode === 'time') {
    datePickerMode = this.props.mode;
  }

    var formattedValue = String(this.props.value);
    var background = TouchableNativeFeedback.SelectableBackground(); // eslint-disable-line new-cap
    if (this.props.config) {
    if (this.props.config.format) {
      formattedValue = this.props.config.format(this.props.value);
    }
    if (this.props.config.background) {
      background = this.props.config.background;
    }
  }
  var value = this.props.value ? <Text style={this.props.styles.dateValueStyle}>{formattedValue}</Text> : null;
    return (
      <TouchableNativeFeedback
        accessible={true}
        ref="input"
        background={background}
        onPress={function () {
          if (datePickerMode === 'time') {
            TimePickerAndroid.open({is24Hour: true})
            .then(function (time) {
              if (time.action !== TimePickerAndroid.dismissedAction) {
                const newTime = new Date();
                newTime.setHours(time.hour);
                newTime.setMinutes(time.minute);
                this.props.onChange(newTime);
              }
            });
          } else {
            let config = {
              date: this.props.value || new Date()
            };
            if (this.props.minimumDate) {
              config.minDate = this.props.minimumDate;
            }
            if (this.props.maximumDate) {
              config.maxDate = this.props.maximumDate;
            }
            DatePickerAndroid.open(config)
            .then(function (date) {
              if (date.action !== DatePickerAndroid.dismissedAction) {
                var newDate = new Date(date.year, date.month, date.day);
                this.props.onChange(newDate);
              }
            });
          }
        }.bind(this) } >
        <View>
          {this.props.label}
          {value}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

AEDatePickerAndroid.propTypes = {
  
};