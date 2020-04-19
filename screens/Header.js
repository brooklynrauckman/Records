import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import * as styles from "./styles";
import { useFirebase } from "react-redux-firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const deviceWidth = `${Dimensions.get("window").width - 28}px`;

export default function Header() {
  const firebase = useFirebase();

  return (
    <View style={styles.collectionTop(deviceWidth)}>
      <View style={styles.rowLeft}>
        <Text style={styles.myCollection}>My Collection</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.countButton}>325</Text>
        </View>
        <Text style={styles.sort}>Sort</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            firebase.logout();
          }}
          component={TouchableOpacity}
          activeOpacity={0.8}
        >
          <Icon name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
