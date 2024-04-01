import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import styles from './QuizStyle';
import { useAuth ,useUser } from "@clerk/clerk-expo";
import axios from 'axios';



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



const Quiz = ({navigation}) => {
  const {user} = useUser();

  const setDefaults = async () => {

    const token = await Clerk.session.getToken({ template: 'springBootJWT' });

    // axios.put(`http://localhost/app-user/appliances/${user.id}`, applianceDefaults, {
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
  };

  return (
    <View style={styles.quiz0}>
      {/* <ImageBackground
        style={styles.brCornerIcon}
        resizeMode="cover"
        source={require("../assets/brCornerEBicon.png")}
      /> */}
      <Text style={[styles.quizTitle, styles.quizTitleFlexBox]}>
        Personalize your Easy Bites
      </Text>
      <Pressable
        style={[styles.quizButton, styles.quizTitleFlexBox]}
        onPress={() => navigation.navigate("Quiz1")}
      >
        <Text style={[styles.takeQuiz]}>{`Start`}</Text>
      </Pressable>
      <Pressable style={styles.skip} onPress={() => {
        setDefaults();
        navigation.navigate("Home")}}>
        {/* change later to profile pagenlanding */}
        <Text style={[styles.skip1]}>{`Skip `}</Text>
        {/* implement home page without any preferences selected. */}
      </Pressable>
      <ImageBackground
        style={styles.EBIcon}
        resizeMode="cover"
        source={require("../assets/EBicon.png")}
      />
    </View>
  );
};



export default Quiz;
