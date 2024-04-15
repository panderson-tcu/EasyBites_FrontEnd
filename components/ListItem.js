import React, { useState, useEffect} from "react";
import { View, Text, TouchableWithoutFeedback, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import styles from './ListItemStyle';
import axios from "axios";
import UPCRow from "./UPCRow";
import { useNavigation } from "@react-navigation/native";
import { useAuth ,useUser } from "@clerk/clerk-expo";

/*
  container to set ListItem as collapsed or not collapsed
*/
const CollapsibleContainer = ({ children, expanded }) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event) => {
    const onLayoutHeight = event.nativeEvent.layout.height;
    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsibleStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight.value,
    };
  }, [expanded]);

  return (
    <Animated.View style={[collapsibleStyle, { overflow: "hidden" }]}>
      <View style={{ position: "absolute" }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

/*
  Component that displays on page
*/
const ListItem = ({ recipe, krogerToken }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const {user} = useUser();
  const [ priceTotal, setPriceTotal ] = useState(0);


  /*
    ListItem is pressed, toggle expanded
  */
  const onItemPress = () => {
    setExpanded(!expanded);
    if(!expanded){
      setPriceTotal(0)
    }
  };

  /*
    Receive price data from UPCRow  component
    Calculate total from each UPCRow's individual price
  */
  const handleDataFromUPCRow = (price, isSubtracted) => {
    console.log("ingredient price is: ", price)

    price = parseFloat(price.toFixed(2))

    if(isSubtracted){
      console.log("ingredient is pressed")
      setPriceTotal((prevTotal) => parseFloat((prevTotal - price).toFixed(2)));
    } else {
      console.log("ingredient is not pressed")
      setPriceTotal((prevTotal) => parseFloat((prevTotal + price).toFixed(2)));
    }
  };

  /*
    If recipe changes, useEffect is called
    So this is changed when there are new recipes loaded
  */
  useEffect( () => {
    setPriceTotal(0);
    setExpanded(false);
  }, [recipe]);

  /*
    User elects to unadd a recipe
    axios call to remove recipe from user's shopping cart
  */
  const unaddRecipe = async() => {
    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

    console.log("unadding a recipe from shopping cart")
    axios.patch(`https://easybites-portal.azurewebsites.net/recipes/removeShoppingCart/${recipe.recipeId}/${user.id}`, {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    } )
    .then (response => {
      console.log("unadded a recipe")
      console.log(response)
    })
    .catch(error => {
      console.error("Error unadding a recipe:", error)
    })
  };


  return (
    <View style={styles.wrap}>
      <TouchableWithoutFeedback onPress={onItemPress}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.mainContainer}>
              <Pressable  onPress={() => navigation.navigate('RecipeInfo', { recipe })} currentPage={'ShoppingCart'}>
                <Text style={styles.recipeName}>{recipe.title}</Text>
              </Pressable>
              {/* 
                If expanded is true, display priceTotal
                Else, don't display priceTotal
              */}
                {expanded && (
                  <Text style={styles.recipePrice}>${priceTotal}</Text>
                )}                
                <Text style={styles.recipeTime}>{recipe.cooktime} minutes</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name={expanded ? "chevron-up-outline" : "chevron-down-outline"} size={30} />
              <Pressable style={styles.removeButton} onPress={unaddRecipe}>
                <Ionicons name="remove-circle-outline" size={24} />
              </Pressable>
            </View>
              {/* 
                If expanded is true, display UPCRows
                Else, don't display UPCRows
              */}
            {expanded && (
              <View style={styles.krogerInfo}>
                {/* 
                  For each ingredient in recipe.ingredients, display one UPCRow with the upcValue
                */}
                {recipe.ingredients.map((ingredient, index) => (
                  <Pressable key={index}>
                    <UPCRow upcValue={ingredient.upcValue} krogerToken={krogerToken} sendDataToListItem={handleDataFromUPCRow}/>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <CollapsibleContainer expanded={expanded}>
        <Text style={[styles.details, styles.text]}>{recipe.details}</Text>
      </CollapsibleContainer>
    </View>
  );
};

export default ListItem;