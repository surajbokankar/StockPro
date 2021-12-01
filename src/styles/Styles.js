
import {StyleSheet} from 'react-native';
import {Colors} from '../constant/ColorConstant';
export const Styles=StyleSheet.create({
    input: {
        borderRadius: 5,
        borderWidth: 1,
        width: '90%',
        justifyContent: 'space-evenly',
        padding: 10,
        letterSpacing: 0.2,
        paddingLeft: 18,
        fontSize: 15,
        shadowColor: '#ddd',
        borderColor: '#ddd',
        color: Colors.Black,
        margin:16
      },
    mainView:{
       flex:1,
       backgroundColor:Colors.White,
       flexDirection:'column',
    },
    mainSubView:{
      flex:1,
      flexDirection:'row',
      backgroundColor:Colors.White,
      padding:16,
   },
    title:{
      fontWeight:'bold',
      color: Colors.Black,
      fontSize:20,
      padding:16
   },
   subTitle:{
    fontWeight:'500',
    color:Colors.Black,
    fontSize:18,
    paddingLeft:16
 }    
});
