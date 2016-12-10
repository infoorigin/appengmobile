

const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;


function vw(percentageWidth) {
  return Dimensions.get('window').width * (percentageWidth / 90);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },

   aeradiorow: {flexDirection:'row'},
   aeradiocol: {flexDirection:'column', flex:1,padding:10},

});
