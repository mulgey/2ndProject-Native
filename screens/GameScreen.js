import { Alert, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

// components
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minSınır = 1;
let maxSınır = 100;

export default function GameScreen({ seçilmişSayı, gameOverFonksiyonu }) {
  // game over esnasında hata verme potansiyeli olduğu için min ve max'ları ilkTahmin için hard code'ladık
  const ilkTahmin = generateRandomBetween(1, 100, seçilmişSayı);
  const [mevcutTahmin, mevcutTahminAksiyonu] = useState(ilkTahmin);

  useEffect(() => {
    if (mevcutTahmin === seçilmişSayı) {
      gameOverFonksiyonu();
    }
  }, [mevcutTahmin, seçilmişSayı, gameOverFonksiyonu]);

  function sonrakiTahminFonksiyonu(yön) {
    if (
      (yön === "düşür" && mevcutTahmin < seçilmişSayı) ||
      (yön === "yükselt" && mevcutTahmin > seçilmişSayı)
    ) {
      Alert.alert("Şakacı seniii ...!", "Beni yanlış yönlendirmeye çalıştın", [
        {
          text: "Pardon!",
          style: "cancel",
        },
      ]);
      return;
    }
    if (yön === "düşür") {
      maxSınır = mevcutTahmin;
    } else {
      minSınır = mevcutTahmin + 1;
    }
    // en son yapılan tahmini exclude'ladık
    const newRndNum = generateRandomBetween(minSınır, maxSınır, mevcutTahmin);
    // initial state'i ilk defa burada yeniden güncelledik
    mevcutTahminAksiyonu(newRndNum);
  }

  return (
    <View style={styles.screen}>
      <Title>Rakibin Tahmini</Title>
      <NumberContainer>{mevcutTahmin}</NumberContainer>
      <Card>
        {/* Bu kısımda style birleştirmesi örneği uyguladık (cascading nature) */}
        <InstructionText style={styles.instructionText}>
          Daha mı yüksek, daha mı düşük?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            {/* yön parametresini eklemek için bind metodunu kullandık */}
            <PrimaryButton
              basımFonksiyonu={sonrakiTahminFonksiyonu.bind(this, "düşür")}
            >
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              basımFonksiyonu={sonrakiTahminFonksiyonu.bind(this, "yükselt")}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
