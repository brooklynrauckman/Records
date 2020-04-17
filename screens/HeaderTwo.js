import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Text, View, Dimensions } from "react-native";
import * as styles from "./styles";

const deviceWidth = `${Dimensions.get("window").width - 28}px`;

export default function HeaderTwo() {
  return (
    <View style={styles.collectionTop(deviceWidth)}>
      <View style={styles.row}>
        <Text style={styles.myCollection}>Search</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.countButton}>3</Text>
        </View>
      </View>
    </View>
  );
}
