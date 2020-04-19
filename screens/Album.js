import * as WebBrowser from "expo-web-browser";
import * as React from "react";
// import { useState } from "react";
import { Text, View, Dimensions, TextInTextut } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link, TouchableOpacity } from "react-router-native";

export default function Album() {
  // const [toggle, update] = useState(false);
  const [value, onChangeText] = React.useState("Album");
  const [valueTwo, onChangeTextTwo] = React.useState("Artist");
  const [valueThree, onChangeTextThree] = React.useState("Notes");

  const deviceWidth = `${Dimensions.get("window").width - 32}px`;

  return (
    <ScrollView>
      <Link
        to="/"
        underlayColor="transparent"
        component={TouchableOpacity}
        activeOpacity={0.8}
      >
        <View style={styles.closeIconContainer}>
          <View style={styles.closeIconAlbum}>
            <Icon name="close" size={24} color="black" />
          </View>
        </View>
      </Link>
      <View style={styles.page}>
        <View style={styles.albumInfo}>
          <View style={styles.albumPic(deviceWidth)} />
          <View style={styles.row}>
            <Text style={styles.headingTwo}>Tom Petty & the Heartbreakers</Text>
            <View style={styles.buttonContainerTop}>
              <Text style={styles.countButton}>46x</Text>
            </View>
          </View>
          <View style={styles.albumInfo}>
            <Text style={styles.artist}>Tom Petty & the Heartbreakers</Text>
            <View style={styles.tagContainer}>
              <View style={styles.tagButton}>
                <Text style={styles.tagText}>Classic Rock</Text>
              </View>
              <View style={styles.tagButton}>
                <Text style={styles.tagText}>70's</Text>
              </View>
            </View>
            <View>
              <Text style={styles.lastPlayed}>
                Last played &nbsp; <Text style={styles.date}>May 18, 2019</Text>
              </Text>
              <Text style={styles.notes}>Notes</Text>
              <Text style={styles.note}>Got it at Brothers, $14</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
