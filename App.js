import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [seçilmişSayı, seçilmişSayıAksiyonu] = useState();

  function seçilmişSayıFonksiyonu(pickedNumber) {
    seçilmişSayıAksiyonu(pickedNumber);
  }

  // state değiştikçe aşağıda tekrar çalışacak olan if bloğu
  let screen = (
    <StartGameScreen seçilmişSayıFonksiyonu={seçilmişSayıFonksiyonu} />
  );
  if (seçilmişSayı) {
    screen = <GameScreen />;
  }

  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        // flex özelliklerinin bu arkaplana da uygulanması için
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {/* yukarıdaki if bloğunun sonucuna göre gelen "screen" componenti */}
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    // flex: 1 View'ın alabileceği tüm alanı alıp rengi tüm sayfaya uygulamasını sağladı
    flex: 1,
    // backgroundColor: "#ddb52f",
  },
  backgroundImage: {
    opacity: 0.4,
  },
});
