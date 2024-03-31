import { StyleSheet } from 'react-native';
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const styles = StyleSheet.create({
  tlCornerIcon: {
    top: 44,
    left: 23,
    width: 70,
    height: 60,
    position: "absolute",
  },
  brCornerIcon: {
    top: 715,
    left: 229,
    width: 161,
    height: 129,
    position: "absolute",
  },
  quiz1: {
    backgroundColor: "#f2f1ed",
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
  question1: {
    top: '15%',
    textAlign: 'center',
    fontSize: 55,
    color: Color.colorGray_100,
    display: "flex",
    width: '100%',
    fontFamily: FontFamily.Arial,
    fontWeight: "800",
  },
  title: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
    top: '20%',
    textAlign: 'center',
  },
  applianceContainer: {
    top: '25%',
    maxHeight: "60%",
    marginBottom: 10,
    width: '80%',
    marginLeft: '10%'
  },
  applianceButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedApplianceButton: {
    backgroundColor: '#7B886B',
  },
  applianceButtonText: {
    color: '#000',
  },
  selectedApplianceButtonText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    marginTop: 10,
  },
  nextButton: {
    fontSize: 14,
    width: 100,
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20, 
    backgroundColor: '#F7B27D', 
    top: '25%',
    marginLeft: '60%',
  },
  buttonText: {
    color: '#000',
    fontWeight: "700",
    fontFamily: FontFamily.firaSansCondensedBold,
  },
  });

  export default styles;