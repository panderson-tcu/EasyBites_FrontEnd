import { StyleSheet } from 'react-native';
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const styles = StyleSheet.create({
    quizTitleFlexBox: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
    },
    brCornerIcon: {
      top: 715,
      left: 229,
      width: 161,
      height: 129,
      position: "absolute",
    },
    quizTitle: {
      top: 323,
      left: 40,
      fontSize: FontSize.size_26xl,
      fontFamily: FontFamily.Arial,
      color: Color.colorGray_100,
      textAlign: "center",
      display: "flex",
      width:320,
      fontWeight: "700",
      justifyContent: "center",
      alignItems: "center",
      height: 129,
    },
    takeQuiz: {
      left: 25,
      fontSize: FontSize.size_xs,
      color: Color.colorBlack,
      width:100,
      alignItems: "center",
      textAlign: "left",
      fontFamily: FontFamily.firaSansCondensedBold,
      fontWeight: "700",
    },
    quizButton: {
      top: 523,
      left: 78,
      borderRadius: Border.br_3xs,
      backgroundColor: Color.colorSandybrown,
      width: 234,
      flexDirection: "row",
      paddingHorizontal: 93,
      paddingVertical: 10,
      overflow: "hidden",
    },
    skip1: {
      fontSize: FontSize.size_lg,
      color: Color.colorGray_300,
      width: 36,
      height: 17,
      textAlign: "left",
      fontFamily: FontFamily.firaSansCondensedBold,
      fontWeight: "700",
    },
    skip: {
      left: 177,
      top: 750,
      position: "absolute",
    },
    EBIcon: {
      top: 102,
      left: 98,
      width: 195,
      height: 173,
      position: "absolute",
    },
    quiz0: {
      backgroundColor: "#f2f1ed",
      flex: 1,
      width: "100%",
      height: 844,
      overflow: "hidden",
    },
  });

  export default styles;