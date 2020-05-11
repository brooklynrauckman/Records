import * as React from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { updateApp } from "../redux/app/actions";
import { useCollection } from "react-firebase-hooks/firestore";
import { ternaryRender } from "../lib";

export default function Dropdown(props) {
  /* Our Redux */
  const dispatch = useDispatch();
  const records = useSelector((state) => (state.records ? state.records : []));

  //props
  const { sortSelect, updateSortSelect } = props;

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        style={sortSelect === "title" ? styles.dropdownTextContainer : null}
        onPress={() => updateSortSelect("title")}
      >
        <Text style={styles.dropdownText}>Album</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={sortSelect === "artist" ? styles.dropdownTextContainer : null}
        onPress={() => updateSortSelect("artist")}
      >
        <Text style={styles.dropdownText}>Artist</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={sortSelect === "most" ? styles.dropdownTextContainer : null}
        onPress={() => updateSortSelect("most")}
      >
        <Text style={styles.dropdownText}>Most Played</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={sortSelect === "recent" ? styles.dropdownTextContainer : null}
        onPress={() => updateSortSelect("recent")}
      >
        <Text style={styles.dropdownText}>Recently Played</Text>
      </TouchableOpacity>
    </View>
  );
}
