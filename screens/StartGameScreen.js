import { TextInput, View, StyleSheet, Alert } from "react-native";
import { useState } from "react";

// components & constants
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

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
    <View style={styles.rootContainer}>
      <Title>Sayımı Tahmin Et</Title>
      <Card>
        <InstructionText style={{ textAlign: "center" }}>
          1 ile 99 arasında bir sayı girin
        </InstructionText>
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
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderWidth: 2,
    color: Colors.accent500,
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
