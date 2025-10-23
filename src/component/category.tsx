import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constant/color";
import { BoldText, RegularText } from "./common/text";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  gradientColors: string[];
  count: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Cleaning",
    icon: "broom",
    color: "#3498DB",
    gradientColors: ["#3498DB", "#5DADE2"],
    count: 124,
  },
  {
    id: 2,
    name: "Plumbing",
    icon: "water",
    color: "#1ABC9C",
    gradientColors: ["#1ABC9C", "#48C9B0"],
    count: 89,
  },
  {
    id: 3,
    name: "Electrical",
    icon: "flash",
    color: "#F39C12",
    gradientColors: ["#F39C12", "#F8C471"],
    count: 156,
  },
  {
    id: 4,
    name: "Carpentry",
    icon: "hammer",
    color: "#9B59B6",
    gradientColors: ["#9B59B6", "#BB8FCE"],
    count: 72,
  },
  {
    id: 5,
    name: "Painting",
    icon: "color-palette",
    color: "#E74C3C",
    gradientColors: ["#E74C3C", "#EC7063"],
    count: 98,
  },
  {
    id: 6,
    name: "Gardening",
    icon: "leaf",
    color: "#27AE60",
    gradientColors: ["#27AE60", "#52BE80"],
    count: 65,
  },
  {
    id: 7,
    name: "Moving",
    icon: "car",
    color: "#E67E22",
    gradientColors: ["#E67E22", "#EB984E"],
    count: 43,
  },
  {
    id: 8,
    name: "Pet Care",
    icon: "paw",
    color: "#16A085",
    gradientColors: ["#16A085", "#45B39D"],
    count: 56,
  },
];

interface CategoryListProps {
  onSelectCategory?: (category: Category) => void;
}

const CategoryItem: React.FC<{
  item: Category;
  isSelected: boolean;
  onPress: () => void;
}> = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.categoryWrapper}
    >
      <View style={[
        styles.categoryCard,
        isSelected && styles.categoryCardSelected,
      ]}>
        <LinearGradient
          colors={isSelected ? item.gradientColors : ['#FFFFFF', '#FFFFFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          {/* Decorative corner accent */}
          <View style={[
            styles.cornerAccent,
            { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : `${item.color}08` }
          ]} />

          {/* Icon container */}
          <View style={[
            styles.iconContainer,
            { 
              backgroundColor: isSelected 
                ? 'rgba(255,255,255,0.25)' 
                : `${item.color}15`,
            }
          ]}>
            <Ionicons
              name={item.icon as any}
              size={18}
              color={isSelected ? COLORS.white : item.color}
            />
          </View>

          {/* Category info */}
          <View style={styles.categoryInfo}>
            <BoldText
              size={"xs"}
              color={isSelected ? COLORS.white : COLORS.textDark}
              numberOfLines={1}
              style={styles.categoryName}
            >
              {item.name}
            </BoldText>
            
            {/* Count badge */}
            <View style={[
              styles.countBadge,
              { 
                backgroundColor: isSelected 
                  ? 'rgba(255,255,255,0.2)' 
                  : `${item.color}12`,
              }
            ]}>
              <RegularText
                size={"sm"}
                color={isSelected ? COLORS.white : item.color}
              >
                {item.count}
              </RegularText>
            </View>
          </View>

          {/* Selection indicator */}
          {isSelected && (
            <View style={styles.selectionIndicator}>
              <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
            </View>
          )}

          {/* Decorative dots */}
          <View style={styles.decorativeDots}>
            <View style={[styles.dot, { backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : `${item.color}20` }]} />
            <View style={[styles.dot, { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : `${item.color}15` }]} />
          </View>
        </LinearGradient>

        {/* Border for unselected state */}
        {!isSelected && (
          <View style={[styles.cardBorder, { borderColor: `${item.color}15` }]} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (category: Category) => {
    setSelectedId(category.id === selectedId ? null : category.id);
    onSelectCategory?.(category);
  };

  return (
    <View style={styles.container}>
      {/* Enhanced section header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconContainer}>
            <LinearGradient
              colors={[COLORS.primary, '#8B5CF6']}
              style={styles.headerIconGradient}
            >
              <Ionicons name="grid" size={14} color={COLORS.white} />
            </LinearGradient>
          </View>
          <View>
            <BoldText size={"md"} color={COLORS.textDark}>
              Categories
            </BoldText>
            <RegularText size={"sm"} color={COLORS.gray} style={{ marginTop: 1 }}>
              {categories.length} services available
            </RegularText>
          </View>
        </View>
        
        <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
          <RegularText size={"sm"} color={COLORS.primary} style={{ fontWeight: '600' }}>
            View All
          </RegularText>
          <Ionicons name="chevron-forward" size={13} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Category horizontal list */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            isSelected={item.id === selectedId}
            onPress={() => handleSelect(item)}
          />
        )}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerIconGradient: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(124, 82, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.15)',
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryWrapper: {
    marginRight: 2,
  },
  categoryCard: {
    width: 100,
    height: 78,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryCardSelected: {
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    transform: [{ scale: 1.03 }],
  },
  cardGradient: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  cornerAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 25,
    height: 25,
    borderBottomLeftRadius: 25,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  categoryInfo: {
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
  },
  categoryName: {
    textAlign: 'center',
    marginBottom: 3,
    paddingHorizontal: 2,
  },
  countBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 24,
    alignItems: 'center',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  decorativeDots: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    flexDirection: 'row',
    gap: 3,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  cardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    borderWidth: 1.5,
  },
});