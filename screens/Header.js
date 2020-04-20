import * as React from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import * as styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFirestoreConnect,
  useFirestore,
  useFirebase,
} from "react-redux-firebase";
import { useSelector } from "react-redux";

export default function Header() {
  /* Firebase Redux */
  const firebase = useFirebase();
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: "records",
      where: ["userId", "==", auth.uid ? auth.uid : ""],
    },
  ]);

  const records = useSelector((state) =>
    state.firestore.ordered.records ? state.firestore.ordered.records : []
  );

  const deviceWidth = `${Dimensions.get("window").width - 28}px`;

  return (
    <View style={styles.collectionTop(deviceWidth)}>
      <View style={styles.rowLeft}>
        <Text style={styles.myCollection}>My Collection</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.countButton}>{records.length}</Text>
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
