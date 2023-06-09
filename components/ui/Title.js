import { StyleSheet, Text } from "react-native";

// constants
import Colors from "../../constants/colors";

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
  },
});
