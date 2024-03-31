import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, Pressable, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import RecipeCard from "../components/RecipeCard";
import FilterPopup from '../components/FilterPopup';
import styles from "./HomeStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useAuth, useUser } from "@clerk/clerk-expo";

const Home = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const { user } = useUser();
  const [appUserInfo, setAppUserInfo] = React.useState({
    userId: user.id,
    email: user.primaryEmailAddress.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName
  });
  const [loading, setLoading] = useState(true); // State variable to manage loading state
  const [showNoRecipesMessage, setShowNoRecipesMessage] = useState(false); // State variable to delay showing "No Recipes Found" message

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching data

    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

    try {
      await axios.get(`https://easybites-portal.azurewebsites.net/app-user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const fetchLikedRecipes = async () => {
        console.log("retrieving all recipes from backend")
        axios.get(`https://easybites-portal.azurewebsites.net/app-user/liked/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then(response => {
            setLikedRecipes(response.data.data);
          })
          .catch(error => {
            console.error("Error fetching recipes:", error);
          });
      }
      fetchLikedRecipes();

      const response = await axios.get(`https://easybites-portal.azurewebsites.net/recipes/filtered/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setRecipes(response.data.data);
      setLoading(false); // Set loading to false when data is fetched successfully
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false); // Set loading to false if there's an error
      setShowNoRecipesMessage(true); // Show "No Recipes Found" message in case of error
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const filteredRecipes = recipes.filter(recipe => {
    const includesSearchQuery = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (appliedFilters) {
      const { maxPrice, maxCookTime, selectedProteins } = appliedFilters;
      let meetsPriceCriteria = true;
      let meetsCookTimeCriteria = true;
      let meetsProteinCriteria = true;

      if (maxPrice !== undefined) {
        meetsPriceCriteria = parseFloat(recipe.estimatedCost) <= maxPrice;
      }

      if (maxCookTime !== undefined) {
        meetsCookTimeCriteria = recipe.cooktime <= maxCookTime;
      }
      if (selectedProteins && selectedProteins.length > 0) {
        meetsProteinCriteria = selectedProteins.includes(recipe.protein.proteinName);
      }
      return includesSearchQuery && meetsPriceCriteria && meetsCookTimeCriteria && meetsProteinCriteria;
    }

    return includesSearchQuery;
  });

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setFilterVisible(false);
  };

  const isLiked = (recipe) => {
    return likedRecipes.some(likedRecipe => likedRecipe.recipeId === recipe.recipeId);
  }

  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.headerWrap}>
        <Image
          style={styles.EBLogo}
          source={require("../assets/Small-EB-Logo.png")} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          mode="outlined"
          theme={{
            fonts: { regular: { fontFamily: "Arial", fontWeight: "Bold" } },
            colors: { text: "#000", background: "#f2f1ed" }
          }}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="filter-outline" size={24} style={styles.filterIcon} onPress={() => setFilterVisible(true)} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? ( // Show loading indicator while loading data
          <ActivityIndicator size="large" color='#7B886B' style={styles.loadingIndicator} />
        ) : (
          <View style={styles.cardWrapper}>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.recipeId}
                  recipe={recipe}
                  onPress={() => navigation.navigate('RecipeInfo', { recipe })}
                  currentPage={'Home'}
                  added={isLiked(recipe)} />
              ))
            ) : (
               // Show "No Recipes Found" message only when triggered
              <Text style={styles.noneFound}>No Recipes Found with applied filters{'\n'}</Text>
            )}
          </View>
        )}
      </ScrollView>
      <FilterPopup visible={filterVisible} onClose={() => setFilterVisible(false)} onApply={handleApplyFilters} />
    </SafeAreaView>
  );
};

export default Home;
