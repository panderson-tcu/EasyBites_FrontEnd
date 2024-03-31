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
  RefreshControl
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import RecipeCard from "../components/RecipeCard";
import FilterPopup from '../components/FilterPopup';
import styles from "./HomeStyle";
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useAuth ,useUser } from "@clerk/clerk-expo";


const Home = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const {user} = useUser();
  const [appUserInfo, setAppUserInfo] = React.useState({
    userId: user.id,
    email: user.primaryEmailAddress.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Simulate a fetch operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const fetchData = async () => {
    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

    try { //get user info
      await axios.get(`https://easybites-portal.azurewebsites.net/app-user/${user.id}`,
      // await axios.get(`http://localhost/app-user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    } catch(error) {
      if (error.response.data.code !== 200) { // post user info
        // axios.post("http://localhost/app-user", appUserInfo,     
        await axios.post("https://easybites-portal.azurewebsites.net/app-user", appUserInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          } 
        )
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
      }
    }

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
          setLikedRecipes(response.data.data);
      })
      .catch(error => {
          console.error("Error fetching recipes:", error);
      })
  }
  fetchLikedRecipes();

    try{ // get approved recipes
      // await axios.get("http://localhost/recipes/approved",        
      // await axios.get("https://easybites-portal.azurewebsites.net/recipes/approved",
      await axios.get(`https://easybites-portal.azurewebsites.net/recipes/filtered/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        } 
      )
      .then(response => {
        setRecipes(response.data.data);
      })
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() =>{
        fetchData()
    }, [])
  );

  // useEffect(() => {
  //   fetchData();
  // }, []);  


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

    isLiked = (recipe) => {
      return likedRecipes.some(likedRecipe => likedRecipe.recipeId === recipe.recipeId);
    }
    
  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.headerWrap}>
        <Image
          style={styles.EBLogo}
          source={require("../assets/Small-EB-Logo.png")}/>
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
        }
      >
        {/* <View style={styles.cardWrapper}>
          {filteredRecipes.map((recipe) => (
                        <RecipeCard style={styles.card} key={recipe.recipeId} recipe={recipe} onPress={() => navigation.navigate('RecipeInfo', { recipe })} currentPage={'Home'} added={isLiked(recipe)}>
                        </RecipeCard>
                    ))}
        </View> */}
        <View style={styles.cardWrapper}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.recipeId} 
                recipe={recipe} 
                onPress={() => navigation.navigate('RecipeInfo', { recipe })} 
                currentPage={'Home'} 
                added={isLiked(recipe)}/>
            ))
          ) : (
            <Text style={styles.noneFound}>No Recipes Found with applied filters{'\n'}</Text>
          )}
        </View>
      </ScrollView>
      <FilterPopup visible={filterVisible} onClose={() => setFilterVisible(false)} onApply={handleApplyFilters} />
    </SafeAreaView>
  );
};

export default Home;
