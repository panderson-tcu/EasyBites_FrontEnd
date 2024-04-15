import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { 
View,
Text,
SafeAreaView,
ScrollView,
TextInput,
Image,
RefreshControl
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
  const [refreshing, setRefreshing] = useState(false);

  /*
    Logic for pull refresh functionality
  */
  const onRefresh = () => {
    setRefreshing(true);

    // Simulate a fetch operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  
  /*
    Get user's liked recipes 
  */
  const fetchLikedRecipes = async () => {
        const token = await Clerk.session.getToken({ template: 'springBootJWT' });
        /*
          Axios request to retrieve user's liked recipes
          This will populate the page with only their liked recipes
        */
        axios.get(`https://easybites-portal.azurewebsites.net/app-user/liked/${user.id}`,
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
        /*
          Axios request to retrieve user's added recipes
          This will set add icon to filled in if the recipe is liked
        */
        axios.get(`https://easybites-portal.azurewebsites.net/app-user/shoppingCart/${user.id}`,
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

  /*
    when user navigates to page, will call functions to retrieve liked and added recipes
  */
  useFocusEffect(
    React.useCallback(() =>{
        fetchLikedRecipes();
        fetchAddedRecipes();
    }, [])
  );

  /*
    check if each recipe is added to the user's shopping cart
  */
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
        <View style={styles.cardWrapper}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#7B886B']} // Customize the refresh indicator color
              tintColor="#7B886B" // Customize the refresh indicator color on iOS
            />
          } >
          {/* 
            If filteredRecipes has more than 0 elements, display the recipe cards
            Else, display message saying no liked recipes
          */}
          {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeCard style={styles.card} 
                    key={recipe.recipeId} 
                    recipe={recipe} 
                    onPress={() => navigation.navigate('RecipeInfo', { recipe })} 
                    currentPage={'Favorites'} 
                    added={isAdded(recipe)}/>
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