
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;


function vw(percentageWidth) {
  return Dimensions.get('window').width * (percentageWidth / 100);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

module.exports = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30,
  },
  logo: {
    position: 'absolute',
    left: (Platform.OS === 'android') ? 40 : 50,
    top: (Platform.OS === 'android') ? 35 : 60,
    width: 280,
    height: 100,
  },
  text: {
    color: '#D8D8D8',
    bottom: 6,
  },
  
  cardContainer:{
  		flex: 1,
  		backgroundColor: 'transparent',
  		flexDirection: 'row',
  		justifyContent: 'center',
  		alignItems: 'flex-end',
  },
  
  cardItems: {
  		flex:1,
  		justifyContent: 'center',
  		alignItems: 'center',
  		flexDirection: 'column',
  		
  		backgroundColor: 'cyan',
  		width:vw(90) / 2,
		height:vh(100) / 4,
  		marginLeft:5,
  		marginTop:5,
  		borderRadius:10,
  		padding:40,
  },
  
  cardText: {
  		textAlign: 'center',
  		textAlignVertical :'center',
  }
  
  
});
