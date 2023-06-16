import { Alert, FlatList, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

// components
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

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
  const [tahminRoundu, tahminRounduAksiyonu] = useState([ilkTahmin]);

  useEffect(() => {
    if (mevcutTahmin === seçilmişSayı) {
      // her tahminde güncellenen tahmin uzunluğunu fonksiyon içerisinde app.js'e gönderdik
      gameOverFonksiyonu(tahminRoundu.length);
    }
  }, [mevcutTahmin, seçilmişSayı, gameOverFonksiyonu]);

  // oyun yeniden başladığında min-max'leri sıfırlayalım
  // empty dependency ile sadece başlarken sıfırlamayı sağladık
  useEffect(() => {
    minSınır = 1;
    maxSınır = 100;
  }, []);

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
    tahminRounduAksiyonu((öncekiler) => [newRndNum, ...öncekiler]);
  }

  // her tahminde yeniden hesaplanacaktır
  const tahminRoundListeUzunluğu = tahminRoundu.length;

  return (
    <View style={styles.screen}>
      <Title>Rakibin Tahmini</Title>
      <NumberContainer>{mevcutTahmin}</NumberContainer>
      <Card>
        {/* Bu kısımda style birleştirmesi örneği uyguladık (cascading nature) */}
        <InstructionText style={styles.instructionText}>
          Yükseltsem mi düşürsem mi?
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
      <View style={styles.flatListContainer}>
        {/* {tahminRoundu.map((herbirRound) => (<Text key={herbirRound}>{herbirRound}</Text>))} */}
        <FlatList
          data={tahminRoundu}
          renderItem={(herbirRound) => {
            return (
              <GuessLogItem
                // en son eklediğimiz sıfır olduğu için içerik sayısı = en son / en üstteki tahminin sayısı
                roundSayısı={tahminRoundListeUzunluğu - herbirRound.index}
                tahmin={herbirRound.item}
              />
            );
          }}
          keyExtractor={(item) => item}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // tahminler listesinin ideal şekilde scrollable olmasını sağladı
  flatListContainer: {
    flex: 1,
    padding: 16,
  },
  screen: {
    flex: 1,
    padding: 10,
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
