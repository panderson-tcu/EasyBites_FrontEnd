import { StyleSheet } from 'react-native';
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const styles = StyleSheet.create({
    home: {
      backgroundColor: "#f2f1ed",
      flex: 1,
      width: "100%",
      height: 844,
      overflow: "hidden",
    },
    cardWrapper: {
      top: '10%',
      flexDirection: 'row',
      flexWrap: 'wrap', // Allow wrapping of cards to the next line
      justifyContent: 'center', // Center the cards horizontally
      paddingBottom: '24%',

    },
    card: {
    },
    scrollViewcontent: {
      flexGrow: 1,
      marginBottom: '30%',
    },
    searchInputFavs: {
      top: '5%',
      width: '65%',
      height: '50%',
      padding: '2%',
      backgroundColor: '#D9D9D9',
      borderRadius: 10,
    },
    EBLogo: {
      width: '20%',
      height: '30%',
      aspectRatio: 13 / 10,
      margin: '1%',
      marginLeft: '2%',
      marginBottom: '2%',
    },
    headerWrap: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    filterIcon: {
      margin: '2%',
      height: '30%',
      alignItems: 'center',
      alignContent: 'center',
      // left: '80%',
      marginTop: '7%'
    },
    noRecipes: {
      fontSize: 18,
    },
    noRecipesContainer: {
      justifyContent: 'center',
      top: 10,
      paddingLeft: "5%",
    },
  });

  export default styles;