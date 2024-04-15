import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Pressable,
  SafeAreaView,
} from "react-native";
import styles from "./Quiz1Style";
import axios from 'axios';
import { useAuth ,useUser } from "@clerk/clerk-expo";


const Quiz = ({ navigation }) => {
  const [selectedAppliance, setSelectedAppliance] = useState([]);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const {user} = useUser();

  /*
  Toggle appliance checked or not based on user selection
  */
  const toggleAppliance = (appliance) => {
    const index = selectedAppliance.findIndex(item => item.label === appliance.label);
    if (index !== -1) {
      setSelectedAppliance(prevState => (
        prevState.filter(item => item.label !== appliance.label)
      ));
    } else {
      setSelectedAppliance(prevState => (
        [...prevState, appliance]
      ));
    }
  };
  
  
  /*
  Show list of appliances on page
  */
  const renderAppliances = () => {
    return [
      { label: 'Air Fryer', value: '3000' },
      { label: 'Crockpot', value: '3001' },
      { label: 'Stove', value: '3002' },
      { label: 'Oven', value: '3003' },
      { label: 'Microwave', value: '3004' },
      { label: 'Blender', value: '3005' },
      { label: 'Instant Pot', value: '3006' },
      // { label: 'None', value: '3007' },
    ].map(appliance => {
      return (
      <Pressable
        key={appliance.label}
        style={[
          styles.applianceButton, 
          selectedAppliance.some(item => item.label === appliance.label) && styles.selectedApplianceButton
        ]}        
        onPress={() => toggleAppliance(appliance)}
      >
        <Text style={[
          styles.applianceButtonText,
          selectedAppliance.includes(appliance.label) && styles.selectedText
        ]}>
          {appliance.label}
        </Text>
      </Pressable>
      )
    });
  };
  
  /*
  Function handle appliance preferences from front to backend
  */
  const submitAppliancePreferences = async () => {
    /*
    Concatenate None to list of selected appliances so recipes with 'None' appliances are shown to user
    */    
    const selectedApplianceAndNone = [...selectedAppliance, { label: 'None', value: '3007' }];


    const preferencesData = selectedApplianceAndNone.map(appliance => ({
      applianceId: appliance.value
    }));



    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

    /*
    Send user's appliance preferences to the backend
    */
    axios.put(`http://easybites-portal.azurewebsites.net/app-user/appliances/${user.id}`, preferencesData, {
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
        <Text style={styles.question1}>Question 1</Text>
        <Text style={styles.title}>Select all appliances available to you:</Text>
        <View style={styles.applianceContainer}>
          {renderAppliances()}
        </View>
        <Pressable
          style={[styles.nextButton]}
          onPress={() => {
            submitAppliancePreferences(); 
            navigation.navigate("Quiz2");
          }}>
          <Text style={[styles.buttonText]}>{`Next`}</Text>
        </Pressable>
    </SafeAreaView>
  );
};

export default Quiz;
