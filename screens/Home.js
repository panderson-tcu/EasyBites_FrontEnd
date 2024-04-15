import React, {useState, useEffect} from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
  ActivityIndicator
} from "react-native";
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

  const [refreshing, setRefreshing] = useState(false);
  const applianceDefaults = [
    { applianceId: '3000' },
    { applianceId: '3001' },
    { applianceId: '3002' },
    { applianceId: '3003' },
    { applianceId: '3004' },
    { applianceId: '3005' },
    { applianceId: '3006' },
    { applianceId: '3007' },
    ];
  
    const allergenDefaults = [];
  
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

  const [loading, setLoading] = useState(true); // State variable to manage loading state
  const [showNoRecipesMessage, setShowNoRecipesMessage] = useState(false); // State variable to delay showing "No Recipes Found" message

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching data

    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

    try {
      /*
        Axios call to retrieve user info from database
      */
      await axios.get(`https://easybites-portal.azurewebsites.net/app-user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {

      })
      .catch(async error => {
        /*
          If user is not in backend, add their information to the backend with axios request
        */
        if (error.response.data.code !== 200) { // post user info
          await axios.post("https://easybites-portal.azurewebsites.net/app-user", appUserInfo,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            })
          .then(response => {
            if(response.status==200){
              console.log('User added successfully!');
            }
            else {
              console.error(
                'Failed to add user: ',
                response.status,
                response.statusText
              );
            }
          });
          /*
            Set user's appliances to defaults
          */
          axios.put(`http://easybites-portal.azurewebsites.net/app-user/appliances/${user.id}`, applianceDefaults, {
            headers: {
              Authorization: `Bearer ${token}`,
              // 'Content-Type': 'application/json'
            }
          })
          .then(response => {
            // Handle response from backend if needed
          })
          .catch(error => {
            console.error('Error sending preferences to backend:', error);
            // Handle error if needed
          });
  
          /*
            Set user's allerges to defaults
          */
          axios.put(`http://easybites-portal.azurewebsites.net/app-user/allergens/${user.id}`, allergenDefaults, {
            headers: {
              Authorization: `Bearer ${token}`,
              // 'Content-Type': 'application/json'
            }
          })
          .then(response => {
            // Handle response from backend if needed
          })
          .catch(error => {
            console.error('Error sending preferences to backend:', error);
            // Handle error if needed
          });
        }
      });

      
      /*
        Axios call to retriee user's liked recipes from backend
        This will set heart icon to filled in if recipe is liked by user
      */
      const fetchLikedRecipes = async () => {
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
      /*
        Retrieve recipes with axios request that satisfy allergen and appliance filters
      */
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

  /*
    When user navigates to Home page, re-call fetchData to refresh recipe data
  */
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  /*
    Filter recipes based on search query, protein, price, and cooktime
  */
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
      <ScrollView 
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#7B886B']} // Customize the refresh indicator color
          tintColor="#7B886B" // Customize the refresh indicator color on iOS
        />
      }>
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
