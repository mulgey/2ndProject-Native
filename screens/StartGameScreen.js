import { TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function StartGameScreen() {
  return (
    <View>
      <TextInput />
      <PrimaryButton>Sıfırla</PrimaryButton>
      <PrimaryButton>Onayla</PrimaryButton>
    </View>
  );
}
