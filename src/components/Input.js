import { StyleSheet, Text, TextInput, View } from "react-native";
import { forwardRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GRAY, PRIMARY } from "../color";

export const KeyboardTypes = {
  DEFAULT: "default",
  EMAIL: "email-address",
};

export const ReturnKeyTypes = {
  DONE: "done",
  NEXT: "next",
};

export const InputTypes = {
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",
};

const InputTypeProps = {
  EMAIL: {
    title: "EMAIL",
    placeholder: "your@email.com",
    keyboardType: "email-address",
    secureTextEntry: false,
    iconName: { active: "email", inactive: "email-outline" },
  },
  PASSWORD: {
    title: "PASSWORD",
    placeholder: "PASSWORD",
    keyboardType: "default",
    secureTextEntry: true,
    iconName: { active: "lock", inactive: "lock-outline" },
  },
};

const Input = forwardRef(({ inputType, styles, ...props }, ref) => {
  const {
    title,
    placeholder,
    keyboardType,
    secureTextEntry,
    iconName: { active, inactive },
  } = InputTypeProps[inputType];

  const { value } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Text
        style={[
          defaultStyles.title,
          { color: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK },
        ]}
      >
        {title}
      </Text>
      <View>
        <TextInput
          ref={ref}
          {...props}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            defaultStyles.input,
            {
              borderColor: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK,
              color: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK,
            },
            styles?.input,
          ]}
          textContentType="none"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={defaultStyles.icon}>
          <MaterialCommunityIcons
            name={isFocused ? active : inactive}
            size={24}
            color={value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK}
          />
        </View>
      </View>
    </View>
  );
});

Input.displayName = "Input";

const defaultStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    marginBottom: 4,
    fontWeight: "700",
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 10,
  },
  icon: {
    position: "absolute",
    left: 8,
    height: "100%",
    justifyContent: "center",
  },
});

export default Input;
