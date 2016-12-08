
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
  		
  		backgroundColor: '#5d67b1',
  		width:vw(90) / 2,
		height:vh(100) / 4,
  		marginLeft:5,
  		marginTop:5,
  		borderRadius:10,
  		padding:40,
  		opacity:0.5,
  },
  
  cardText: {
  		textAlign: 'center',
  		textAlignVertical :'center',
  },
  
  
  headerRow:{
  	 	flex:1,
  		justifyContent: 'space-around',
  		flexDirection: 'row',
  	
  		backgroundColor:'#5d67b1',
  		marginTop:20,
  		paddingLeft:10
  },
  
  serviceDate:{
  	 width:vw(90) / 4,
  },
  serviceDateText:{
  	 color:'white',
  },
   claimDescription:{
  	 width:vw(90) / 2,
  },
  claimDescriptionText:{
  	 color:'white',
  },
   claimMyCost:{
  	 width:vw(90) / 5,
  },
   claimMyCostText:{
  	 color:'red',
  },
  
  
  
  evenListItem:{
  		backgroundColor:'#ffffff',
  		marginLeft:0,
  		paddingLeft:5,
  },
  oddListItem:{
  		backgroundColor:'#c3c3c3',
  		marginLeft:0,
  		paddingLeft:5,
  },
 
  
  
  dataOddRow:{
  	 	flex:1,
  		justifyContent: 'space-between',
  		flexDirection: 'row',
  		marginTop:5,
  		
  },
  serviceDateValue:{
  	 width:vw(90) / 4,
  },
  serviceDateTextValue:{
  	 color:'blue',
  },
   claimDescriptionValue:{
  	 width:vw(90) / 2,
  },
  claimDescriptionTextValue:{
  	 color:'blue',
  },
   claimMyCostValue:{
  	 width:vw(90) / 5,
  	   flex:1,
  		justifyContent: 'space-between',
  		flexDirection: 'row',
  		paddingLeft:10
  },
   claimMyCostTextValue:{
  	 color:'red',
  },
  
  
  		PROCESSED:{color:'green'},
  		PROCESSING:{color:'blue'},
  		DENIED:{color:'red'},

  mycost:{
  	color:'red'
  },
  
  
  
  personClaim:{
  		flex:1,
  		justifyContent: 'space-around',
  		flexDirection: 'column',
  		marginTop:20,
  		paddingLeft:10
  },
  
  
  personClaimHeader:{
  		fontSize:40,
  		color:'blue'
  },
  
  detailLabel:{
  	fontWeight:'bold'
  },
  
   personClaim:{
   	paddingLeft:10
   },
   claimBill:{
   	paddingLeft:10,
   	marginTop:20
   },
   
   claimDetailRecord:{
   	flex:1,
  		justifyContent: 'flex-start',
  		flexDirection: 'row',
  		
   }
   
});
