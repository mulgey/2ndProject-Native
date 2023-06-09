import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

// components
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

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
      <View>
        <Text>Daha mı yüksek, daha mı düşük?</Text>
        <View>
          {/* yön parametresini eklemek için bind metodunu kullandık */}
          <PrimaryButton
            basımFonksiyonu={sonrakiTahminFonksiyonu.bind(this, "düşür")}
          >
            -
          </PrimaryButton>
          <PrimaryButton
            basımFonksiyonu={sonrakiTahminFonksiyonu.bind(this, "yükselt")}
          >
            +
          </PrimaryButton>
        </View>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
});
