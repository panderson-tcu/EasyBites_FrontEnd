import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { 
View,
Text,
SafeAreaView,
ScrollView,
TextInput,
Image
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import RecipeCard from "../components/RecipeCard";
import styles from "./FavoritesStyle";
import axios from 'axios';
import { useAuth, useUser } from "@clerk/clerk-expo";


const Favorites = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [addedRecipes, setAddedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {user} = useUser();
  

  const fetchLikedRecipes = async () => {
        const token = await Clerk.session.getToken({ template: 'springBootJWT' });

        console.log("retrieving all recipes from backend")
        axios.get(`https://easybites-portal.azurewebsites.net/app-user/liked/${user.id}`,
        // axios.get(`http:/localhost/app-user/liked/${user.id}`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        })
        .then(response => {
            setRecipes(response.data.data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        })
    }

    const fetchAddedRecipes = async () => {
        const token = await Clerk.session.getToken({ template: 'springBootJWT' });

        console.log("retrieving added recipes from backend")
        axios.get(`https://easybites-portal.azurewebsites.net/app-user/shoppingCart/${user.id}`,
        // axios.get(`http:/localhost/app-user/shoppingCart/${user.id}`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        })
        .then(response => {
            setAddedRecipes(response.data.data);
            console.log(response.data.data)
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        })
    }

  console.log("entering Favorites page")
  useFocusEffect(
    React.useCallback(() =>{
        fetchLikedRecipes();
        fetchAddedRecipes();
    }, [])
  );

  isAdded = (recipe) => {
    console.log("refreshing added recipes icon");
    return addedRecipes.some(addedRecipe => addedRecipe.recipeId === recipe.recipeId);
  }

    const handleSearch = (query) => {
      setSearchQuery(query);
    };
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.headerWrap}>
        <Image
          style={styles.EBLogo}
          source={require("../assets/Small-EB-Logo.png")}/>
        <TextInput
          style={styles.searchInputFavs}
          placeholder= "Search"
          mode="outlined"
          theme={{
            fonts: { regular: { fontFamily: "Arial", fontWeight: "Bold" } },
            colors: { text: "#000", background: "#f2f1ed" }
          }} 
          onChangeText={handleSearch}
          />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.cardWrapper}>
        {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
            <RecipeCard
                style={styles.card} 
                key={recipe.recipeId} 
                recipe={recipe} 
                onPress={() => navigation.navigate('RecipeInfo', { recipe })} 
                currentPage={'Favorites'} 
                added={isAdded(recipe)}
            />
            ))
        ) : (
            <View style={styles.noRecipesContainer}>
            <Text style={styles.noRecipes}>
                You have no favorited recipes. {'\n'} Like a recipe by pressing <Ionicons name="heart-outline" size={24} color='#000'/> 
            </Text>     
            </View>              
        )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default Favorites;