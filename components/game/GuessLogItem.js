import { StyleSheet, Text, View } from "react-native";

// constants & components
import Colors from "../../constants/colors";

export default function GuessLogItem({ roundSayısı, tahmin }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundSayısı}</Text>
      <Text style={styles.itemText}>Rakibin Tahmini: {tahmin}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    // android shadow
    elevation: 4,
    // ios shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
