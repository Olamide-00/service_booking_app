import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import Header from "@/src/component/common/header";
import { COLORS } from "@/src/constant/COLORS";

const Support = () => {
  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color={COLORS.primary} />
    </View>
  );

  return (
    <>
      <View>
        <Header showBackButton label="Custmer Service" height={12} />
      </View>
      <SafeAreaView style={styles.container}>
        <WebView
          source={{
            uri: "https://tawk.to/chat/680384e1168d7c19107fce2a/1ip6ru7r1",
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={renderLoading}
          style={styles.webview}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Support;
