import * as WebBrowser from "expo-web-browser";
import * as React from "react";
// import { useState } from "react";
import { Text, View, Dimensions, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as styles from "./styles";

const deviceWidth = `${Dimensions.get("window").width / 2 - 20}px`;

export default function Search() {
  // const [toggle, updateToggle] = useState(false);
  const [value, onChangeText] = React.useState("Neil Young");

  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchBar}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            clearTextOnFocus={true}
          />
          <View style={styles.closeIcon}>
            <Icon name="close" size={24} color="#999" />
          </View>
        </View>
        <View style={styles.albumResults}>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
          <View style={styles.smallPic(deviceWidth)}></View>
        </View>
      </View>
    </ScrollView>
  );
}
