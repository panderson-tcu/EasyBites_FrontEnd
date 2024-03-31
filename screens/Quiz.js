import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import styles from './QuizStyle';

const Quiz = ({navigation}) => {

  return (
    <View style={styles.quiz0}>
      {/* <ImageBackground
        style={styles.brCornerIcon}
        resizeMode="cover"
        source={require("../assets/brCornerEBicon.png")}
      /> */}
      <Text style={[styles.quizTitle, styles.quizTitleFlexBox]}>
        Personalize Your Easy Bites
      </Text>
      <Pressable
        style={[styles.quizButton, styles.quizTitleFlexBox]}
        onPress={() => navigation.navigate("Quiz1")}
      >
        <Text style={[styles.takeQuiz]}>{`Take Quiz `}</Text>
      </Pressable>
      <Pressable style={styles.skip} onPress={() => navigation.navigate("Home")}>
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
