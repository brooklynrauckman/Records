import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import HomeScreen from "../screens/HomeScreen";
import Header from "../screens/Header";
import * as styles from "../screens/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Octicon from "react-native-vector-icons/Octicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useHistory } from "react-router-dom";

export default function Nav(props) {
  const {
    isActive,
    setIsActive,
    isActiveTwo,
    setIsActiveTwo,
    isActiveThree,
    setIsActiveThree,
  } = props;
  const history = useHistory();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        onPress={() => {
          setIsActive(true);
          setIsActiveTwo(false);
          setIsActiveThree(false);
          history.push("/");
        }}
      >
        <Icon
          name="minus-box-outline"
          size={34}
          color={isActive === true ? "#c81111" : "#999"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIsActive(false);
          setIsActiveTwo(true);
          setIsActiveThree(false);
          history.push("/search");
        }}
        style={{ paddingTop: 4 }}
      >
        <Octicon
          name="search"
          size={28}
          color={isActiveTwo === true ? "#c81111" : "#999"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIsActive(false);
          setIsActiveTwo(false);
          setIsActiveThree(true);
          history.push("/add");
        }}
      >
        <MaterialIcon
          name="add-circle-outline"
          size={34}
          color={isActiveThree === true ? "#c81111" : "#999"}
        />
      </TouchableOpacity>
    </View>
  );
}
