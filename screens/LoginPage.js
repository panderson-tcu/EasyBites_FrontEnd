import React, {useState} from "react";
import { SafeAreaView, Text, TextInput, Image, Pressable, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useSignIn, useAuth } from "@clerk/clerk-expo";
import styles from './LoginPageStyle';

 
const LoginPage = ({ navigation }) => {

  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { userId, sessionId, getToken } = useAuth();
 
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
      alert(err.errors[0].message);
    }
  };


  return (
    <KeyboardAvoidingView style={{ flex:1 }} behavior="padding">
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/EBicon.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      <View>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <Pressable
            style={styles.haveAnAccountContainer}
            onPress={() => navigation.navigate("SignUpCreateAccount")} >
            <Text style={styles.haveAnAccount}>
              <Text>{`Don't have an account? `}</Text>
              <Text style={styles.login}>Sign Up</Text>
            </Text>
        </Pressable>
      </View>

    </SafeAreaView>
    </ScrollView>
    </KeyboardAvoidingView>

  );
}

export default LoginPage;