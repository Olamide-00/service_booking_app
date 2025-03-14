import { Image } from "react-native";

export default function Loading() {
  return (
    <Image
      source={require("../../../assets/loading.gif")}
      style={{ width: 100, height: 100 }}
      resizeMode="contain"
    />
  );
}
