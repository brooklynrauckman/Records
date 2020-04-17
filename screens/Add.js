import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Text, View, Dimensions, TextInput } from "react-native";
import { Link } from "react-router-native";
import { ScrollView } from "react-native-gesture-handler";
import * as styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Add() {
  // const [toggle, updateToggle] = React.useState(false);
  const [value, onChangeText] = React.useState("Album");
  const [valueTwo, onChangeTextTwo] = React.useState("Artist");
  const [valueThree, onChangeTextThree] = React.useState("Notes");

  const deviceWidth = `${Dimensions.get("window").width / 3}px`;

  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.newAlbumInfo}>
          <View style={styles.addPic(deviceWidth)}>
            <View style={styles.plusIcon}>
              <Icon name="plus-circle" size={32} color="#ccc" />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.topBasicInput}>
              <TextInput
                style={styles.inputText}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder={"Album"}
                clearTextOnFocus={true}
              />
            </View>
            <View style={styles.basicInput}>
              <TextInput
                style={styles.inputText}
                onChangeText={(text) => onChangeTextTwo(text)}
                value={valueTwo}
                placeholder={"Artist"}
                clearTextOnFocus={true}
              />
            </View>
          </View>
        </View>
        <View style={styles.tagContainer}>
          <View style={styles.tagButton}>
            <Text style={styles.inputText}>+ Add Tag</Text>
          </View>
        </View>
        <View style={styles.basicInput}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => onChangeTextThree(text)}
            value={valueThree}
            placeholder={"Notes"}
            clearTextOnFocus={true}
          />
        </View>
        <Link to="/album" underlayColor="transparent">
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>Add to my Collection</Text>
          </View>
        </Link>
      </View>
    </ScrollView>
  );
}
