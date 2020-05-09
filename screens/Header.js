import * as React from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import * as styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

export default function Header(props) {
  //props
  const { dropdown, updateDropdown, updateSortSelect } = props;

  const records = useSelector((state) => (state.records ? state.records : []));

  const deviceWidth = `${Dimensions.get("window").width - 28}px`;

  return (
    <View style={styles.collectionTop(deviceWidth)}>
      <View style={styles.rowLeft}>
        <Text style={styles.myCollection}>My Collection</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.countButton}>{records.length}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            updateDropdown(!dropdown);
            updateSortSelect("");
          }}
        >
          <Text style={styles.sort}>Sort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
