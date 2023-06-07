import { TextInput, View, StyleSheet, Alert } from "react-native";
import { useState } from "react";

// components
import PrimaryButton from "../components/PrimaryButton";

export default function StartGameScreen({ seçilmişSayıFonksiyonu }) {
  const [girilenSayı, girilenSayıAksiyonu] = useState("");

  function sayıGirişFonksiyonu(input) {
    girilenSayıAksiyonu(input);
  }

  function girişResetFonksiyonu() {
    girilenSayıAksiyonu("");
  }

  function sayıOnayFonksiyonu() {
    // string olarak girilen sayıyı, "number"ladık
    const tercihSayısı = parseInt(girilenSayı);

    // sayı mı? sayı ise istediğimiz aralıkta mı?
    // return koyarak hata durumunda ilerlemesini engelledik
    if (
      Number.isNaN(tercihSayısı) ||
      tercihSayısı <= 0 ||
      tercihSayısı > 99 ||
      /\D/.test(girilenSayı)
    ) {
      // title, text ve buttons
      Alert.alert("Geçersiz sayı", "Lütfen 1 ve 99 arasında bir sayı giriniz", [
        {
          text: "Tamamdır",
          style: "destructive",
          onPress: girişResetFonksiyonu,
        },
      ]);
      return;
    }
    seçilmişSayıFonksiyonu(tercihSayısı);
  }

  return (
    <View style={styles.inputContainer}>
      {/* maxLength ve keyboardType prop'larını ekledik */}
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        value={girilenSayı}
        onChangeText={sayıGirişFonksiyonu}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton basımFonksiyonu={girişResetFonksiyonu}>
            Sıfırla
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton basımFonksiyonu={sayıOnayFonksiyonu}>
            Onayla
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    // main-axis (default: top to bottom)
    justifyContent: "center",
    // cross-axis, (default: left to right) opposite of the main axis
    alignItems: "center",
    padding: 16,
    marginTop: 100,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#3b021f",
    // android shadow
    elevation: 4,
    // iOS shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    // girdiğimiz değer kutucuk içerisinde ortalı olsun
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  // "buttonsContainer" içerisindeki her tuşun eşit miktarda olacak şekilde max genişliği almasını istedik
  buttonContainer: {
    flex: 1,
  },
});
