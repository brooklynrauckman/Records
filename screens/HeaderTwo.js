import * as React from "react";
import { Text, View, Dimensions } from "react-native";
import * as styles from "./styles";

const deviceWidth = `${Dimensions.get("window").width - 28}px`;

export default function HeaderTwo(props) {
  const { results } = props;

  console.log(results);

  return (
    <View style={styles.collectionTop(deviceWidth)}>
      <View style={styles.row}>
        <Text style={styles.myCollection}>Search</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.countButton}>{results.length}</Text>
        </View>
      </View>
    </View>
  );
}
