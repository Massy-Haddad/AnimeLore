//import React from "react";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { COLORS } from "../assets/style/colors";
import * as Animatable from "react-native-animatable";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";

const windowHeight = Dimensions.get("window").height;
export const ITEM_HEIGHT = windowHeight * 0.26;
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

function HomeAnimeScreen({ navigation }) {
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    getAnimeData();
  }, []);

  const variables = {
    nextSeason: "SPRING",
    nextYear: 2021,
    season: "WINTER",
    seasonYear: 2021,
    type: "MANGA",
  };

  var query = `
    query {
        top: Page(page: 1, perPage: 50) {
            media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
                ...media
            }
        }
    }
    fragment media on Media {
        id
        title {
            userPreferred
            english
        }
        coverImage {
            extraLarge
            large
            color
        }
        startDate {
            year
            month
            day
        }
        endDate {
            year
            month
            day
        }
        bannerImage
        season
        description
        type
        format
        status(version: 2)
        episodes
        duration
        chapters
        volumes
        genres
        isAdult
        averageScore
        popularity
        mediaListEntry {
            id
            status
        }
    }
`;

  const url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  const getAnimeData = async () => {
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);
  };

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    setAnimeData(data.data.top.media);
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary_dark }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={animeData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AnimeDetail", { item, windowHeight });
              }}
              style={{ marginBottom: 12, height: ITEM_HEIGHT }}
            >
              <View style={{ flex: 1, padding: 12 }}>
                <SharedElement
                  id={`item.${item.id}.bg`}
                  style={[StyleSheet.absoluteFillObject]}
                >
                  <View
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        backgroundColor: COLORS.secondary,
                        borderRadius: 16,
                      },
                    ]}
                  />
                </SharedElement>
                <SharedElement id={`item.${item.id}.title`}>
                  <Text style={styles.title}>{item.title.english}</Text>
                </SharedElement>
                <Text style={styles.description} numberOfLines={6}>
                  {item.description}
                </Text>
                <SharedElement
                  id={`item.${item.id}.image`}
                  style={styles.image}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: item.coverImage.large }}
                  />
                </SharedElement>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <SharedElement id="general.bg">
        <View style={styles.bg}></View>
      </SharedElement>
    </SafeAreaView>
  );
}

export default HomeAnimeScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginRight: ITEM_HEIGHT / 2 + 35,
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    marginRight: ITEM_HEIGHT / 2 + 35,
  },
  bg: {
    position: "absolute",
    width,
    height,
    backgroundColor: "red",
    transform: [{ translateY: height }],
    borderRadius: 32,
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    top: 10,
    right: -5,
    borderRadius: 5,
  },
});
