import { Image, StyleSheet, Text, View } from "react-native";

// components & constants
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function GameOverScreen({
  seçilmişSayı,
  roundSayısı,
  startNewFonksiyonu,
}) {
  return (
    <View style={styles.rootContainer}>
      <Title>OYUN BİTTİ !</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Telefonunuzun şansı ve zekası{" "}
        <Text style={styles.highlightText}>{seçilmişSayı}</Text> numarasını
        tahmin etmek için{" "}
        <Text style={styles.highlightText}>{roundSayısı}</Text> adet denemeye
        ihtiyaç duydu
      </Text>
      <PrimaryButton basımFonksiyonu={startNewFonksiyonu}>
        Yeni Bir Oyuna Başla
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    // daire yapmak için yarısı
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    // belirlenen sınırları (width, height) aşmaması için overflow: "hidden" ekledik
    overflow: "hidden",
    margin: 36,
  },
  image: {
    // resmin tamamının o alana sıkışıp tamamının gözükmesi için
    // yüzde değerleri her zaman bir üstteki container a referans olur
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    // text içinde text olduğu için alt bölümlere etki etti, view içi text olsaydı bu şekilde olmazdı
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlightText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
