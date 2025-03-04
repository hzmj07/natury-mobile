import React, { useState } from "react";
import { TextInput } from "react-native";
import { useThemeColor } from '@/hooks/useThemeColor';


const CustomTextInput = ({ placeholder, secureTextEntry , onChange , value , type}) => {
  const [isFocused, setIsFocused] = useState(false);
  const backgroundColor = useThemeColor({ light: "white", dark: "#1E1E1E" });
  const color = useThemeColor({ light: "black", dark: "white" });

  return (
    <TextInput
    keyboardType={type}
    style={{backgroundColor , color, marginTop: 20 ,paddingLeft:15}}
    onChangeText={onChange}
    placeholderTextColor={color}
    value={value}
      className={`pl-8 text-2xl rounded-2xl border mt-10 ${
        isFocused ? "border-primre" : "border-gray-500"
      }`}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default CustomTextInput;
