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
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { BoldText, RegularText } from "../../../component/common/text";
import { COLORS } from "../../../constant/color";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import BookingModal from "../../../component/bookingModal";

const { width, height } = Dimensions.get("window");

interface ServiceDetailsProps {
  route?: {
    params?: {
      service?: {
        id: number;
        name: string;
        rating: number;
        pricePerHour: number;
        experienceYears: number;
        description: string;
        image: string;
        location: { lat: number; lng: number; city: string };
        gallery: string[];
      };
    };
  };
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const service = route?.params?.service ?? {
    id: 1,
    name: "John Smith",
    rating: 4.7,
    pricePerHour: 35,
    experienceYears: 6,
    description:
      "Experienced plumber specializing in bathroom installations, pipe repairs, and leak detection. Quick and reliable service with 100% satisfaction guarantee.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    location: { lat: 6.524379, lng: 3.379206, city: "Lagos" },
    gallery: [
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
      "https://images.unsplash.com/photo-1581579186985-7a3f32e9daab",
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",
    ],
  };

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
            <TouchableOpacity style={styles.backBtn} activeOpacity={0.8}>
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
              <BoldText size={24} color={COLORS.white}>
                {service.name}
              </BoldText>
              <View style={styles.providerMeta}>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <BoldText size={13} color={COLORS.white} style={{ marginLeft: 4 }}>
                    {service.rating}
                  </BoldText>
                </View>
                <View style={styles.metaDivider} />
                <RegularText size={13} color="rgba(255,255,255,0.9)">
                  {service.experienceYears} years exp
                </RegularText>
                <View style={styles.metaDivider} />
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={14} color="#2ECC71" />
                  <RegularText size={12} color={COLORS.white} style={{ marginLeft: 3 }}>
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
                <BoldText size={18} color={COLORS.white} style={{ marginTop: 6 }}>
                  ${service.pricePerHour}
                </BoldText>
                <RegularText size={11} color="rgba(255,255,255,0.85)">
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
                <BoldText size={18} color={COLORS.white} style={{ marginTop: 6 }}>
                  {service.experienceYears}
                </BoldText>
                <RegularText size={11} color="rgba(255,255,255,0.85)">
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
                <BoldText size={18} color={COLORS.white} style={{ marginTop: 6 }}>
                  {service.rating}
                </BoldText>
                <RegularText size={11} color="rgba(255,255,255,0.85)">
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
              <BoldText size={18} color={COLORS.textDark}>
                About
              </BoldText>
            </View>
            <View style={styles.descriptionCard}>
              <RegularText size={14} color={COLORS.textLight} style={{ lineHeight: 22 }}>
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
              <BoldText size={18} color={COLORS.textDark}>
                Services Offered
              </BoldText>
            </View>
            <View style={styles.servicesGrid}>
              {['Pipe Repairs', 'Leak Detection', 'Installation', 'Maintenance'].map((item, index) => (
                <View key={index} style={styles.serviceChip}>
                  <Ionicons name="checkmark-circle" size={16} color="#2ECC71" />
                  <RegularText size={13} color={COLORS.textDark} style={{ marginLeft: 6 }}>
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
              <BoldText size={18} color={COLORS.textDark}>
                Gallery
              </BoldText>
              <RegularText size={12} color={COLORS.gray} style={{ marginLeft: 8 }}>
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

          {/* Location Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBox}>
                <Ionicons name="location" size={20} color={COLORS.primary} />
              </View>
              <BoldText size={18} color={COLORS.textDark}>
                Location
              </BoldText>
            </View>
            
            <View style={styles.locationCard}>
              <View style={styles.locationInfo}>
                <Ionicons name="navigate" size={18} color={COLORS.primary} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <BoldText size={14} color={COLORS.textDark}>
                    {service.location.city}
                  </BoldText>
                  <RegularText size={12} color={COLORS.gray}>
                    Tap map to view full directions
                  </RegularText>
                </View>
                <TouchableOpacity style={styles.directionsBtn} activeOpacity={0.7}>
                  <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: service.location.lat,
                    longitude: service.location.lng,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: service.location.lat,
                      longitude: service.location.lng,
                    }}
                    title={service.name}
                    description={service.location.city}
                  />
                </MapView>
              </View>
            </View>
          </View>

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBox}>
                <Ionicons name="chatbubbles" size={20} color={COLORS.primary} />
              </View>
              <BoldText size={18} color={COLORS.textDark}>
                Reviews
              </BoldText>
              <RegularText size={12} color={COLORS.gray} style={{ marginLeft: 8 }}>
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
                <RegularText size={13} color={COLORS.textLight} style={{ marginTop: 8 }}>
                  "Excellent service! Very professional and punctual..."
                </RegularText>
                <RegularText size={11} color={COLORS.gray} style={{ marginTop: 6 }}>
                  - Sarah Johnson, 2 days ago
                </RegularText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
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
            <RegularText size={12} color={COLORS.gray}>
              Starting from
            </RegularText>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <BoldText size={28} color={COLORS.primary}>
                ${service.pricePerHour}
              </BoldText>
              <RegularText size={14} color={COLORS.gray}>
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
              <BoldText size={16} color={COLORS.white}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  heroSection: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  headerActions: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  providerInfo: {
    marginBottom: 10,
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metaDivider: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 10,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46,204,113,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  contentContainer: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: -40,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(124, 82, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  descriptionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.08)',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46,204,113,0.2)',
  },
  galleryScroll: {
    paddingRight: 20,
  },
  galleryItem: {
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  galleryImage: {
    width: width * 0.6,
    height: 160,
    resizeMode: 'cover',
  },
  galleryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  locationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.08)',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  directionsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(124, 82, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    height: 200,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  reviewsPreview: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.08)',
  },
  reviewsPreviewContent: {
    flex: 1,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -5 },
  },
  bottomBarGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
  },
  priceSection: {
    flex: 1,
  },
  bookNowBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  bookNowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});

export default ServiceDetails;