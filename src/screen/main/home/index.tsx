import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../../component/header';
import SearchFilterBar from '../../../component/searchBar';
import CategoryList from '../../../component/category';
import ServiceCard from '../../../component/service';
import { COLORS } from '../../../constant/color';
import { BoldText, RegularText } from '../../../component/common/text';

const Home = () => {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Header
          userName="Olamide"
          subtitle="Good morning ☀️"
          avatarUri="https://i.pravatar.cc/150"
          onAvatarPress={() => console.log("Profile tapped")}
          onNotificationPress={() => console.log("Notifications opened")}
        />
        
        {/* Animated background decorations */}
        <View style={styles.backgroundDecor}>
          <View style={[styles.decorCircle, styles.circle1]} />
          <View style={[styles.decorCircle, styles.circle2]} />
          <View style={[styles.decorCircle, styles.circle3]} />
          
          {/* Floating geometric shapes */}
          <View style={[styles.geometricShape, styles.geo1]} />
          <View style={[styles.geometricShape, styles.geo2]} />
          
          {/* Decorative dots scattered */}
          {[...Array(12)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.floatingDot,
                {
                  top: 120 + (i * 50),
                  left: 30 + (i * 30) % 300,
                  width: 3 + (i % 3),
                  height: 3 + (i % 3),
                  opacity: 0.08 - (i * 0.003),
                },
              ]}
            />
          ))}
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Search section with enhanced spacing */}
          <View style={styles.searchSection}>
            <SearchFilterBar />
          </View>

          {/* Categories Section */}
          <CategoryList />

          {/* Featured Banner */}
          <View style={styles.featuredBanner}>
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bannerGradient}
            >
              {/* Decorative elements */}
              <View style={styles.bannerDecor1} />
              <View style={styles.bannerDecor2} />
              <Ionicons 
                name="star" 
                size={40} 
                color="rgba(255,255,255,0.15)" 
                style={styles.bannerIcon}
              />

              <View style={styles.bannerContent}>
                <View style={styles.bannerBadge}>
                  <Ionicons name="trophy" size={12} color="#FFD700" />
                  <RegularText size={'sm'} color={COLORS.white} style={{ marginLeft: 4 }}>
                    PREMIUM
                  </RegularText>
                </View>
                <BoldText size={'xs'} color={COLORS.white} style={{ marginTop: 8 }}>
                  Get 20% Off
                </BoldText>
                <RegularText size={'xs'} color="rgba(255,255,255,0.9)" style={{ marginTop: 4 }}>
                  First booking with top providers
                </RegularText>
                <TouchableOpacity style={styles.bannerBtn} activeOpacity={0.8}>
                  <RegularText size={'xs'} color="#667EEA" style={{ fontWeight: '600' }}>
                    Claim Now
                  </RegularText>
                  <Ionicons name="arrow-forward" size={14} color="#667EEA" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
  
          {/* Top Providers Section Header */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionIconBox}>
                <LinearGradient
                  colors={[COLORS.primary, '#8B5CF6']}
                  style={styles.sectionIconGradient}
                >
                  <Ionicons name="people" size={16} color={COLORS.white} />
                </LinearGradient>
              </View>
              <View>
                <BoldText size={18} color={COLORS.textDark}>
                  Top Providers
                </BoldText>
                <View style={styles.accentLine} />
              </View>
            </View>
            <TouchableOpacity style={styles.filterChip} activeOpacity={0.7}>
              <Ionicons name="funnel" size={14} color={COLORS.primary} />
              <RegularText size={11} color={COLORS.primary} style={{ marginLeft: 4 }}>
                Filter
              </RegularText>
            </TouchableOpacity>
          </View>

          {/* Service Cards Grid */}
          <ServiceCard />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  safeArea: {
    flex: 1,
  },
  backgroundDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    opacity: 0.025,
  },
  circle1: {
    width: 250,
    height: 250,
    top: 150,
    right: -80,
  },
  circle2: {
    width: 180,
    height: 180,
    top: 400,
    left: -60,
  },
  circle3: {
    width: 120,
    height: 120,
    top: 650,
    right: 40,
  },
  geometricShape: {
    position: 'absolute',
    backgroundColor: 'rgba(124, 82, 255, 0.04)',
    borderRadius: 12,
  },
  geo1: {
    width: 100,
    height: 100,
    top: 200,
    left: 30,
    transform: [{ rotate: '25deg' }],
  },
  geo2: {
    width: 70,
    height: 70,
    top: 500,
    right: 50,
    transform: [{ rotate: '-15deg' }],
  },
  floatingDot: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchSection: {
    marginTop: 8,
    marginBottom: 20,
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  quickActionsCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.1)',
  },
  quickActionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionsIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionBtn: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredBanner: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#667EEA',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  bannerGradient: {
    padding: 20,
    position: 'relative',
    minHeight: 140,
  },
  bannerDecor1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -30,
    right: -20,
  },
  bannerDecor2: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -10,
    left: 40,
  },
  bannerIcon: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    transform: [{ rotate: '-15deg' }],
  },
  bannerContent: {
    zIndex: 1,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionIconBox: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionIconGradient: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentLine: {
    width: 50,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginTop: 4,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 82, 255, 0.08)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 82, 255, 0.15)',
  },
});