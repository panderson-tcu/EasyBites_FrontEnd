import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import styles from "./Quiz2Style";
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth ,useUser } from "@clerk/clerk-expo";

const allergenData = [
  { label: 'Milk', value: '2000' },
  { label: 'Eggs', value: '2001' },
  { label: 'Peanuts', value: '2002' },
  { label: 'TreeNuts', value: '2003' },
  { label: 'Soy', value: '2004' },
  { label: 'Wheat', value: '2005' },
  { label: 'Shellfish', value: '2006' },
  { label: 'Fish', value: '2007' },
  // { label: 'None', value: '2008' },
];

/*
Map allergen names to allergen's icons
*/
const allergenIcons = {
  Milk: <MaterialCommunityIcons name="cow" size={16} color="black" />,
  Eggs: <MaterialCommunityIcons name="egg-outline" size={16} color="black" />,
  Peanuts: <MaterialCommunityIcons name="peanut-outline" size={16} color="black" />,
  TreeNuts: <Text style={{ fontSize: 10 }}>nut</Text>,
  Soy: <Text style={{ fontSize: 10 }}>soy</Text>,
  Wheat: <FontAwesome6 name="wheat-awn" size={16} color="black" />,
  Shellfish: <FontAwesome6 name="shrimp" size={16} color="black" />,
  Fish: <Ionicons name="fish-outline" size={16} color="black" />,
  None: <Ionicons name="close-outline"/>,
};

const Quiz = ({ navigation }) => {
  const [selectedAllergen, setSelectedAllergen] = useState([]);
  const {user} = useUser();

  /*
  Toggle allergen checked or not based on user selection
  */
  const toggleAllergen = (allergen) => {
    const index = selectedAllergen.findIndex(item => item.label === allergen.label);
    if (index !== -1) {
      setSelectedAllergen(prevState => (
        prevState.filter(item => item.label !== allergen.label)
      ));
    } else {
      setSelectedAllergen(prevState => (
        [...prevState, allergen]
      ));
    }
  };

  /*
  Show list of appliances on page
  */
  const renderAllergens = () => {
    return allergenData.map(allergen => (
      <Pressable
        key={allergen.label}
        style={[
          styles.allergenButton, 
          selectedAllergen.some(item => item.label === allergen.label) && styles.selectedAllergenButton
        ]}       
        onPress={() => toggleAllergen(allergen)}
      >
        <View style={styles.iconTextContainer}>
        <View style={styles.iconContainer}>
            <Text>
              {allergenIcons[allergen.label]} 
            </Text>
          </View>
          <Text style={[
            styles.allergenButtonText,
            selectedAllergen.includes(allergen) && styles.selectedText
          ]}>
            {allergen.label}
          </Text>
        </View>
      </Pressable>
    ));
  };

  /*
  Function handle allergen preferences from front to backend
  */
  const submitAllergenPreferences = async () => {
    const preferencesData = selectedAllergen.map(allergen => ({
      allergenId: allergen.value
    }));

    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

    /*
    Send user's appliance preferences to the backend
    */
    axios.put(`http://easybites-portal.azurewebsites.net/app-user/allergens/${user.id}`, preferencesData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
    })
    .catch(error => {
      console.error('Error sending preferences to backend:', error);
    });
  };

  

  return (
    <SafeAreaView style={styles.quiz1}>
      <ImageBackground
        style={styles.tlCornerIcon}
        resizeMode="cover"
        source={require("../assets/Small-EB-Logo.png")}
      />
      <Text style={styles.question2}>Question 2</Text>
      <Text style={styles.title}>Select any allergies you have: </Text>
      <ScrollView style={styles.allergenContainer}>
        {renderAllergens()}
      </ScrollView>

      <View style={styles.navButtons}>
        <Pressable
          style={[styles.backButton]}
          onPress={() => navigation.navigate("Quiz1")}
        >
          <Text style={[styles.buttonText]}>{`Back`}</Text>
        </Pressable>

        <Pressable
          style={[styles.nextButton]}
          onPress={() => {
            submitAllergenPreferences(); 
            navigation.navigate("Home");}}
        >
          <Text style={[styles.buttonText]}>{`Next`}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Quiz;
