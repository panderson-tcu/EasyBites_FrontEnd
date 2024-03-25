import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { Card } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './RecipeCardStyling'
import { MaterialCommunityIcons } from '@expo/vector-icons';


const RecipeCard = ({recipe, onPress, currentPage}) => {
    // console.log("recipe card rendering")
    let allergens = recipe.allergens;
    // console.log(allergens)

    const renderAllergenIcons = () => {
      return allergens.map((allergen) => {
        switch (allergen.name) {
          case 'Shellfish':
            return (
              <View style={[styles.allergenIcon, { backgroundColor: 'rgba(231, 103, 103, 0.67)' }]}>
                <FontAwesome6 name="shrimp" size={16} color="black" />
              </View>
            );
          case 'Fish':
            return (
              <View style={[styles.allergenIcon, { backgroundColor: '#A4B2D8' }]}>
                <Ionicons name="fish-outline" size={16} color="black" />
              </View>
            );
          case 'Milk':
            return (
              <View style={[styles.allergenIcon, { backgroundColor: '#rgba(171, 64, 57, .6)' }]}>
                  <MaterialCommunityIcons name="cow" size={16} color="black" />
                </View>
            );
          case 'Soy':
            return (
              <View style={[styles.allergenIcon, { backgroundColor: '#9CB99F' }]}>
                  <Text style={styles.allergenText}>soy</Text>
                </View>
            );
          case 'Wheat':
              return (
                <View style={[styles.allergenIcon, { backgroundColor: '#B49782' }]}>
                  <FontAwesome6 name="wheat-awn" size={16} color="black" />
                </View>
              );
          case 'Eggs':
            return (
              <View style={[styles.allergenIcon, { backgroundColor: '#E2C971' }]}>
                <MaterialCommunityIcons name="egg-outline" size={16} color="black" />
              </View>
            );
          case 'Peanuts':
            return (
              <View style={[styles.allergenIcon, { backgroundColor: '#AC9BD5' }]}>
                  <MaterialCommunityIcons name="peanut-outline" size={16} color="black" />
                </View>
            );
          case 'Tree Nuts':
            return (
              <View style={[styles.allergenIcon, { backgroundColor: '#F7B27D' }]}>
                  <Text style={styles.allergenText}>nut</Text>
                </View>
            );
          // Add cases for other allergens and their corresponding icons
          default:
            return null; // Render nothing if the allergen doesn't have a corresponding icon
        }
      });
    };


    return (
      <TouchableOpacity onPress={onPress} style={styles.cardView}>
          <Card containerStyle={styles.cardComponent}>
            <View style={styles.cardImageContainer}>
            <View style={styles.timeContainer}>
                <View style={styles.actionIcon}>
                {currentPage === 'Home' && <Ionicons name="heart-outline" size={24}/>}
                {currentPage === 'Favorites' && <Ionicons name="add-circle-outline" size={24}/>}
                </View>
              <Card.Image style={styles.cardImage}source={{uri: recipe.imageUrl}} />
              <View style={styles.detailContainer}>
              <Text style={styles.recipeName}>{recipe.title}</Text>
              <View style={styles.timeContainer}>
              <Text style={styles.recipePrice}>${parseFloat(recipe.estimatedCost).toFixed(2)}</Text>
                  <Ionicons name="people-outline" size={20} style={{ paddingLeft: 20 }}/>
                  <Text style={styles.recipeTime}> {recipe.servings}</Text>
                </View>
                {/* <Text style={styles.recipePrice}>${parseFloat(recipe.estimatedCost).toFixed(2)}</Text> */}
                <View style={styles.timeContainer}>
                  <Ionicons name="time-outline" size={20}/>
                  <Text style={styles.recipeTime}>{recipe.cooktime} mins</Text>
                </View>
                <View>
                  <Ionicons name="people-outline" size={18} style={styles.icon}></Ionicons>
                  <Text style={styles.recipeServing}>{recipe.servings}</Text>
                </View>
              <View style={styles.allergenIconsContainer}>
                  {renderAllergenIcons()}
                </View> 
                </View>
                </View> 
            </View>
          </Card>
      </TouchableOpacity>
      
    );
  };
  

  
  export default RecipeCard;
  