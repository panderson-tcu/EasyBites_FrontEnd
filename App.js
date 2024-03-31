import * as React from "react";
//import { Pressable } from 'react-native';
// Screens
import LoginPage from "./screens/LoginPage";
import SignUpCreateAccount from "./screens/SignUpCreateAccount";
import Quiz from "./screens/Quiz";
import Quiz1 from "./screens/Quiz1";
import Quiz2 from "./screens/Quiz2";
import Home from "./screens/Home";
import ShoppingCart from "./screens/ShoppingCart";
import Favorites from "./screens/Favorites";
import Profile from "./screens/Profile";
import RecipeInfo from './screens/RecipeInfo';
import AllergenKey from './screens/AllergenKey';
import ListItem from './components/ListItem'; // Import your ListItem component
// navigation needed for app stack. run the below in app directory:
// npm install @react-navigation/native @react-navigation/native-stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

// Clerk imports
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants"



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
    headerShown: false,
            tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    elevation: 0,
                    height: '10%',
                    backgroundColor: '#7B886B',
                    shadowColor: '#EFEBE7',
                    shadowOpacity: 12,
                    shadowRadius: 10,
                    paddingBottom: "8%",
                    padding: 10
                }
};



function MyTabs() {
  return (
    <Tab.Navigator screenOptions={ screenOptions }>
        <Tab.Screen 
            name="HomeScreen" 
            component={Home}
            options={{
                tabBarIcon: ({focused}) => {
                  return (
                    focused ? (
                        <Ionicons name="home" size={40} color="#EFEBE7" />
                    ) : (
                        <Ionicons name="home-outline" size={40} color="#EFEBE7" />
                    )
                );
                }
            }}  /> 
       <Tab.Screen     
    name="Favorites" 
    component={Favorites}
    options={{
        tabBarIcon: ({ focused }) => {
            return (
                focused ? (
                    <Ionicons name="heart" size={40} color="#EFEBE7" />
                ) : (
                    <Ionicons name="heart-outline" size={40} color="#EFEBE7" />
                )
            );
        }
    }}
/>
        <Tab.Screen 
            name="ShoppingCart" 
            component={ShoppingCart}
            options={{
                tabBarIcon: ({focused}) => {
                  return (
                    focused ? (
                        <Ionicons name="cart" size={40} color="#EFEBE7" />
                    ) : (
                        <Ionicons name="cart-outline" size={40} color="#EFEBE7" />
                    )
                );
                }
            }} />
        <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                tabBarIcon: ({focused}) => {
                  return (
                    focused ? (
                        <Ionicons name="person-circle" size={40} color="#EFEBE7" />
                    ) : (
                        <Ionicons name="person-circle-outline" size={40} color="#EFEBE7" />
                    )
                );
                }
            }} />
      </Tab.Navigator>
  );

}


function App () {
  return ( 
    <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>
      <SignedOut>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginPage" screenOptions={{ headerShown: false , orientation: "portrait_up"}}>
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpCreateAccount" component={SignUpCreateAccount} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SignedOut>

      <SignedIn>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false , orientation: 'portrait' }}>
            <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
            <Stack.Screen name="RecipeInfo" component={RecipeInfo} options={{ headerShown: false }}/>
            <Stack.Screen name="ListItem" component={ListItem} options={{ headerShown: false }}/>
            <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false}} />
            <Stack.Screen name="Quiz1" component={Quiz1} options={{ headerShown: false }} />
            <Stack.Screen name="Quiz2" component={Quiz2} options={{ headerShown: false }} />
            <Stack.Screen name="AllergenKey" component={AllergenKey} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
      </SignedIn>
    </ClerkProvider>
  );
};

export default App;

