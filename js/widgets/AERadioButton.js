import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import {View} from 'react-native-animatable';
import AEBaseComponent from './base/AEBaseComponent';

const DEFAULT_SIZE_MULTIPLIER = 0.7
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.2

export default class AERadioButton extends AEBaseComponent {
  static propTypes = {
    size: PropTypes.number, 
    innerColor: PropTypes.string,
    outerColor: PropTypes.string,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func
  }

  static defaultProps = {
    size: 12,
    innerColor: 'dodgerblue',
    outerColor: 'dodgerblue',
    isSelected: false,
    onPress: () => null
  }
 
  render () {
    const {  innerColor, outerColor, isSelected, onPress } = this.props
    const size =  this.getTheme().fontSizeBase;
    const outerStyle = { 
      borderColor: outerColor,
      width: size + size * DEFAULT_SIZE_MULTIPLIER,
      height: size + size * DEFAULT_SIZE_MULTIPLIER,
      borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
      borderWidth: size * DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER
    }

    const innerStyle = {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: innerColor
    }

    return (
      <TouchableOpacity style={[styles.radio, outerStyle]} onPress={onPress}>
        {isSelected ? <View style={innerStyle} {...this.props} /> : null}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})