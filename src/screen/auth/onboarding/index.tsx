import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { BoldText, RegularText } from "@/src/component/text/indext";
import { OnboardingData } from "@/src/constant/onboardingData";
import Spacer from "@/src/component/common/spacer";
import Dots from "./component/dots";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "@/src/store/userStore";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
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

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.onboarding, { width, height }]}>
        <LottieView
          autoPlay
          loop
          source={item.lottie}
          style={[styles.image, { width: width * 0.8, height: height * 0.4 }]}
        />
        <Spacer direction="vertical" size={height * 0.15} />
        <View style={{ paddingLeft: width * 0.05 }}>
          <BoldText size="xlarge" color="primary">
            {item.title}
          </BoldText>
          <View style={[styles.desc, { width: width * 0.8 }]}>
            <RegularText size="medium" color="secondaryColor">
              {item.description}
            </RegularText>
          </View>
        </View>
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
    </SafeAreaView>
  );
};

export default OnboardingScreen;
