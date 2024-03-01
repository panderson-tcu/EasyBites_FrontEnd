import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { 
View,
Text,
StyleSheet,
SafeAreaView,
ScrollView
} from "react-native";

export default function Favorites({navigation}) {
    console.log("entering favorites page")

    return (
        <View style={styles.container}>
            <Text
                style={{ fontSize: 26, fontWeight: 'bold' }}>Favorites Screen!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f1ed',
        alignIems: 'center',
        justifyContent: 'center',
        marginleft: 30,
        marginTop: 5,
    }
})
