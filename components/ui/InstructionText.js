import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

// parent component'dan style alıp merge'leyebiliriz
// style kısmını array haline getirip, sonuncu item yaparsak override'layabiliriz
export default function InstructionText({ children, style }) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
