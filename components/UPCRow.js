import React, {useState, useEffect} from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { Card } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import styles from './UPCRowStyling'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';


const UPCRow = ({upcValue, krogerToken}) => {
    // make kroger request to get image address and ingredient name
    const [krogerInfo, setKrogerInfo] = useState({});
    const [isPressed, setIsPressed] = useState(false); // State to track if the icon is pressed


    useEffect(() => {
        // console.log(upcValue)

        const fetchKrogerData = async () => {
            console.log(upcValue)

            try {
              const response = await axios.get(`https://api.kroger.com/v1/products/${upcValue}?filter.locationId=03500520`, {
                headers: {
                  Authorization: `Bearer ${krogerToken}`,
                },
              });
              console.log("Kroger Data:", response.data);
              setKrogerInfo(response.data.data)
              // Do something with the Kroger data
            } catch (error) {
              console.error("Error fetching Kroger data:", error);
            }
          };
          fetchKrogerData();
    }, [upcValue])

    console.log(krogerInfo)
    const toggleIcon = () => {
        setIsPressed(!isPressed); // Toggle the state when the icon is pressed
    };
    

    return (
        <View style={styles.upcRowWrapper}>
            {/* Icon */}
            <Pressable onPress={toggleIcon} style={styles.xBox}>
                {isPressed ? (
                    <Feather name="x-square" size={20} color="black"/>
                ) : (
                    <Feather name="square" size={20} color="black"  />
                )}
            </Pressable>
            {/* image */}
            <Image source={{uri: `https://www.kroger.com/product/images/small/front/${upcValue}`}} style={styles.upcImage} />
            {/* <Image source={{uri: krogerInfo.images[0].sizes[4].url}}/> */}
            {/* ingredient name */}
            <View style={[styles.textContainer, isPressed && styles.lineThrough]}>
                <Text style={styles.textDescription}>{krogerInfo.description}</Text>
            </View>
        </View>
    );
  };
  

  
  export default UPCRow;
  