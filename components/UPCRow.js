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


const UPCRow = ({upcValue, krogerToken, sendDataToListItem}) => {
    const [krogerInfo, setKrogerInfo] = useState({});
    const [isPressed, setIsPressed] = useState(false); // State to track if the icon is pressed

    /*
      Use React callback function to pass price data to parent component
    */
    const sendDataToParentHandler = (jsonData, isSubtracted) => {
      price = parseFloat(jsonData.items[0].price.regular.toFixed(2)); // Example data (can be dynamic)
      if(typeof price != "number"){
        console.log("price is not a number, it is: ", price)
      }
      sendDataToListItem(price, isSubtracted);
    };

    /*
      if upcValue changes, call axios request to get information for ingredient
    */
    useEffect(() => {
        const fetchKrogerData = async () => {
            try {
              const response = await axios.get(`https://api.kroger.com/v1/products/${upcValue}?filter.locationId=03500520`, {
                headers: {
                  Authorization: `Bearer ${krogerToken}`,
                },
              });
              setKrogerInfo(response.data.data)
              sendDataToParentHandler(response.data.data, false);
            } catch (error) {
              console.error("Error fetching Kroger data:", error);
            }
          };
          fetchKrogerData();
    }, [upcValue])

    /*
      Toggle checked icon
      Change isPressed state and add or subtract price in parent component
    */
    const toggleIcon = () => {
        setIsPressed(!isPressed); // Toggle the state when the icon is pressed
        sendDataToParentHandler(krogerInfo, !isPressed);
    };
    

    return (
        <View style={styles.upcRowWrapper}>
            {/* Icon */}
            <Pressable onPress={toggleIcon} style={styles.xBox}>
                {/* 
                  If pressed, display filled in square
                  Else display square outline
                */}
                {isPressed ? (
                    <Feather name="x-square" size={20} color="black"/>
                ) : (
                    <Feather name="square" size={20} color="black"  />
                )}
            </Pressable>
            <Image source={{uri: `https://www.kroger.com/product/images/small/front/${upcValue}`}} style={styles.upcImage} />
            <View style={[styles.textContainer, isPressed && styles.lineThrough]}>
                <Text style={styles.textDescription}>{krogerInfo.description}</Text>
            </View>
        </View>
    );
  };
  
  export default UPCRow;