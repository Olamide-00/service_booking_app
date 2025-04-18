import { ImageProps, View, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import Header from "@/src/component/common/header";
import { educationData } from "@/src/constant/data";
import { RegularText } from "@/src/component/text/indext";
import Card from "@/src/component/common/card";
import { useNavigation } from "@react-navigation/native";

type Props = {
  id: string;
  logo: ImageProps;
  label: string;
};

const Education = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.root}>
      <Header showLogo />
      {educationData.map((data) => {
        return (
          <Pressable
            onPress={() => navigation.navigate(data.screen)}
            key={data.id}
          >
            <Card style={styles.item}>
              <View style={styles.imageContainer}>
                <Image
                  source={data.logo}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <RegularText size="small" color="primary">
                {data.label}
              </RegularText>
            </Card>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
};

export default Education;
