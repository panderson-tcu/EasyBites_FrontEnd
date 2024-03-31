//   export default styles;
import { StyleSheet } from 'react-native';
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const styles = StyleSheet.create({
  cardComponent: {
    minWidth: '98%',
    maxWidth: '98%', // Adjust the minimum width to fit two cards side by side
    margin: '1%', // Adjust the margin to create spacing between cards
    borderWidth: 2, 
    borderColor: '#9B8E73', 
    borderRadius: 10, 
    backgroundColor: "#f2f1ed",
  },
  actionIcon: {
    backgroundColor: '#B7A6DE',
    alignSelf: 'flex-end',
    borderRadius: 5,
    padding: 3,
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
  },
  cardImageContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  cardImage: {
    aspectRatio: 6 / 5,
    marginRight: '10%',
  },
  cardContent: {
    padding: 10,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: '5%',
    width: '100%',
    flexWrap: 'wrap',
  },
  recipePrice: {
    fontSize: 18,
    paddingBottom: '2%',
    fontWeight: '300',
  },
  recipeTime: {
    fontSize: 18,
    fontWeight: '300'
  },
  timeContainer: {
    flexDirection: 'row',
  },
  detailContainer: {
    flexDirection: 'column',
    width: '40%',
  },
  timePriceContainer: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  allergenIcon: {
    backgroundColor: '#F7B27D',
    padding: '2%',
    marginTop: 2,
    marginLeft: 5,
    borderRadius: 15,
  },
  allergenIconsContainer: {
    flexDirection: 'row',
    position: 'relative',
    paddingBottom: '2%',
  },
  allergenText: {
    fontSize: 10,
  },
  recipeServing: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B886B',
  }
});

export default styles;
