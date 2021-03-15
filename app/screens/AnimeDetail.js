import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import * as Animatable from "react-native-animatable";

// utils
import { COLORS } from "../assets/style/colors";
import { AntDesign } from "@expo/vector-icons";
import { ITEM_HEIGHT, width, height } from "./HomeAnimeScreen";

const TOP_HEADER_HEIGHT = height * 0.25;
const DURATION = 300; // initially: 400

function HomeAnimeDetailScreen({ navigation, route }) {
  const { item } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AntDesign
        name="arrowleft"
        //name="close"
        size={28}
        style={{
          padding: 12,
          position: "absolute",
          top: 5,
          left: 5,
          zIndex: 2,
        }}
        color="#333"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <SharedElement
        id={`item.${item.id}.bg`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <ImageBackground
          source={{ uri: item.bannerImage }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: 0.6,
              backgroundColor: item.coverImage.color,
              height: TOP_HEADER_HEIGHT + 32,
              resizeMode: "cover",
            },
          ]}
        />
      </SharedElement>
      <SharedElement id={`item.${item.id}.title`}>
        <Text style={styles.title}>{item.title.english}</Text>
      </SharedElement>
      <SharedElement id={`item.${item.id}.image`} style={styles.image}>
        <Image style={styles.image} source={{ uri: item.coverImage.large }} />
      </SharedElement>
      <SharedElement id="general.bg">
        <View style={styles.bg}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 200,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Animatable.View
                animation="bounceIn"
                delay={DURATION + 1 * 100}
                style={styles.icons}
              >
                <AntDesign
                  name="arrowdown"
                  size={22}
                  color={COLORS.secondary_text}
                />
              </Animatable.View>

              <Animatable.View
                animation="bounceIn"
                delay={DURATION + 2 * 100}
                style={styles.icons}
              >
                <AntDesign
                  name="arrowdown"
                  size={22}
                  color={COLORS.secondary_text}
                />
              </Animatable.View>

              <Animatable.View
                animation="bounceIn"
                delay={DURATION + 3 * 100}
                style={styles.icons}
              >
                <AntDesign
                  name="arrowdown"
                  size={22}
                  color={COLORS.secondary_text}
                />
              </Animatable.View>
            </View>
            <Animatable.View
              animation="fadeInUp"
              delay={DURATION * 2 + 1 * 200}
              style={styles.section}
            >
              <Text style={styles.sectionTitle}>Resume</Text>
              <Text style={styles.sectionText}>{item.description}</Text>
            </Animatable.View>
          </ScrollView>
        </View>
      </SharedElement>
    </SafeAreaView>
  );
}

export default HomeAnimeDetailScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 20,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - 10 * 3,
    left: 24,
  },
  image: {
    zIndex: 2,
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.7 - 12,
    right: 0,
    borderRadius: 3,
  },
  bg: {
    position: "absolute",
    width,
    height,
    backgroundColor: COLORS.secondary_dark,
    transform: [{ translateY: TOP_HEADER_HEIGHT }],
    borderRadius: 32,
    padding: 12,
    paddingTop: 32 + 12, // + SPACING A LA PLACE DE 12
  },
  icons: {
    backgroundColor: COLORS.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  section: {
    padding: 12,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    margin: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.primary,
  },
  sectionText: {
    fontWeight: "700",
    fontSize: 13,
    color: COLORS.secondary_text,
  },
});

/*HomeAnimeDetailScreen.SharedElements = (route) => {
  const { item } = route.params;

  return [
    {
      title: `item.${item.id}.bg`,
    },
    {
      title: `item.${item.id}.title`,
    },
    {
      image: `item.${item.id}.image`,
    },
    {
      bg: `general.bg`,
    },
  ];
};*/
