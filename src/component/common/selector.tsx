import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RegularText } from "../text/indext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MotiView } from "moti";
import Spacer from "./spacer";

const COLORS = {
  border: "#ccc",
  text: "#333",
  iconColor: "#666",
};

interface Option {
  label: string;
  value: string;
}

interface SelectorProps {
  label: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  testID?: string;
  loading?: boolean;
  showSearch?: boolean;
}

const Selector = ({
  label,
  options,
  selectedValue,
  onSelect,
  testID,
  loading = false,
  showSearch = false,
}: SelectorProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: Option) => {
    onSelect(option.value);
    setIsOpen(false);
    setSearchQuery("");
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container} testID={testID}>
      <RegularText size="small">{label}</RegularText>
      <Spacer size={hp(1)} />
      <TouchableOpacity
        style={styles.selectorContainer}
        onPress={toggleDropdown}
      >
        <RegularText size="small">
          {selectedOption ? selectedOption.label : `Select ${label}`}
        </RegularText>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={COLORS.iconColor}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {showSearch && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          )}
          {loading ? (
            [...Array(3)].map((_, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, type: "timing", duration: 700 }}
                style={styles.skeletonOption}
              />
            ))
          ) : (
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionSelect(item)}
                >
                  <RegularText size="medium">{item.label}</RegularText>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("90%"),
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    paddingHorizontal: wp("2%"),
    height: hp("6%"),
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    marginTop: hp("0.5%"),
    maxHeight: hp("35%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("1%"),
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    paddingHorizontal: wp("2%"),
    height: hp("5%"),
    marginBottom: hp("1%"),
  },
  option: {
    padding: wp("2%"),
    paddingVertical: hp("2%"),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  skeletonOption: {
    width: "100%",
    height: hp("5%"),
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: hp("1%"),
  },
});

export default Selector;




// import React, { useState } from "react";
// import {
//   StyleSheet,
//   TextInput,
//   View,
//   TouchableOpacity,
//   FlatList,
//   Modal,
// } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { RegularText, MediumText } from "../text/indext";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { MotiView } from "moti";
// import Spacer from "./spacer";
// import { COLORS } from "@/src/constant/COLORS";

// interface Option {
//   label: string;
//   value: string;
// }

// interface SelectorProps {
//   label: string;
//   options: Option[];
//   selectedValue: string;
//   onSelect: (value: string) => void;
//   testID?: string;
//   loading?: boolean;
//   showSearch?: boolean;
//   placeholder?: string;
// }

// const Selector = ({
//   label,
//   options,
//   selectedValue,
//   onSelect,
//   testID,
//   loading = false,
//   showSearch = false,
//   placeholder,
// }: SelectorProps): JSX.Element => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleOptionSelect = (option: Option) => {
//     onSelect(option.value);
//     setIsModalOpen(false);
//     setSearchQuery("");
//   };

//   const selectedOption = options.find(
//     (option) => option.value === selectedValue
//   );
  
//   const filteredOptions = options.filter((option) =>
//     option.label.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const renderSkeletonLoader = () => (
//     <View style={styles.skeletonContainer}>
//       {[...Array(5)].map((_, index) => (
//         <MotiView
//           key={index}
//           from={{ opacity: 0.3 }}
//           animate={{ opacity: 0.7 }}
//           transition={{ 
//             loop: true, 
//             type: "timing", 
//             duration: 1000,
//             delay: index * 100 
//           }}
//           style={styles.skeletonOption}
//         />
//       ))}
//     </View>
//   );

//   const renderOption = ({ item, index }) => (
//     <TouchableOpacity
//       style={[
//         styles.modalOption,
//         selectedValue === item.value && styles.selectedModalOption
//       ]}
//       onPress={() => handleOptionSelect(item)}
//       activeOpacity={0.7}
//     >
//       <View style={styles.optionContent}>
//         <RegularText 
//           size="medium" 
//           style={[
//             styles.optionText,
//             selectedValue === item.value && styles.selectedOptionText
//           ]}
//         >
//           {item.label}
//         </RegularText>
//         {selectedValue === item.value && (
//           <MaterialIcons 
//             name="check" 
//             size={20} 
//             color={COLORS.primary} 
//           />
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container} testID={testID}>
//       {/* Label */}
//       {label && (
//         <View style={styles.labelContainer}>
//           <MediumText size="medium" style={styles.label}>
//             {label}
//           </MediumText>
//         </View>
//       )}

//       {/* Selector Input */}
//       <TouchableOpacity
//         style={[
//           styles.selectorInput,
//           selectedValue && styles.selectorInputFilled
//         ]}
//         onPress={() => setIsModalOpen(true)}
//         activeOpacity={0.8}
//       >
//         <View style={styles.inputContent}>
//           {/* Icon */}
//           <MaterialIcons 
//             name="list" 
//             size={20} 
//             color={selectedValue ? COLORS.primary : "#9ca3af"} 
//             style={styles.inputIcon}
//           />
          
//           {/* Text */}
//           <View style={styles.textContainer}>
//             <RegularText 
//               size="medium"
//               style={[
//                 styles.inputText,
//                 selectedValue ? styles.inputTextFilled : styles.inputTextPlaceholder
//               ]}
//             >
//               {selectedOption ? selectedOption.label : (placeholder || `Select ${label}`)}
//             </RegularText>
//           </View>
          
//           {/* Dropdown Arrow */}
//           <MaterialIcons 
//             name="keyboard-arrow-down" 
//             size={24} 
//             color="#9ca3af" 
//           />
//         </View>
//       </TouchableOpacity>

//       {/* Modal */}
//       <Modal
//         visible={isModalOpen}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setIsModalOpen(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             {/* Modal Header */}
//             <View style={styles.modalHeader}>
//               <View style={styles.modalTitleContainer}>
//                 <MaterialIcons 
//                   name="list" 
//                   size={20} 
//                   color={COLORS.primary} 
//                 />
//                 <MediumText size="medium" style={styles.modalTitle}>
//                   {label || "Select Option"}
//                 </MediumText>
//               </View>
              
//               <TouchableOpacity
//                 onPress={() => setIsModalOpen(false)}
//                 style={styles.closeButton}
//               >
//                 <MaterialIcons name="close" size={24} color="#6b7280" />
//               </TouchableOpacity>
//             </View>

//             {/* Search Input */}
//             {showSearch && (
//               <View style={styles.searchContainer}>
//                 <MaterialIcons 
//                   name="search" 
//                   size={20} 
//                   color="#9ca3af" 
//                   style={styles.searchIcon}
//                 />
//                 <TextInput
//                   style={styles.searchInput}
//                   placeholder="Search options..."
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                   placeholderTextColor="#9ca3af"
//                 />
//               </View>
//             )}

//             {/* Options List */}
//             <View style={styles.optionsContainer}>
//               {loading ? (
//                 renderSkeletonLoader()
//               ) : (
//                 <FlatList
//                   data={filteredOptions}
//                   keyExtractor={(item) => item.value}
//                   showsVerticalScrollIndicator={false}
//                   renderItem={renderOption}
//                   contentContainerStyle={styles.optionsList}
//                 />
//               )}
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     marginVertical: hp("0.5%"),
//   },
//   labelContainer: {
//     marginBottom: hp("1%"),
//     marginLeft: wp("1%"),
//   },
//   label: {
//     color: '#374151',
//     fontWeight: '600',
//   },
//   selectorInput: {
//     backgroundColor: '#ffffff',
//     borderWidth: 1.5,
//     borderColor: '#e5e7eb',
//     borderRadius: 12,
//     paddingHorizontal: wp("4%"),
//     height: hp("6.5%"),
//   },
//   selectorInputFilled: {
//     borderColor: COLORS.primary,
//     backgroundColor: '#ffffff',
//   },
//   inputContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: '100%',
//   },
//   inputIcon: {
//     marginRight: wp("3%"),
//   },
//   textContainer: {
//     flex: 1,
//   },
//   inputText: {
//     fontWeight: '500',
//   },
//   inputTextFilled: {
//     color: '#374151',
//   },
//   inputTextPlaceholder: {
//     color: '#9ca3af',
//   },
  
//   // Modal styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     paddingHorizontal: wp("5%"),
//   },
//   modalContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 20,
//     maxHeight: hp("70%"),
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: wp("5%"),
//     paddingVertical: hp("2%"),
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3f4f6',
//   },
//   modalTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: wp("2%"),
//   },
//   modalTitle: {
//     color: '#1f2937',
//     fontWeight: '700',
//   },
//   closeButton: {
//     padding: wp("1%"),
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: wp("5%"),
//     marginVertical: hp("1.5%"),
//     backgroundColor: '#f9fafb',
//     borderRadius: 10,
//     paddingHorizontal: wp("3%"),
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },
//   searchIcon: {
//     marginRight: wp("2%"),
//   },
//   searchInput: {
//     flex: 1,
//     height: hp("5%"),
//     fontSize: 16,
//     color: '#374151',
//   },
//   optionsContainer: {
//     flex: 1,
//     paddingBottom: hp("2%"),
//   },
//   optionsList: {
//     paddingHorizontal: wp("3%"),
//   },
//   modalOption: {
//     paddingHorizontal: wp("4%"),
//     paddingVertical: hp("1.8%"),
//     marginVertical: hp("0.2%"),
//     borderRadius: 10,
//     backgroundColor: '#ffffff',
//   },
//   selectedModalOption: {
//     backgroundColor: 'rgba(102, 126, 234, 0.08)',
//     borderWidth: 1,
//     borderColor: 'rgba(102, 126, 234, 0.2)',
//   },
//   optionContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   optionText: {
//     color: '#374151',
//     flex: 1,
//   },
//   selectedOptionText: {
//     color: COLORS.primary,
//     fontWeight: '600',
//   },
  
//   // Skeleton loader
//   skeletonContainer: {
//     paddingHorizontal: wp("5%"),
//     paddingVertical: hp("2%"),
//   },
//   skeletonOption: {
//     width: "100%",
//     height: hp("5%"),
//     backgroundColor: "#f3f4f6",
//     borderRadius: 10,
//     marginBottom: hp("1%"),
//   },
// });