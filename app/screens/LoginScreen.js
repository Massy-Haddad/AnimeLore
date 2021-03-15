import React from "react";
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../assets/style/colors";

function LoginScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.secondary_dark,
          padding: 24,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text
          style={{
            color: COLORS.secondary_text,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          LOGIN
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default LoginScreen;
