import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Text, View, Dimensions } from "react-native";
import * as styles from "./styles";

const deviceWidth = `${Dimensions.get("window").width - 28}px`;

export default function Header() {
  return (
    <View style={styles.collectionTop(deviceWidth)}>
      <View style={styles.rowLeft}>
        <Text style={styles.myCollection}>My Collection</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.countButton}>325</Text>
        </View>
      </View>
      <View>
        <Text style={styles.sort}>Sort</Text>
      </View>
    </View>
  );
}
