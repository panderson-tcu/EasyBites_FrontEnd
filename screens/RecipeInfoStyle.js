import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 300,
  },
  iconContainerLeft: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    zIndex: 1, // Ensure the icons are displayed on top
  },
  iconContainerRight: {
    position: 'absolute',
    flexDirection: 'row',
    top: '20%',
    left: '77%',
    zIndex: 1,
  },
  cardView: {
    backgroundColor: '#DBD1C6',    
    // borderRadius: 15,
    marginTop: '3%',
    marginHorizontal: '3%',
    padding: 10,
  },
  bottomCardView: {
    backgroundColor: '#DBD1C6',    
    // borderRadius: 15,
    margin: '3%',
    marginBottom: '20%',
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 300,    
    position: 'relative',

  },
  recipeName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    textAlign: 'center',
    color: '#3E3A39', 

  },
  recipeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },  
  recipeInfoItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B886B',
  },
  icon: {
    paddingLeft: '5%', 
    color: '#7B886B', 

  },
  infoIcons: {
    paddingLeft: '13%', 
    color: '#7B886B', 
  },

  recipeTime: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B8E73',
  },
  allergenIcon: {
    backgroundColor: '#F7B27D',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 13,
    marginBottom: 10,
  },
  recipeIngredients: {
    fontSize: 16,
    marginBottom: 10,
    padding: 20,
    whiteSpace: 'pre-line',
  },
  recipeDirections: {
    fontSize: 16,
    padding: 20,
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#EFEBE7',
    color: '#7B886B',
    textAlign: 'center',
  },
  applicanceImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  allergenIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default styles;
