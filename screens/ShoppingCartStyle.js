// ShoppingCartStyle.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f1ed",
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    home: {
      marginBottom: '24%',
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
      justifyContent: 'left',
      paddingLeft: '5%',
    },
    scrollViewcontent: {
      flexGrow: 1,
    },
    noRecipes: {
      fontSize: 18,
    },
    noRecipesContainer: {
      justifyContent: 'center',
      top: 10,
      paddingLeft: "18%",
    },
});

export default styles;
