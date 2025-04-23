import {
  // Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import {
  BoldText,
  ExtraBoldText,
  MediumText,
  RegularText,
} from "@/src/component/text/indext";
import { Feather } from "@expo/vector-icons";
import Card from "@/src/component/common/card";
import Spacer from "@/src/component/common/spacer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Divider from "@/src/component/common/divider";
import CustomBtn from "@/src/component/common/customBtn";
import Item from "./component/item";
import { COLORS } from "@/src/constant/COLORS";
import { useNavigation } from "@react-navigation/native";
import Item2 from "./component/item2";
import UpdatePIN from "@/src/component/modals/updatePIN";
import UpdateNumber from "@/src/component/modals/updateNumber";
import useAuthStore from "@/src/store/userStore";
import Item3 from "./component/item3";
import {
  useDeleteAccount,
  useSetProfilePicture,
} from "@/src/api/hooks/useAuth";
import { Image } from "expo-image";
import DeleteModal from "@/src/component/modals/deleteAccount";

const Profile = () => {
  const navigation = useNavigation();
  const userData = useAuthStore((state) => state.userData);
  const updateUserData = useAuthStore((state) => state.setUserData);

  const [image, setImage] = useState(
    userData?.profilePicture || require("../../../../assets/images/image2.jpg")
  );
  const setProfilePicture = useSetProfilePicture();
  const cloudinary = "dsgvfker6";
  const presetName = "RemitApp";

  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage({ uri: imageUri });

      await uploadImageToCloudinary(imageUri);
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "profile.jpg",
    });
    data.append("upload_preset", presetName);
    data.append("cloud_name", cloudinary);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      if (result.secure_url) {
        console.log("Cloudinary Image URL:", result.secure_url);

        // Update Profile Picture on Server
        setProfilePicture.mutate(
          { email: userData?.email, profilePicture: result.secure_url },
          {
            onSuccess: () => {
              // Fetch updated user data
              updateUserData({
                ...userData,
                profilePicture: result.secure_url,
              });
            },
          }
        );
      } else {
        console.error("Cloudinary upload failed:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const [firstName, lastName] = userData?.name.split(" ") ?? ["", ""];
  const isBioEnable = useAuthStore((state) => state.isBioEnable);
  const setIsBioEnable = useAuthStore((state) => state.setIsBioEnable);
  const enableNotification = useAuthStore((state) => state.enableNotification);

  // delete account modal
  const [isOpen, setIsOpen] = useState(false);

  // delete account
  const {
    mutate,
    data,
    isPending: isDeleting,
    isError,
    error,
  } = useDeleteAccount();

  const handleDelete = () => {
    if (!userData?.email) return;

    mutate(userData.email, {
      onSuccess: (res) => {
        handleLogOut();
      },
      onError: (err) => {
        console.log("Error deleting account:", err);
      },
    });
  };

  const setEnableNotification = useAuthStore(
    (state) => state.setEnableNotification
  );

  const onUpdatePIN = () => {
    setIsVisible(true);
  };

  const onUpdateNumber = () => {
    setIsVisible2(true);
  };

  const logOut = useAuthStore((state) => state.logout);
  const handleLogOut = () => {
    logOut();
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <BoldText size="large">Profile</BoldText>
        <Spacer size={hp(3.5)} direction="vertical" />

        {/* Profile Section */}
        <View>
          <Card style={styles.card} borderOnly>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: userData?.profilePicture ?? image }}
                contentFit="cover"
                style={styles.image}
              />
              <TouchableOpacity
                style={styles.editIcon}
                onPress={handleSelectImage}
              >
                <Feather name="edit" size={20} />
              </TouchableOpacity>
              <View>
                <RegularText size="medium" color="gray">
                  {userData?.email}
                </RegularText>
              </View>
            </View>
          </Card>
          <Spacer size={hp(2)} direction="vertical" />
          <Card borderOnly>
            <BoldText size="large" color="primary">
              Personal Details
            </BoldText>
            <View style={styles.infoContainer}>
              <Item name="First Name" value={firstName} />
              <Item name="Last Name" value={lastName} />
              <Item name="Email Address" value={userData?.email} />
              <Item
                name="Phone Number"
                value={userData?.phoneNumber || "---"}
              />
            </View>
            <Divider />
            <BoldText size="large" color="primary">
              Account Menu
            </BoldText>
            <Item2 name="Forgot PIN" func={onUpdatePIN} />
            <Item2 name="Update Phone Number" func={onUpdateNumber} />
            <Divider />
            {/* <Item3
              name="Enable Biometric"
              value={isBioEnable}
              onToggle={setIsBioEnable}
            /> */}
            <Item3
              name="Push Notification"
              value={enableNotification}
              onToggle={setEnableNotification}
            />
            <Divider />
            <Pressable
              onPress={() =>
                navigation.navigate("StackNavigation", {
                  screen: "TermsAndPolicies",
                })
              }
            >
              <BoldText size="large" color="primary">
                Terms & Policies
              </BoldText>
              <MediumText size="medium">Terms of use</MediumText>
            </Pressable>
            <Divider />
            <View style={styles.btnContainer}>
              <CustomBtn label="Logout" width={wp(42)} onPress={handleLogOut} />
              <CustomBtn
                label="DELETE ACCOUNT"
                width={wp(42)}
                onPress={() => setIsOpen(true)}
                color={COLORS.secondaryColor}
              />
            </View>
          </Card>
        </View>
        <UpdatePIN
          isVisible={isVisible}
          closeModal={() => setIsVisible(false)}
        />
        <UpdateNumber
          isVisible={isVisible2}
          closeModal={() => setIsVisible2(false)}
        />
      </ScrollView>
      {
        <DeleteModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={handleDelete}
        />
      }
    </SafeAreaView>
  );
};

export default Profile;
