import { StyleSheet, Text, View } from "react-native";

// constants
import Colors from "../../constants/colors";

export default function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 24,
    margin: 24,
    // Text elementinde desteklenmediği için View'a sardık
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
    fontSize: 36,
    // we already imported fonts with useFonts() and fontFamily
    // fontWeight: "bold",
  },
});
