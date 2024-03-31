import React, {useState, useEffect} from "react";
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
import { useAuth ,useUser } from "@clerk/clerk-expo";
import axios from 'axios';


const RecipeCard = ({recipe, onPress, currentPage, added}) => {
    let allergens = recipe.allergens;
    const {user} = useUser();
    const [isPressed, setIsPressed] = useState(added); // State to track if the icon is pressed

    useEffect(() => {
      setIsPressed(added);
    }, [added])

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

    const clickIcon = async () => {
      const token = await Clerk.session.getToken({ template: 'springBootJWT' });
      console.log("clicked icon")
      if(currentPage === 'Home'){
        console.log("clicked like icon")

        if(isPressed){
          console.log("unliking a recipe")
          // axios.patch(`http://localhost/recipes/removeLike/${recipe.recipeId}/${user.id}`, {},
            axios.patch(`https://easybites-portal.azurewebsites.net/recipes/removeLike/${recipe.recipeId}/${user.id}`, {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            } )
            .then (response => {
              console.log("removed a like")
              console.log(response)
              toggleIcon()
            })
            .catch(error => {
              console.error("Error liking recipe:", error)
            })
          }
        else {
          console.log("liking a recipe")

          // axios.patch(`http://localhost/recipes/like/${recipe.recipeId}/${user.id}`, {},
        axios.patch(`https://easybites-portal.azurewebsites.net/recipes/like/${recipe.recipeId}/${user.id}`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          } )
          .then (response => {
            console.log("liked a recipe")
            console.log(response)
            toggleIcon()
          })
          .catch(error => {
            console.error("Error liking recipe:", error)
          })
        }
      }
      if (currentPage === 'Favorites') {
        console.log("clicked add icon")

        if(isPressed){
          console.log("unadding a recipe from shopping cart")
          // axios.patch(`http://localhost/recipes/removeShoppingCart/${recipe.recipeId}/${user.id}`, {},
            axios.patch(`https://easybites-portal.azurewebsites.net/recipes/removeShoppingCart/${recipe.recipeId}/${user.id}`, {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            } )
            .then (response => {
              console.log("unadded a recipe")
              console.log(response)
              toggleIcon()
            })
            .catch(error => {
              console.error("Error adding a recipe:", error)
            })
          }
        else {
          console.log("adding a recipe to shopping cart")

          // axios.patch(`http://localhost/recipes/shoppingCart/${recipe.recipeId}/${user.id}`, {},
        axios.patch(`https://easybites-portal.azurewebsites.net/recipes/shoppingCart/${recipe.recipeId}/${user.id}`, {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          } )
          .then (response => {
            console.log("added a recipe")
            console.log(response)
            toggleIcon()
          })
          .catch(error => {
            console.error("Error liking recipe:", error)
          })
        }
      }
    }    

    const toggleIcon = () => {
      console.log("toggling icon")
      setIsPressed(!isPressed); // Toggle the state when the icon is pressed
    };


    return (
      <TouchableOpacity onPress={onPress} style={styles.cardView}>
          <Card containerStyle={styles.cardComponent}>
            <View style={styles.cardImageContainer}>
            <View style={styles.timeContainer}>
                  <View style={styles.actionIcon}>
                      {currentPage === 'Home' &&                     
                        <Pressable onPress={clickIcon}>
                          {isPressed ? (
                            <Ionicons name="heart" size={24}/>
                          ) : (
                            <Ionicons name="heart-outline" size={24}/>
                          )}
                        </Pressable>}
                      {currentPage === 'Favorites' && 
                        <Pressable onPress={clickIcon}>
                        {isPressed ? (
                          <Ionicons name="add-circle" size={24}/>
                        ) : (
                          <Ionicons name="add-circle-outline" size={24}/>
                        )}
                      </Pressable>}
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
  