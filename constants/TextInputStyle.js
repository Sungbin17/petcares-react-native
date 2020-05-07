import { StyleSheet } from "react-native";

const TextInputStyle = StyleSheet.create({
  line: {
    borderBottomWidth: 0.3,
    borderColor: "grey",
    marginTop: 20,
    paddingBottom: 10,
    marginBottom: 25,
    width: "100%"
  },
  multiline: {
    width: "100%",
    borderColor: "grey",
    marginTop: 20,
    padding: 10,
    borderWidth: 0.3,
    height: 200,
    borderRadius: 10
  }
});

export default TextInputStyle;
