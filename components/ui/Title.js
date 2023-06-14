import { StyleSheet, Text } from "react-native";

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    fontSize: 24,
    // we already imported fonts with useFonts() and fontFamily
    // fontWeight: "bold",
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
  },
});
