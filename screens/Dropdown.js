import * as React from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as styles from "./styles";
import {
  useFirestoreConnect,
  useFirestore,
  useFirebase,
} from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import { updateApp } from "../redux/app/actions";
import "firebase/firestore";
import * as firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import { ternaryRender } from "../lib";

export default function Dropdown(props) {
  /* Our Redux */
  const dispatch = useDispatch();
  const records = useSelector((state) =>
    state.firestore.ordered.records ? state.firestore.ordered.records : []
  );

  //props
  const { sortSelect, updateSortSelect } = props;

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        style={sortSelect === "album" ? styles.dropdownTextContainer : null}
        onPress={() => updateSortSelect("album")}
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
