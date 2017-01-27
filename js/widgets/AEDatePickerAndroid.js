import React, { PropTypes } from 'react';
import moment from 'moment';
import { View, Text, DatePickerAndroid, TimePickerAndroid, TouchableNativeFeedback  } from 'react-native';



export default class AEDatePickerAndroid extends React.Component {

  constructor(props) {
    super(props);
    
  }

  _onChangeTime(time){
    //TODO use date format provided in this.props.config.format
    let momentTime = moment().hour(time.hour).minute(time.minute) ;
    console.log(" updated time :",momentTime.format('hh:mm a'));
    this.props.onChange(momentTime.format('hh:mm a').toString());
    
  }

  _onChangeDate(newDate){
    //TODO use date format provided in this.props.config.format
    let momentDate = moment(newDate).format('YYYY-MM-DD');
    console.log(" updated date :",momentDate.toString());
    this.props.onChange(momentDate.toString());
    
  }



  render() {

// Setup the picker mode
  let datePickerMode = 'date';
  if (this.props.mode === 'date' || this.props.mode === 'time') {
    datePickerMode = this.props.mode;
  }

  const background = TouchableNativeFeedback.SelectableBackground(); // eslint-disable-line new-cap
  const textValue = this.props.value ? <Text style={this.props.styles.dateValueStyle}>{this.props.value}</Text> : null;
  let datetimevalue = null;
  if(datePickerMode === 'date') {
    //TODO use date format provided in this.props.config.format
    datetime = moment(this.props.value).isValid() ?  moment(this.props.value): moment.utc().local();
  }
  else {
    datetime = moment(this.props.value, 'hh:mm a').isValid() ?  moment(this.props.value, 'hh:mm a'):moment.utc().local();
  }
  
    return (
      <TouchableNativeFeedback
        accessible={true}
        ref="input"
        background={background}
        onPress={function () {
          if (datePickerMode === 'time') {
            TimePickerAndroid.open({hour:datetime.hour(), minute: datetime.minute(), is24Hour: false})
            .then(function (time) {
              if (time.action !== TimePickerAndroid.dismissedAction) {
                this._onChangeTime(time);
              }
            }.bind(this));
          } else {
            let config = {
              date: datetime.toDate() 
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
                this._onChangeDate(date);
              }
            }.bind(this));
          }
        }.bind(this) } >
        <View>
          {this.props.label}
          {textValue}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

AEDatePickerAndroid.propTypes = {
  
};