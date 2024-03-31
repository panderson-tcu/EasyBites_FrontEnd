import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
} from "react-native";
import styles from './AllergenKeyStyle.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Quiz = ({navigation}) => {

  return (
    <SafeAreaView style={styles.allergen}>
        <Pressable style={styles.iconContainerLeft}>
            <View style={{ borderRadius: 10, padding: 5, backgroundColor: '#f2f1ed' }}>
            <Ionicons name="chevron-back-outline" size={24} color="black" onPress={() => navigation.navigate('Profile')}/>
            </View>
        </Pressable>
        <Text style={styles.mainTitle}>Allergen Icon Key</Text>
        <View style={styles.allergenRow}>
            <View style={[styles.allergenIcon, { backgroundColor: 'rgba(231, 103, 103, 0.67)' }]}>
                <FontAwesome6 name="shrimp" size={18} color="black" />
            </View>
            <Text style={styles.allergenTitle}>Shellfish</Text>
        </View>
        <View style={styles.allergenRow}>
            <View style={[styles.allergenIcon, { backgroundColor: '#A4B2D8' }]}>
                <Ionicons name="fish-outline" size={22} color="black" />
            </View>
            <Text style={styles.allergenTitle}>Fish</Text>

        </View>
        <View style={styles.allergenRow}>
            <View style={[styles.allergenIcon, { backgroundColor: '#rgba(171, 64, 57, .6)' }]}>
                <MaterialCommunityIcons name="cow" size={22} color="black" />
            </View>
            <Text style={styles.allergenTitle}>Milk</Text>

        </View>
        <View style={styles.allergenRow}>
            <View style={[styles.allergenIcon, { backgroundColor: '#9CB99F' }]}>
                <Text style={styles.allergenText}>soy</Text>
            </View>
            <Text style={styles.allergenTitle}>Soy Beans</Text>

        </View>
        <View style={styles.allergenRow}>
            <View style={[styles.allergenIcon, { backgroundColor: '#B49782' }]}>
                <FontAwesome6 name="wheat-awn" size={18} color="black" />
            </View>
            <Text style={styles.allergenTitle}>Wheat</Text>

        </View>
        <View style={styles.allergenRow}>
            <View style={[styles.allergenIcon, { backgroundColor: '#E2C971' }]}>
                <MaterialCommunityIcons name="egg-outline" size={22} color="black" />
            </View>
            <Text style={styles.allergenTitle}>Eggs</Text>

        </View>
        <View style={styles.allergenRow}>
            <View style={[styles.allergenIcon, { backgroundColor: '#AC9BD5' }]}>
                <MaterialCommunityIcons name="peanut-outline" size={22} color="black" />
            </View>
            <Text style={styles.allergenTitle}>Peanut</Text>

        </View>
        <View style={styles.allergenRow}>
            <View style={[styles.allergenIcon, { backgroundColor: '#F7B27D' }]}>
                <Text style={styles.allergenText}>nut</Text>
            </View>
            <Text style={styles.allergenTitle}>Tree Nuts</Text>

        </View>
    </SafeAreaView>

  );
};



export default Quiz;
