import * as React from "react";
import { 
View,
Text,
StyleSheet,
SafeAreaView,
Image,
TouchableOpacity,
Pressable
} from "react-native";
// import EditProfile from "./screens/EditProfile";
import { Color } from "../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Switch } from "@rneui/base";
import styles from "./ProfileStyle";
import { useAuth ,useUser } from "@clerk/clerk-expo";


const profile_picture = <Ionicons name="person-circle-outline" size={150} color="#7B886B" />;



export default function Profile({navigation}) {
    const {user} = useUser();
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.profileTop}>
                    <View style={styles.profilePictureContainer}></View>
                        {profile_picture}
                    <Text style={styles.profileName}>{user.fullName}</Text>
                </View>

                <Text style={styles.buttonSection}>Account Settings</Text>
                <Pressable style={styles.profileBottom} onPress={() => navigation.navigate('Quiz')} currentPage={'Profile'}>
                    <View style={styles.buttonArea}>
                        <Text style={styles.buttonName}>Edit Recipe Preferences</Text>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="gray" style={styles.rightArrow}/>
                    </View>
                </Pressable>
 
                <TouchableOpacity style={styles.profileBottom}>
                    <View style={styles.buttonArea}>
                        <Text style={styles.buttonName}>Change Password</Text>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="gray" style={styles.rightArrow}/>
                    </View>
                </TouchableOpacity>

                <Pressable style={styles.profileBottom} onPress={() => navigation.navigate('AllergenKey')} currentPage={'Profile'}>
                    <View style={styles.buttonArea}>
                        <Text style={styles.buttonName}>Allergen Icon Key</Text>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="gray" style={styles.rightArrow}/>
                    </View>
                </Pressable>

               

            </SafeAreaView>
        </View>
    );
}
