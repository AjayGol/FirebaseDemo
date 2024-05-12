import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "@/constants/Common";
import { Colors } from "@/constants/Colors";
const { icon, lightBlue, background, text } = Colors.light;

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: background,
    justifyContent: "center",
    alignItems: "center",
  },
  commonTextInput: {
    borderColor: icon,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signUpContainer: {
    backgroundColor: lightBlue,
    borderRadius: 8,
    marginBottom: 80,
  },
  signUpText: {
    color: background,
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 70,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginBottom: 80,
  },
  line: {
    backgroundColor: lightBlue,
    width: "20%",
    height: 2,
    marginHorizontal: 10,
  },
  textInputMainView: {
    width: screenWidth * 0.8,
  },
  text: {
    color: text,
    fontSize: 16,
    fontWeight: "regular",
  },
  loginButtonContainer: {
    backgroundColor: lightBlue,
    borderRadius: 8,
    marginTop: 20,
  },
  createPostContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: screenHeight * 0.2,
  },
  createAccountContainer: {
    marginBottom: 40,
  },
  createAccountText: {
    color: lightBlue,
    fontSize: 35,
    fontWeight: "bold",
    paddingHorizontal: 50,
    paddingVertical: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  createAccountButton: {
    backgroundColor: lightBlue,
    borderRadius: 8,
    marginTop: 20,
  },
  createAccountCta: {
    color: background,
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 70,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: screenHeight * 0.1,
  },
  newPostContainer: {
    borderColor: lightBlue,
    borderWidth: 2,
    marginBottom: screenHeight * 0.15,
    width: screenWidth - 20,
    alignSelf: "center",
  },
  newPostInsideContainer: {
    borderColor: lightBlue,
    borderWidth: 2,
    marginBottom: 40,
    paddingBottom: 10,
    width: screenWidth * 0.83,
    alignSelf: "center",
  },
  newPostText: {
    color: lightBlue,
    fontSize: 35,
    fontWeight: "bold",
    paddingHorizontal: 50,
    paddingVertical: 10,
    justifyContent: "center",
  },
  newPostInsideText: {
    color: text,
    fontSize: 16,
    fontWeight: "regular",
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
  },
  postAccountCta: {
    color: background,
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 70,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  postMessageButton: {
    backgroundColor: lightBlue,
    borderRadius: 8,
    marginTop: 5,
  },
  textInputCreate: { marginBottom: 40 },
  loginButton: {
    color: text,
  },
  textBoxBig: { height: 110 },
});
