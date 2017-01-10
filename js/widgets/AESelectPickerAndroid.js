var React = require('react');
var { View, Text, Picker } = require('react-native');

export default class AESelectPickerAndroid extends React.Component {

  constructor(props) {
    super(props);
    
  }

  render() {

      var options = this.props.options.map(({value, text}) => <Picker.Item key={value} value={value} label={text} />);

    return (
      <Picker
        accessibilityLabel={this.props.label}
        ref="input"
        style={this.props.styles.selectStyle}
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
    );
  }
}

AESelectPickerAndroid.propTypes = {
  
};