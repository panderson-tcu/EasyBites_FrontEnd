import { StyleSheet } from 'react-native';
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const styles = StyleSheet.create({
    upcRowWrapper: {
        flexDirection: 'row',
        height: 80,
        paddingVertical: '2%',
        // justifyContent: 'space-evenly'
    },
    upcImage: {
        flexDirection: 'row',
        position: 'relative',
        height: '100%',
        width: '15%',
        resizeMode: 'contain'
    },
    xBox: {
        paddingRight: '5%',
        paddingTop: '5%',
    },
    textDescription: {
        paddingTop: '5%',
        paddingLeft: '5%',
        fontSize: 16,
    },
    textContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '70%'
    }
});

export default styles;
