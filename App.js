import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// screens & constants
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";

export default function App() {
  const [seçilmişSayı, seçilmişSayıAksiyonu] = useState();
  const [gameOver, gameOverAksiyonu] = useState(true);
  const [roundSayısı, roundSayısıAksiyonu] = useState(0);

  // font konusunu yerel dosyalar ile bu şekilde düzenledik
  const [fontlarYüklendi] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontlarYüklendi) {
    return <AppLoading />;
  }

  function seçilmişSayıFonksiyonu(pickedNumber) {
    seçilmişSayıAksiyonu(pickedNumber);
    // sayıyı seçtikten sonra gamover'ı false'luyoruz
    gameOverAksiyonu(false);
  }

  function gameOverFonksiyonu(kaçTaneRound) {
    gameOverAksiyonu(true);
    // GameScreen'den gelen fonksiyon ile "roundSayısı"nı güncelledik
    // aşağıda roundSayısı={roundSayısı} olarak bitiş ekranına gönderdik
    roundSayısıAksiyonu(kaçTaneRound);
  }

  function startNewFonksiyonu() {
    seçilmişSayıAksiyonu(null);
    roundSayısıAksiyonu(0);
    // bir yukarıdaki çalıştığı için aşağıdakini devre dışı bıraktık
    // gameOverAksiyonu(true);
  }

  // state değiştikçe aşağıda tekrar çalışacak olan if bloğu
  let screen = (
    <StartGameScreen seçilmişSayıFonksiyonu={seçilmişSayıFonksiyonu} />
  );

  if (seçilmişSayı) {
    screen = (
      <GameScreen
        gameOverFonksiyonu={gameOverFonksiyonu}
        seçilmişSayı={seçilmişSayı}
      />
    );
  }

  // ortada seçilen bir sayı yoksa oyun bitiş ekranını açmasın lütfen
  if (gameOver && seçilmişSayı) {
    screen = (
      <GameOverScreen
        seçilmişSayı={seçilmişSayı}
        roundSayısı={roundSayısı}
        startNewFonksiyonu={startNewFonksiyonu}
      />
    );
  }

  return (
    <LinearGradient
      colors={["#4e0329", Colors.accent500]}
      style={styles.rootScreen}
    >
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
