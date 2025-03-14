import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  ImageProps,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { BoldText, RegularText } from "@/src/component/text/indext";
import { OnboardingData } from "@/src/constant/onboardingData";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Dots from "./component/dots";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "@/src/store/userStore";

const { width } = Dimensions.get("window");

type OnboardingProps = {
  title: string;
  description: string;
  id: number;
  image: ImageProps;
};

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList<OnboardingProps>>(null);
  const { setIsOnboarded } = useAuthStore();

  const completeOnboarding = () => {
    setIsOnboarded(true);
    navigation.replace("Login");
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(slideIndex);
  };

  const handleNext = () => {
    if (index < OnboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      completeOnboarding();
    }
  };
  const renderItem = ({ item }: { item: OnboardingProps }) => {
    return (
      <View style={[styles.onboarding, { width }]}>
        <Image source={item.image} resizeMode="cover" style={styles.image} />
        <Spacer direction="vertical" size={hp(15)} />
        <View style={{ paddingLeft: wp(5) }}>
          <BoldText size="xlarge" color="primary">
            {item.title}
          </BoldText>
          <View style={styles.desc}>
            <RegularText size="medium" color="secondaryColor">
              {item.description}
            </RegularText>
          </View>
        </View>
        <View></View>
        <View style={styles.footer}>
          <Dots index={index} />
          <TouchableOpacity onPress={handleNext}>
            <BoldText size="medium" color="primary">
              {index === OnboardingData.length - 1 ? "Finish" : "Next"}
            </BoldText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Animated.FlatList
          ref={flatListRef}
          data={OnboardingData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          pagingEnabled
          snapToInterval={width}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
