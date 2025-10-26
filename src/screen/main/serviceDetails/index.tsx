import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BoldText, RegularText } from "../../../component/common/text";
import { COLORS } from "../../../constant/color";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BookingModal from "../../../component/bookingModal";
import { ServiceDetailsScreenProps } from "../../../type/type";
import { styles } from "./style";

const { width } = Dimensions.get("window");

const ServiceDetails: React.FC<ServiceDetailsScreenProps> = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get service from route params
  const service = route.params.service;

  const handleBookingConfirm = (bookingData: any) => {
    const msg = `✅ Booking confirmed for ${service.name} on ${bookingData.date} for ${bookingData.hours} hour(s).`;

    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      Alert.alert("Booking Confirmed", msg);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: service.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          />

          {/* Header Actions */}
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.backBtn} 
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={22} color={COLORS.white} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
                <Ionicons name="share-social" size={20} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.favoriteBtn} 
                activeOpacity={0.8}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={20} 
                  color={isFavorite ? "#FF4757" : COLORS.white} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Provider Info Overlay */}
          <View style={styles.providerOverlay}>
            <View style={styles.providerInfo}>
              <BoldText size={"md"} color="white">
                {service.name}
              </BoldText>
              <View style={styles.providerMeta}>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={15} color="#FFD700" />
                  <BoldText size={"sm"} color="white" style={{ marginLeft: 4 }}>
                    {service.rating}
                  </BoldText>
                </View>
                <View style={styles.metaDivider} />
                <RegularText size={"sm"} color="white">
                  {service.experienceYears} years exp
                </RegularText>
                <View style={styles.metaDivider} />
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={15} color="#2ECC71" />
                  <RegularText size={"sm"} color="white" style={{ marginLeft: 3 }}>
                    Verified
                  </RegularText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Quick Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                style={styles.statGradient}
              >
                <Ionicons name="cash" size={24} color={COLORS.white} />
                <BoldText size={"md"} color="white" style={{ marginTop: 6 }}>
                  ${service.pricePerHour}
                </BoldText>
                <RegularText size={"xs"} color="white">
                  per hour
                </RegularText>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#F093FB', '#F5576C']}
                style={styles.statGradient}
              >
                <Ionicons name="briefcase" size={24} color={COLORS.white} />
                <BoldText size={"md"} color="white" style={{ marginTop: 6 }}>
                  {service.experienceYears}
                </BoldText>
                <RegularText size={"sm"} color="white">
                  years exp
                </RegularText>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#4FACFE', '#00F2FE']}
                style={styles.statGradient}
              >
                <Ionicons name="star" size={24} color={COLORS.white} />
                <BoldText size={"md"} color="white" style={{ marginTop: 6 }}>
                  {service.rating}
                </BoldText>
                <RegularText size={"sm"} color="white">
                  rating
                </RegularText>
              </LinearGradient>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBox}>
                <Ionicons name="information-circle" size={20} color={COLORS.primary} />
              </View>
              <BoldText size={"md"} color="black">
                About
              </BoldText>
            </View>
            <View style={styles.descriptionCard}>
              <RegularText size={"sm"} color="black" style={{ lineHeight: 22 }}>
                {service.description}
              </RegularText>
            </View>
          </View>

          {/* Services Offered */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBox}>
                <MaterialIcons name="build" size={20} color={COLORS.primary} />
              </View>
              <BoldText size={"md"} color="black">
                Services Offered
              </BoldText>
            </View>
            <View style={styles.servicesGrid}>
              {['Pipe Repairs', 'Leak Detection', 'Installation', 'Maintenance'].map((item, index) => (
                <View key={index} style={styles.serviceChip}>
                  <Ionicons name="checkmark-circle" size={16} color="#2ECC71" />
                  <RegularText size={"sm"} color="black" style={{ marginLeft: 6 }}>
                    {item}
                  </RegularText>
                </View>
              ))}
            </View>
          </View>

          {/* Gallery Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBox}>
                <Ionicons name="images" size={20} color={COLORS.primary} />
              </View>
              <BoldText size={"md"} color="black">
                Gallery
              </BoldText>
              <RegularText size={"sm"} color="secondary" style={{ marginLeft: 8 }}>
                ({service.gallery.length} photos)
              </RegularText>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryScroll}
            >
              {service.gallery.map((img, index) => (
                <TouchableOpacity key={index} style={styles.galleryItem} activeOpacity={0.8}>
                  <Image source={{ uri: img }} style={styles.galleryImage} />
                  <View style={styles.galleryOverlay}>
                    <Ionicons name="expand" size={20} color={COLORS.white} />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBox}>
                <Ionicons name="chatbubbles" size={20} color={COLORS.primary} />
              </View>
              <BoldText size="md" color="black">
                Reviews
              </BoldText>
              <RegularText size="sm" color="secondary" style={{ marginLeft: 8 }}>
                (156)
              </RegularText>
            </View>
            
            <TouchableOpacity style={styles.reviewsPreview} activeOpacity={0.8}>
              <View style={styles.reviewsPreviewContent}>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={16} color="#FFD700" />
                  ))}
                </View>
                <RegularText size={"sm"} color="black" style={{ marginTop: 8 }}>
                  "Excellent service! Very professional and punctual..."
                </RegularText>
                <RegularText size={"sm"} color="secondary" style={{ marginTop: 6 }}>
                  - Sarah Johnson, 2 days ago
                </RegularText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View style={styles.bottomBar}>
        <LinearGradient
          colors={['rgba(255,255,255,0.98)', 'rgba(255,255,255,1)']}
          style={styles.bottomBarGradient}
        >
          <View style={styles.priceSection}>
            <RegularText size="sm" color="secondary">
              Starting from
            </RegularText>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <BoldText size={"lg"} color="brand">
                ${service.pricePerHour}
              </BoldText>
              <RegularText size="sm" color="secondary">
                /hr
              </RegularText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bookNowBtn}
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
          >
            <LinearGradient
              colors={[COLORS.primary, '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bookNowGradient}
            >
              <BoldText size={"md"} color="white">
                Book Now
              </BoldText>
              <Ionicons name="calendar" size={20} color={COLORS.white} style={{ marginLeft: 8 }} />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Booking Modal */}
      <BookingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        service={service}
        onConfirm={handleBookingConfirm}
      />
    </View>
  );
};

export default ServiceDetails;