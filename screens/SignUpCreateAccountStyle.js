import { StyleSheet } from 'react-native';
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#f2f1ed",
    width: '100%',
    height: '100%',
    overflow: "hidden",
  },
  logo: {
    top: '10%',
    width: 195,
    height: 173,
    marginBottom: 20,
},
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.colorGray_100,
    textAlign: "center",
    fontFamily: FontFamily.Arial,
    fontWeight: "700",
    alignItems: "center",
    fontSize: FontSize.size_26xl,
  },
  formContainer: {
    width: '73%',
    // paddingRight: 120,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    paddingLeft: 25,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#D9D9D9'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: Color.colorSandybrown,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: FontFamily.Arial,
  },
  haveAnAccount: {
    color: Color.colorBlack,
    fontWeight: 'bold',
  },
  login: {
    color: Color.colorIndigo,
  },
  haveAnAccountContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

});

export default styles;

