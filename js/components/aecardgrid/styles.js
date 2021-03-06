
const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;

module.exports = StyleSheet.create({

  gridLabel:{
    color:'gray',
    fontSize:14, 
    textAlign:'right'
  },
   gridText:{
    color:'black',
    fontSize:16,
    paddingLeft:5,
  },
  gridRow:{
      flex:1, 
      flexDirection:'row',
      alignItems:'center',
      borderBottomWidth: 1,
      borderColor : '#ddd',
      padding : 10
  },
  gridCell:{flex:4/5, flexDirection:'row'},
  gridRowData:{flex:10},
  gridRowDetailLink:{flex:1},
  gridRowDetailLinkImage:{height:40, width:20},

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

   gridContainer: {
    flex: 1,
    width: null,
    backgroundColor: 'white',
  },
  gridHeaderSection:{ alignItems: 'center', marginBottom: 20, marginTop: 10 }


});
