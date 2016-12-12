
const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

module.exports = StyleSheet.create({
    text: {
    color: '#D8D8D8',
    bottom: 6,
  },
  textCell: {
  		textAlign: 'right',
  		textAlignVertical :'center',
  },
  numberCell: {
  		textAlign: 'right',
  		textAlignVertical :'center',
      color:'red'
  },
  currencyCell: {
  		textAlign: 'right',
  		textAlignVertical :'center',
        color:'red'
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
    
  },

});
