import { StyleSheet } from 'react-native';
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f1ed',
        paddingVertical: 24,
    },
    safeArea: {
        flex: 1,
        backgroundColor: Color.colorWhitesmoke,
    },
    profileTop: {
        height: 250,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileName: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "600",
        color: Color.colorGray_200,
        textAlign: 'center',

    },
    profilePictureContainer: {
        position: 'relative',
    },
    profileBottom: {
        backgroundColor: Color.colorWhitesmoke, 
        // padding: 10,
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        paddingVertical: 10,
    },
    buttonSection: {
        marginTop: 10,
        flexDirection: 'row',
        fontSize: 15,
        marginLeft: 10,
        color: Color.colorGray_200
    },
    buttonName: {
        width: 270,
        fontSize: 20,
        fontWeight: "600",
        color: Color.colorGray_200,
        backgroundColor: Color.colorWhitesmoke,
        marginRight: 30,
        paddingLeft: 20,
    },
    space: {
        width: 400,
        marginTop: 5,
        height: 30,
        backgroundColor: Color.colorWhitesmoke,

    },
    switch: {
        transform: [{scale: 0.7}],
    },
    rightArrow: {
        paddingRight: 20,
    },

});
export default styles;

