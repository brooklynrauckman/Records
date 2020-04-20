import * as React from "react";
import { Text, View, Dimensions } from "react-native";
import * as styles from "./styles";

const deviceWidth = `${Dimensions.get("window").width - 28}px`;

export default function HeaderThree() {
  return (
    <View style={styles.collectionTop(deviceWidth)}>
      <View style={styles.row}>
        <Text style={styles.myCollection}>Add an Album</Text>
      </View>
    </View>
  );
}
