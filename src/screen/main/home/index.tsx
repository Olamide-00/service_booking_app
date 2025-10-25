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
import { styles } from './style';
import ServiceList from '../../../component/service';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Header
          userName="Olamide"
          subtitle="Good day ☀️"
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
                  <RegularText size={'sm'} color="white" style={{ marginLeft: 4 }}>
                    PREMIUM
                  </RegularText>
                </View>
                <BoldText size={'xs'} color="white" style={{ marginTop: 8 }}>
                  Get 20% Off
                </BoldText>
                <RegularText size={'xs'} color="white" style={{ marginTop: 4 }}>
                  First booking with top providers
                </RegularText>
                <TouchableOpacity style={styles.bannerBtn} activeOpacity={0.8}>
                  <RegularText size={'xs'} color="brand" style={{ fontWeight: '600' }}>
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
                <BoldText size={'sm'} color="black">
                  Top Providers
                </BoldText>
                <View style={styles.accentLine} />
              </View>
            </View>
          </View>

          {/* Service Cards Grid */}
          <ServiceList onSelectProvider={() => navigation.navigate("ServiceDetails")} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
