import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constant/color";
import { BoldText, RegularText } from "./common/text";
import CustomTextInput from "./common/textInput";

const { width, height } = Dimensions.get("window");

interface SearchFilterBarProps {
  onSearch?: (text: string) => void;
  onFilterApply?: (filters: Record<string, any>) => void;
  placeholder?: string;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  onSearch,
  onFilterApply,
  placeholder = "Search services, items...",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(height))[0];

  const openFilter = () => {
    setFilterVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeFilter = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setFilterVisible(false));
  };

  const handleApply = () => {
    onFilterApply?.({ 
      category: selectedCategory, 
      rating: selectedRating,
      sort: selectedSort 
    });
    closeFilter();
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedRating(null);
    setSelectedSort(null);
  };

  const categories = [
    { id: 'cleaning', name: 'Cleaning', icon: 'broom', color: '#3498DB' },
    { id: 'plumbing', name: 'Plumbing', icon: 'water', color: '#1ABC9C' },
    { id: 'electrical', name: 'Electrical', icon: 'flash', color: '#F39C12' },
    { id: 'carpentry', name: 'Carpentry', icon: 'hammer', color: '#9B59B6' },
    { id: 'painting', name: 'Painting', icon: 'color-palette', color: '#E74C3C' },
    { id: 'gardening', name: 'Gardening', icon: 'leaf', color: '#27AE60' },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular', icon: 'trending-up' },
    { id: 'rating', name: 'Highest Rated', icon: 'star' },
    { id: 'price-low', name: 'Price: Low to High', icon: 'arrow-up' },
    { id: 'price-high', name: 'Price: High to Low', icon: 'arrow-down' },
  ];

  return (
    <>
      {/* Enhanced search bar with premium design */}
      <View style={styles.searchContainer}>
        {/* Floating decorative elements */}
        <View style={styles.floatingDecor1} />
        <View style={styles.floatingDecor2} />
        <View style={styles.floatingDecor3} />
        
        <LinearGradient
          colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,1)']}
          style={styles.searchCard}
        >
          <View style={styles.searchWrapper}>
            {/* Search input */}
            <CustomTextInput
              placeholder={placeholder}
              value={searchValue}
              onChangeText={(text) => {
                setSearchValue(text);
                onSearch?.(text);
              }}
              style={styles.searchInput}
              placeholderTextColor="#A0A0A0"
              containerStyle={{ width: "80%"}}
            />

            {/* Clear button with animation */}
            {searchValue.length > 0 && (
              <TouchableOpacity 
                onPress={() => setSearchValue("")}
                style={styles.clearBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="close-circle" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            )}

            {/* Vertical divider */}
            <View style={styles.verticalDivider} />

            {/* Filter button with badge */}
            <TouchableOpacity
              onPress={openFilter}
              activeOpacity={0.7}
              style={styles.filterBtnWrapper}
            >
              <LinearGradient
                colors={[COLORS.primary, '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.filterBtn}
              >
                <Ionicons name="options" size={20} color={COLORS.white} />
                {/* Active filter count badge */}
                <View style={styles.filterCountBadge}>
                  <View style={styles.filterCountDot} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Enhanced Filter Modal with modern design */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="none"
        statusBarTranslucent
      >
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            onPress={closeFilter}
            activeOpacity={1}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Modal decorative background */}
          <View style={styles.modalDecorPattern}>
            <View style={[styles.modalDecorCircle, styles.decorCircle1]} />
            <View style={[styles.modalDecorCircle, styles.decorCircle2]} />
          </View>

          {/* Modal handle */}
          <View style={styles.modalHandleContainer}>
            <View style={styles.modalHandle} />
          </View>
          
          {/* Modal header with gradient */}
          <LinearGradient
            colors={['rgba(124, 82, 255, 0.05)', 'transparent']}
            style={styles.modalHeader}
          >
            <View style={styles.modalTitleContainer}>
              <View style={styles.modalIconWrapper}>
                <LinearGradient
                  colors={[COLORS.primary, '#8B5CF6']}
                  style={styles.modalIconBg}
                >
                  <Ionicons name="funnel" size={18} color={COLORS.white} />
                </LinearGradient>
              </View>
              <View>
                <BoldText size={20} color={COLORS.textDark}>
                  Advanced Filters
                </BoldText>
                <RegularText size={11} color={COLORS.gray} style={{ marginTop: 2 }}>
                  Refine your search results
                </RegularText>
              </View>
            </View>
            <TouchableOpacity onPress={closeFilter} style={styles.closeBtn}>
              <View style={styles.closeBtnBg}>
                <Ionicons name="close" size={20} color={COLORS.textDark} />
              </View>
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Category Filter with grid */}
            <View style={styles.filterSection}>
              <View style={styles.filterSectionHeader}>
                <View style={styles.filterIconCircle}>
                  <MaterialIcons name="category" size={16} color={COLORS.primary} />
                </View>
                <BoldText size={16} color={COLORS.textDark}>
                  Category
                </BoldText>
              </View>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      selectedCategory === cat.id && styles.categoryChipSelected,
                    ]}
                    onPress={() => setSelectedCategory(cat.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.categoryChipIcon,
                      { backgroundColor: selectedCategory === cat.id ? cat.color : `${cat.color}20` }
                    ]}>
                      <Ionicons 
                        name={cat.icon as any} 
                        size={16} 
                        color={selectedCategory === cat.id ? COLORS.white : cat.color} 
                      />
                    </View>
                    <RegularText 
                      size={12} 
                      color={selectedCategory === cat.id ? COLORS.white : COLORS.textDark}
                    >
                      {cat.name}
                    </RegularText>
                    {selectedCategory === cat.id && (
                      <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sort by options */}
            <View style={styles.filterSection}>
              <View style={styles.filterSectionHeader}>
                <View style={styles.filterIconCircle}>
                  <Ionicons name="swap-vertical" size={16} color={COLORS.primary} />
                </View>
                <BoldText size={16} color={COLORS.textDark}>
                  Sort By
                </BoldText>
              </View>
              <View style={styles.sortOptionsContainer}>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.sortOption,
                      selectedSort === option.id && styles.sortOptionSelected,
                    ]}
                    onPress={() => setSelectedSort(option.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.sortOptionLeft}>
                      <View style={[
                        styles.sortRadio,
                        selectedSort === option.id && styles.sortRadioSelected,
                      ]}>
                        {selectedSort === option.id && <View style={styles.sortRadioDot} />}
                      </View>
                      <Ionicons 
                        name={option.icon as any} 
                        size={18} 
                        color={selectedSort === option.id ? COLORS.primary : COLORS.gray} 
                      />
                      <RegularText 
                        size={14} 
                        color={selectedSort === option.id ? COLORS.textDark : COLORS.gray}
                      >
                        {option.name}
                      </RegularText>
                    </View>
                    {selectedSort === option.id && (
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range with slider effect */}
            <View style={styles.filterSection}>
              <View style={styles.filterSectionHeader}>
                <View style={styles.filterIconCircle}>
                  <Ionicons name="cash-outline" size={16} color={COLORS.primary} />
                </View>
                <BoldText size={16} color={COLORS.textDark}>
                  Price Range
                </BoldText>
              </View>
              <View style={styles.priceInputsRow}>
                <View style={styles.priceInputWrapper}>
                  <RegularText size={12} color={COLORS.gray} style={{ marginBottom: 6 }}>
                    Minimum
                  </RegularText>
                  <CustomTextInput 
                    placeholder="$0" 
                    style={styles.priceInput}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.priceRangeDivider}>
                  <Ionicons name="arrow-forward" size={16} color={COLORS.gray} />
                </View>
                <View style={styles.priceInputWrapper}>
                  <RegularText size={12} color={COLORS.gray} style={{ marginBottom: 6 }}>
                    Maximum
                  </RegularText>
                  <CustomTextInput 
                    placeholder="$1000" 
                    style={styles.priceInput}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {/* Rating Filter with stars */}
            <View style={styles.filterSection}>
              <View style={styles.filterSectionHeader}>
                <View style={styles.filterIconCircle}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                </View>
                <BoldText size={16} color={COLORS.textDark}>
                  Minimum Rating
                </BoldText>
              </View>
              <View style={styles.ratingContainer}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <TouchableOpacity 
                    key={rating} 
                    style={[
                      styles.ratingBtn,
                      selectedRating === rating && styles.ratingBtnSelected,
                    ]}
                    onPress={() => setSelectedRating(rating)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.ratingStars}>
                      {[...Array(rating)].map((_, i) => (
                        <Ionicons 
                          key={i} 
                          name="star" 
                          size={14} 
                          color={selectedRating === rating ? "#FFD700" : "#FFD700"} 
                        />
                      ))}
                    </View>
                    <RegularText 
                      size={13} 
                      color={selectedRating === rating ? COLORS.textDark : COLORS.gray}
                      style={{ fontWeight: selectedRating === rating ? '600' : '400' }}
                    >
                      & up
                    </RegularText>
                    {selectedRating === rating && (
                      <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Additional filters */}
            <View style={styles.filterSection}>
              <View style={styles.filterSectionHeader}>
                <View style={styles.filterIconCircle}>
                  <FontAwesome5 name="sliders-h" size={14} color={COLORS.primary} />
                </View>
                <BoldText size={16} color={COLORS.textDark}>
                  Additional Options
                </BoldText>
              </View>
              <View style={styles.additionalOptions}>
                <TouchableOpacity style={styles.toggleOption} activeOpacity={0.7}>
                  <View style={styles.toggleLeft}>
                    <Ionicons name="shield-checkmark" size={18} color="#27AE60" />
                    <RegularText size={14} color={COLORS.textDark}>
                      Verified Only
                    </RegularText>
                  </View>
                  <View style={styles.toggleSwitch}>
                    <View style={styles.toggleSwitchInner} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleOption} activeOpacity={0.7}>
                  <View style={styles.toggleLeft}>
                    <Ionicons name="flash" size={18} color="#F39C12" />
                    <RegularText size={14} color={COLORS.textDark}>
                      Instant Booking
                    </RegularText>
                  </View>
                  <View style={styles.toggleSwitch}>
                    <View style={styles.toggleSwitchInner} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Action buttons with enhanced design */}
          <LinearGradient
            colors={['transparent', 'rgba(248, 249, 253, 0.9)']}
            style={styles.actionContainer}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.resetBtn}
              onPress={handleReset}
            >
              <Ionicons name="refresh" size={18} color={COLORS.primary} />
              <RegularText color={COLORS.primary} size={14} style={{ marginLeft: 6, fontWeight: '600' }}>
                Reset All
              </RegularText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleApply}
              style={styles.applyBtnWrapper}
            >
              <LinearGradient
                colors={[COLORS.primary, '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.applyBtn}
              >
                <BoldText color={COLORS.white} size={15}>
                  Apply Filters
                </BoldText>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </Modal>
    </>
  );
};

export default SearchFilterBar;

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 16,
    // marginTop: -15,
    position: 'relative',
    zIndex: 10,
  },
  floatingDecor1: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(124, 82, 255, 0.05)',
    top: -10,
    right: 20,
    zIndex: 0,
  },
  floatingDecor2: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(139, 92, 246, 0.06)',
    bottom: -15,
    left: 40,
    zIndex: 0,
  },
  floatingDecor3: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'rgba(124, 82, 255, 0.04)',
    top: 15,
    left: 15,
    zIndex: 0,
  },
  searchCard: {
    // borderRadius: 20,
    // padding: 4,
    // elevation: 6,
    // shadowColor: COLORS.primary,
    // shadowOpacity: 0.15,
    // shadowRadius: 12,
    // shadowOffset: { width: 0, height: 6 },
    // borderWidth: 1,
    // borderColor: 'rgba(124, 82, 255, 0.12)',
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIconWrapper: {
    // marginTop: -8,
  },
  searchIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: 15,
    padding: 0,
    margin: 0,
    color: COLORS.textDark,
    height: 40,
  },
  clearBtn: {
    padding: 4,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E8E8E8',
    marginHorizontal: 12,
  },
  filterBtnWrapper: {
    borderRadius: 14,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterCountBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  filterCountDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4757',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  quickFiltersRow: {
    marginTop: 12,
  },
  quickFiltersContent: {
    paddingVertical: 4,
    gap: 8,
  },
  quickFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginRight: 8,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width,
    maxHeight: height * 0.9,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    elevation: 24,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -8 },
    overflow: 'hidden',
  },
  modalDecorPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  modalDecorCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(124, 82, 255, 0.03)',
  },
  decorCircle1: {
    width: 120,
    height: 120,
    top: -40,
    right: -20,
  },
  decorCircle2: {
    width: 80,
    height: 80,
    top: 80,
    left: -30,
  },
  modalHandleContainer: {
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D0D0D0',
    borderRadius: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalIconWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  modalIconBg: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    padding: 4,
  },
  closeBtnBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  filterSection: {
    marginBottom: 28,
  },
  filterSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  filterIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(124, 82, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    gap: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  categoryChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortOptionsContainer: {
    gap: 10,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FD',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  sortOptionSelected: {
    backgroundColor: 'rgba(124, 82, 255, 0.08)',
    borderColor: COLORS.primary,
  },
  sortOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sortRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortRadioSelected: {
    borderColor: COLORS.primary,
  },
  sortRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  priceInputsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  priceInputWrapper: {
    flex: 1,
  },
  priceInput: {
    backgroundColor: '#F8F9FD',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  priceRangeDivider: {
    paddingBottom: 12,
  },
  ratingContainer: {
    gap: 10,
  },
  ratingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    gap: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  ratingBtnSelected: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderColor: '#FFD700',
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  additionalOptions: {
    gap: 12,
  },
  toggleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FD',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleSwitch: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    padding: 3,
    justifyContent: 'center',
  },
  toggleSwitchInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(124, 82, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  applyBtnWrapper: {
    flex: 1,
    borderRadius: 16,
    elevation: 6,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
});