import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';
import styles from './RecipeInfoStyle'; // Import your styles
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth ,useUser } from "@clerk/clerk-expo";


const RecipeInfo = ({ route }) => {
  // console.log("In RecipeInfo stack screen")
  const {recipe} = route.params;
  const navigation = useNavigation();
  const [addedRecipes, setAddedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState({
    title: '',
    cooktime: '',
    ingredientsQuantity: '',
    estimatedCost: '',
    instructions: '',
    servings: '',
    protein: {},
    ingredients: [],
    appliances: [],
    allergens: [],
  });
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const {user} = useUser();

  // console.log(recipe)
  // console.log(recipe.recipeId)
  // console.log("about to call useEffect")

  // let recipeId = -10;
  const recipeId = recipe.recipeId

  useEffect(() => {

    const fetchRecipeDetails = async () => {
      const token = await Clerk.session.getToken({ template: 'springBootJWT' });

      if(recipeId){
        axios.get(`https://easybites-portal.azurewebsites.net/recipes/${recipeId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        } )
        .then(response => {
          console.log("recipe details fetched successfully")
          // console.log(response.data.data)
          setRecipeInfo(response.data.data);
        })
        .catch(error => {
          console.error("Error fetching recipeInfo:", error);
        })
      }
    };
    fetchRecipeDetails();

    const fetchLikedRecipes = async () => {
      const token = await Clerk.session.getToken({ template: 'springBootJWT' });

      console.log("retrieving liked recipes from backend")
      axios.get(`https://easybites-portal.azurewebsites.net/app-user/liked/${user.id}`,
      // axios.get(`http:/localhost/app-user/liked/${user.id}`,
      {
      headers: {
          Authorization: `Bearer ${token}`,
      }
      })
      .then(response => {
          setLikedRecipes(response.data.data);
          console.log("liked recipes fetched successfully")
          setIsLiked(response.data.data.some(likedRecipe => likedRecipe.recipeId === recipe.recipeId));
          console.log("value of isLiked", isLiked)
      })
      .catch(error => {
          console.error("Error fetching recipes:", error);
      })
  }
  fetchLikedRecipes();

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
        console.log("added recipes fetched successfully")
        setIsAdded(response.data.data.some(addedRecipe => addedRecipe.recipeId === recipe.recipeId));
        console.log("value of isAdded", isAdded)
    })
    .catch(error => {
        console.error("Error fetching recipes:", error);
    })
}
  fetchAddedRecipes();



  console.log("value of isLiked", isLiked)
  console.log("value of isAdded", isAdded)


  }, [recipeId]);
  
  const clickLikeIcon = async () => {
    const token = await Clerk.session.getToken({ template: 'springBootJWT' });
      console.log("clicked like icon")

      if(isLiked){
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
            toggleLikeIcon()
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
          toggleLikeIcon()
        })
        .catch(error => {
          console.error("Error liking recipe:", error)
        })
      }
  }

  const clickAddIcon = async () => {
    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

      console.log("clicked add icon")
      if(isAdded){
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
            toggleAddIcon()
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
          toggleAddIcon()
        })
        .catch(error => {
          console.error("Error liking recipe:", error)
        })
      }
  }

  const toggleLikeIcon = () => {
    console.log("toggling liked icon")
    setIsLiked(!isLiked); // Toggle the state when the icon is pressed
  };

  const toggleAddIcon = () => {
    console.log("toggling added icon")
    setIsAdded(!isAdded); // Toggle the state when the icon is pressed
  };

  // isLiked = () => {
  //   return likedRecipes.some(likedRecipe => likedRecipe.recipeId === recipeId);
  // }

  // isAdded = () => {
  //   return addedRecipes.some(addedRecipes => addedRecipes.recipeId === recipeId);
  // }
  


  // console.log("printing recipeInfo")
  // console.log(recipeInfo)

  const renderAllergenIcons = () => {
    return recipeInfo.allergens.map((allergen) => {
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


  // console.log(recipeInfo.servings)
  return (
    <ScrollView>
        <View style={styles.imageContainer}>
            <Image source={{uri: recipeInfo.imageUrl}} style={styles.cardImage} />
            <Pressable style={styles.iconContainerLeft}>
              <View style={{ borderRadius: 10, padding: 5, backgroundColor: '#f2f1ed' }}>
                <Ionicons name="chevron-back-outline" size={24} color="black" onPress={() => navigation.navigate('Home')} currentPage={('RecipeInfo', { recipe })}/>
              </View>
            </Pressable>
            <View style={styles.iconContainerRight}>
              <View style={{ borderRadius: 10, padding: 5, backgroundColor: '#f2f1ed' }}>
              <Pressable style={styles.icon} onPress={clickLikeIcon}>
                { isLiked ? (
                  <Ionicons name="heart" size={24} color='#000'/>
                ) : (
                  <Ionicons name="heart-outline" size={24} color='#000'/>
                )}
              </Pressable>
            </View>
            <View style={{ borderRadius: 10, padding: 5, backgroundColor: '#f2f1ed', marginLeft: 5 }}>
              <Pressable style={styles.icon} onPress={clickAddIcon}>
                { isAdded ? (
                  <Ionicons name="add-circle" size={24} color='#000'/>
                ): (
                  <Ionicons name="add-circle-outline" size={24} color='#000'/>
                )}
              </Pressable>
            </View>
          </View>

        </View>
        <View style={styles.cardContent}>
          <Text style={styles.recipeName}>{recipeInfo.title}</Text>
          <View style={styles.allergenIconContainer}>
            {renderAllergenIcons()}
          </View>
          <View style={styles.recipeInfoRow}>
            <Ionicons name="time-outline" size={16} style={styles.infoIcons}></Ionicons>
            <Text style={styles.recipeInfoItem}>{recipeInfo.cooktime} mins</Text>
            <Ionicons name="people-outline" size={18} style={styles.infoIcons}></Ionicons>
            <Text style={styles.recipeInfoItem}>{recipeInfo.servings}</Text>
            <FontAwesome6 name="dollar-sign" size={16} color="black" style={styles.infoIcons}/>
            <Text style={styles.recipeInfoItem}>{recipeInfo.estimatedCost}</Text>
          </View>
            <View style={styles.cardView}>
              <Text style={styles.Title}>Ingredients</Text>
              <Text style={styles.recipeIngredients}>{recipeInfo.ingredientsQuantity}</Text>
            </View>
            <View style={styles.bottomCardView}>
              <Text style={styles.Title}>Directions</Text>
              <Text style={styles.recipeDirections}>{recipeInfo.instructions}</Text>
            </View>
        </View>
    </ScrollView>
  );
};

export default RecipeInfo;
