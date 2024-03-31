import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import styles from './ListItemStyle';
import axios from "axios";
import UPCRow from "./UPCRow";
import { useNavigation } from "@react-navigation/native";
import { useAuth ,useUser } from "@clerk/clerk-expo";


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

const ListItem = ({ recipe, krogerToken }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const {user} = useUser();

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  const unaddRecipe = async() => {
    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

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
    })
    .catch(error => {
      console.error("Error unadding a recipe:", error)
    })
  };

  //   const fetchKrogerData = async (upcValue) => {
  //   try {
  //     const response = await axios.get(`https://api.kroger.com/v1/products/${upcValue}?filter.locationId=03500520`, {
  //       headers: {
  //         Authorization: `Bearer ${krogerToken}`,
  //       },
  //     });
  //     console.log("Kroger Data:", response.data.data);
  //     // Do something with the Kroger data
  //   } catch (error) {
  //     console.error("Error fetching Kroger data:", error);
  //   }
  // };

  return (
    <View style={styles.wrap}>
      <TouchableWithoutFeedback onPress={onItemPress}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.mainContainer}>
              <Pressable  onPress={() => navigation.navigate('RecipeInfo', { recipe })} currentPage={'ShoppingCart'}>
                <Text style={styles.recipeName}>{recipe.title}</Text>
              </Pressable>
                <Text style={styles.recipePrice}>${recipe.estimatedCost}</Text>
                {/* <Text style={styles.recipePrice}>${parseFloat(krogerToken.estimatedCost).toFixed(2)}</Text> */}
                <Text style={styles.recipeTime}>{recipe.cooktime} minutes</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name={expanded ? "chevron-up-outline" : "chevron-down-outline"} size={30} />
              <Pressable style={styles.removeButton} onPress={unaddRecipe}>
                <Ionicons name="remove-circle-outline" size={24} />
              </Pressable>
            </View>
            {expanded && (
              <View style={styles.krogerInfo}>
                {recipe.ingredients.map((ingredient, index) => (
                  <Pressable>
                    <UPCRow key={index} upcValue={ingredient.upcValue} krogerToken={krogerToken}/>
                  </Pressable>
                  // <Text key={index}>{ingredient.upcValue}</Text>
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