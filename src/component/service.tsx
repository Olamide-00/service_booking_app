import React from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constant/color";
import { RegularText, BoldText } from "./common/text";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import providersData from "../constant/db.json";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

interface Provider {
  id: number;
  name: string;
  categoryId: number;
  rating: number;
  pricePerHour: number;
  experienceYears: number;
  location: {
    lat: number;
    lng: number;
    city: string;
  };
  description: string;
  image: string;
  gallery: string[];
}

interface ServiceListProps {
  onSelectProvider?: (provider: Provider) => void;
}

const ServiceCard: React.FC<{ item: Provider; onPress?: () => void }> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      {/* Image container with gradient overlay */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageGradient}
        />
        
        {/* Experience badge */}
        <View style={styles.experienceBadge}>
          <MaterialIcons name="workspace-premium" size={11} color="#FFD700" />
          <RegularText size={9} color={COLORS.white} style={{ marginLeft: 2 }}>
            {item.experienceYears}y
          </RegularText>
        </View>

        {/* Verified badge */}
        <View style={styles.verifiedBadge}>
          <Ionicons name="checkmark-circle" size={15} color="#2ECC71" />
        </View>

        {/* Favorite button */}
        <TouchableOpacity style={styles.favoriteBtn} activeOpacity={0.7}>
          <Ionicons name="heart-outline" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Card content */}
      <View style={styles.cardBody}>
        <BoldText size={14} color={COLORS.textDark} numberOfLines={1}>
          {item.name}
        </BoldText>
        
        {/* Location row */}
        <View style={styles.locationRow}>
          <Ionicons name="location" size={11} color={COLORS.primary} />
          <RegularText size={11} color={COLORS.textLight} style={{ marginLeft: 2 }} numberOfLines={1}>
            {item.location.city}
          </RegularText>
        </View>

        {/* Rating and reviews */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <BoldText size={12} color={COLORS.textDark} style={{ marginLeft: 2 }}>
              {item.rating.toFixed(1)}
            </BoldText>
          </View>
          <View style={styles.divider} />
          <RegularText size={10} color={COLORS.gray}>
            156 reviews
          </RegularText>
        </View>

        {/* Price and booking button */}
        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <LinearGradient
              colors={[COLORS.primary, '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.priceGradient}
            >
              <BoldText size={13} color={COLORS.white}>
                ${item.pricePerHour}
              </BoldText>
              <RegularText size={9} color="rgba(255,255,255,0.85)">
                /hr
              </RegularText>
            </LinearGradient>
          </View>
          
          {/* Book button */}
          <TouchableOpacity style={styles.bookBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Decorative corner element */}
      <View style={styles.decorativeCorner} />
    </TouchableOpacity>
  );
};

const ServiceList: React.FC<ServiceListProps> = ({ onSelectProvider }) => {
  return (
    <FlatList
      data={providersData.providers}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.rowWrapper}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <ServiceCard
          item={item}
          onPress={() => onSelectProvider?.(item)}
        />
      )}
    />
  );
};

export default ServiceList;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  rowWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    width: CARD_WIDTH,
    overflow: "hidden",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.08)',
    position: 'relative',
  },
  imageContainer: {
    width: "100%",
    height: 130,
    position: 'relative',
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  experienceBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 3,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  favoriteBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    padding: 6,
  },
  cardBody: {
    paddingHorizontal: 11,
    paddingVertical: 11,
    paddingBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 7,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  divider: {
    width: 1,
    height: 11,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 7,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  priceContainer: {
    flex: 1,
  },
  priceGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 11,
    gap: 2,
  },
  bookBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(124, 82, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.2)',
  },
  decorativeCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 35,
    height: 35,
    backgroundColor: COLORS.primary,
    opacity: 0.05,
    borderBottomLeftRadius: 35,
  },
});