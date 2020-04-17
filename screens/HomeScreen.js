import * as WebBrowser from "expo-web-browser";
import * as React from "react";
// import { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as styles from "./styles";

const deviceWidth = `${Dimensions.get("window").width / 2 - 20}px`;

export default function HomeScreen() {
  // const [toggle, updateToggle] = useState(false);

  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.albumResults}>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
        </View>
      </View>
    </ScrollView>
  );
}

// <View>
//   <Text
//     style={styles.record(toggle)}
//     onClick={() => updateToggle(!toggle)}
//   >
//     Brooklyn
//   </Text>
// </View>
