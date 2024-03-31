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

// const applianceData = [
//   { label: 'Air Fryer', value: '3000' },
//   { label: 'Crockpot', value: '3001' },
//   { label: 'Stove', value: '3002' },
//   { label: 'Oven', value: '3003' },
//   { label: 'Microwave', value: '3004' },
//   { label: 'Blender', value: '3005' },
//   { label: 'Instant Pot', value: '3006' },
//   { label: 'None', value: '3007' },
// ];

const Quiz = ({ navigation }) => {
  const [selectedAppliance, setSelectedAppliance] = useState([]);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const {user} = useUser();

  const toggleAppliance = (appliance) => {
    console.log("Appliance:", appliance);
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
  
  

  const renderAppliances = () => {
    return [
      { label: 'Air Fryer', value: '3000' },
      { label: 'Crockpot', value: '3001' },
      { label: 'Stove', value: '3002' },
      { label: 'Oven', value: '3003' },
      { label: 'Microwave', value: '3004' },
      { label: 'Blender', value: '3005' },
      { label: 'Instant Pot', value: '3006' },
      { label: 'None', value: '3007' },
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
  
  const submitAppliancePreferences = async () => {
    const preferencesData = selectedAppliance.map(appliance => ({
      applianceId: appliance.value
    }));

    console.log('Sending preferences:', preferencesData);
    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

    // axios.put(`http://localhost/app-user/appliances/${user.id}`, preferencesData, {
    axios.put(`http://easybites-portal.azurewebsites.net/app-user/appliances/${user.id}`, preferencesData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log("successful adding appliances for user")
      console.log('Response from backend:', response.data);
      // Handle response from backend if needed
    })
    .catch(error => {
      console.error('Error sending preferences to backend:', error);
      // Handle error if needed
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
        <Text style={styles.title}>Select Appliances That you Have at Home</Text>
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
