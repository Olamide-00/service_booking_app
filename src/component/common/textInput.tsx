import React, { memo, useState } from "react";
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { RegularText } from "./text";


// 🎨 Shared design tokens
const COLORS = {
  border: "#E0E0E0",
  focus: "#007AFF",
  placeholder: "#999999",
  text: "#1E1E1E",
  background: "#FFFFFF",
  error: "#E53935",
  disabled: "#F5F5F5",
} as const;

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  disabled?: boolean;

}

/**
 * 🚀 Reusable Input Component
 * Consistent, theme-aware, and accessible.
 */
const CustomTextInput: React.FC<AppInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  disabled = false,
  editable = true,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle, ]}>
      {label && (
        <RegularText
          color="secondary"
          size="sm"
          style={{ marginBottom: 6, fontWeight: "500" }}
        >
          {label}
        </RegularText>
      )}

      <RNTextInput
        {...props}
        editable={!disabled && editable}
        allowFontScaling={false}
        placeholderTextColor={COLORS.placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={StyleSheet.flatten([
          styles.input,
          {
            borderColor: error
              ? COLORS.error
              : isFocused
              ? COLORS.focus
              : COLORS.border,
            backgroundColor: disabled ? COLORS.disabled : COLORS.background,
            color: COLORS.text,
          },
          inputStyle,
        ])}
      />

      {error && (
        <RegularText color="error" size="sm" style={styles.errorText}>
          {error}
        </RegularText>
      )}
    </View>
  );
};

export default memo(CustomTextInput);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    marginTop: 4,
  },
});
