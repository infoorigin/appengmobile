
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  text: {
    alignSelf: 'center',
    marginBottom: 7, 
  },
  mb: {
    marginBottom: 15,
  },
  detailCard:{
  		flex:1,
  		flexDirection: 'column',
  },
  
  detailLabel:{
  	fontWeight:'bold'
  },
   coverageDetailRecord:{
  		flexDirection: 'row'
   },
   detailText:{
   	flex: 1,
   	flexWrap:'wrap',
   },
   
   oddRecord:{
   	  backgroundColor: '#f5f3f3',
   },
   
    evenRecord:{
   	  backgroundColor: '#ffffff',
   },
  
  
});
