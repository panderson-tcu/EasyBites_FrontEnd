import { StyleSheet } from 'react-native';
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const styles = StyleSheet.create({
    allergen: {
        backgroundColor: "#f2f1ed",
        flex: 1,
        width: "100%",
        height: 844,
        overflow: "hidden",
    },
    iconContainerLeft: {
      position: 'absolute',
      top: '10%',
      left: '5%',
      zIndex: 1, // Ensure the icons are displayed on top
    },
    allergenIcon: {
        backgroundColor: '#F7B27D',
        padding: '2%',
        marginTop: 2,
        marginLeft: 5,
        borderRadius: 20,
        width: 'fitContent',
      },
      allergenText: {
        fontSize: 14,
      },
      allergenRow: {
        flexDirection: 'row',
        top: '24%',
        padding: '2%',
        paddingLeft: '5%'
      },
      allergenTitle: {
        fontSize: 22,
        paddingLeft: '2%'
      },
      mainTitle: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '700',
        top: '10%',
        fontSize: 30,
      },
});
export default styles;