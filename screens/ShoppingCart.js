import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Image, Text } from "react-native";
import ListItem from "../components/ListItem"; 
import styles from "./ShoppingCartStyle";
import axios from 'axios';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Ionicons from '@expo/vector-icons/Ionicons';


const ShoppingCart = () => {
  const [krogerToken, setKrogerToken] = useState(null); 
  const [addedRecipes, setAddedRecipes] = useState([]);
  const {user} = useUser();


  const fetchAddedRecipes = async () => {
    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

    console.log("retrieving all recipes from backend")
    axios.get(`https://easybites-portal.azurewebsites.net/app-user/shoppingCart/${user.id}`,
    // axios.get(`http:/localhost/app-user/shoppingCart/${user.id}`,
    {
    headers: {
        Authorization: `Bearer ${token}`,
    }
    })
    .then(response => {
        setAddedRecipes(response.data.data);
    })
    .catch(error => {
        console.error("Error fetching recipes:", error);
    })
}

const fetchKrogerToken = async () => {
  try {
    const user = 'easybites-c2a707875eab46789923efb8c484d6d5585439769308217340';
    const pwd = 'V3FB6l8vIrwhjiz4XwtYKVij-_YEsuuiMFlymoVb';
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('scope', 'product.compact');
    
    const response = await axios.post('https://api.kroger.com/v1/connect/oauth2/token', formData,  
      {
        headers: {
          Authorization: 'Basic ' + btoa(`${user}:${pwd}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );
    setKrogerToken(response.data.access_token);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

  useFocusEffect(
    React.useCallback(() => {
      fetchKrogerToken();
      fetchAddedRecipes();
    }, [])// need to get this to reload the page when a recipe is unadded in ListItem
  )


  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.headerWrap}>
        <Image
          style={styles.EBLogo}
          source={require("../assets/Small-EB-Logo.png")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {addedRecipes.length > 0 ? (
            addedRecipes.map((recipe, index) => (
              <ListItem key={index} recipe={recipe} krogerToken={krogerToken} />
            ))
          ) : (
            <View style={styles.noRecipesContainer}>
              <Text style={styles.noRecipes}> You have no recipes in your cart. {'\n'} Add recipe by pressing <Ionicons name="add-circle-outline" size={24} color='#000'/> </Text>     
            </View>              
          )}      
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingCart;