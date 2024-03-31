import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrap: {
      borderColor: '#9B8E73', 
      backgroundColor: "#fff",
      borderWidth: 2,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 10,
      backgroundColor: "#fff",
    },

    recipeName: {
      fontSize: 18,
      fontWeight: '600',
      paddingBottom: '3%',
      width: '100%',
      flexWrap: 'wrap',
      textDecorationLine: 'underline', 
    },
    recipePrice: {
      fontSize: 17,
      paddingBottom: '1%',
      fontWeight: '500',
      color: '#9B8E73',
    },
    recipeTime: {
      fontSize: 17,
      fontWeight: '500',
      color: '#9B8E73',
    },
    mainContainer: {
      flexDirection: 'column',
      width: '100%',
      paddingHorizontal: '10%',
      paddingVertical: '5%',
    },
    krogerInfo: {
        marginLeft: '10%',

    },
    arrowContainer: {
        position: 'absolute',
        right: '6%', // Adjust this value as needed
        top: 40, // Adjust this value as needed
        flexDirection: 'row',
      },
    removeButton: {
        paddingLeft: 10,
    },
    detailConatiner: {

    },

  });
  
  export default styles;
