import { Pressable, StyleSheet, Text, View } from "react-native";

// constants
import Colors from "../../constants/colors";

export default function PrimaryButton({ children, basımFonksiyonu }) {
  return (
    <View style={styles.buttonOuterContainer}>
      {/* ripple'ın ideal gözükmesi için view'ı dışarı çektik, pressable içeride kaldı  */}
      <Pressable
        style={({ pressed }) =>
          pressed
            ? // eğer basılıysa
              [styles.buttonInnerContainer, styles.iOSPressed]
            : // basılı değilse sadece
              styles.buttonInnerContainer
        }
        // button'ı kullandığın her yerde basımFonksiyonu prop'u kullanarak istediğin fonksiyonu buraya yollayabilirsin
        onPress={basımFonksiyonu}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    // bu bölümdeki stil ve efektlerin dışarı çıkan kısımları kırpılsın
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // android shadow
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  iOSPressed: {
    opacity: 0.75,
  },
});
