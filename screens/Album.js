import * as React from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "react-router-native";
import {
  useFirestoreConnect,
  useFirestore,
  useFirebase,
} from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateApp } from "../redux/app/actions";
import "firebase/firestore";
import * as firebase from "firebase/app";

import { useCollection } from "react-firebase-hooks/firestore";

export default function Album() {
  const [value, onChangeText] = React.useState("Album");
  const [valueTwo, onChangeTextTwo] = React.useState("Artist");
  const [valueThree, onChangeTextThree] = React.useState("Notes");
  const [plays, updatePlays] = React.useState(
    activeAlbum ? activeAlbum.timesPlayed : 0
  );
  const history = useHistory();

  /* Firebase Redux */
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  //Query to access user docs
  const [v] = useCollection(
    firebase
      .firestore()
      .collection("records")
      .where("userId", "==", auth ? auth.uid : "")
  );

  //Update timesPlayed on click
  async function updateRecord() {
    const querySnapshot = await v.docs[0].get("timesPlayed");
    const timesPlayed = plays + 1;
    await v.docs[0].ref.update({
      timesPlayed: timesPlayed,
    });
    updatePlays(timesPlayed);
  }

  React.useEffect(() => {
    if (activeAlbum) {
      updatePlays(activeAlbum.timesPlayed);
    }
  }, [activeAlbum]);

  useFirestoreConnect([
    {
      collection: "records",
      where: ["userId", "==", auth.uid ? auth.uid : ""],
    },
  ]);

  /* Our Redux */
  const dispatch = useDispatch();
  const { activeAlbum } = useSelector((state) => ({
    activeAlbum: state.recordsReducer.activeAlbum,
  }));

  const records = useSelector((state) =>
    state.firestore.ordered.records ? state.firestore.ordered.records : []
  );

  const deviceWidth = `${Dimensions.get("window").width - 32}px`;

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.closeIconContainer}
        onPress={() => {
          dispatch(updateApp({ activeAlbum: {} }));
          history.push("/");
        }}
      >
        <View style={styles.closeIconAlbum}>
          <Icon name="close" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View style={styles.page}>
        <View style={styles.albumInfo} key={activeAlbum.createdAt}>
          <Image
            style={styles.albumPic(deviceWidth)}
            source={{ url: activeAlbum.image }}
          />

          <View style={styles.row}>
            <Text style={styles.headingTwo}>{activeAlbum.album}</Text>
            <TouchableOpacity
              style={styles.buttonContainerTop}
              onPress={() => updateRecord()}
            >
              <Text style={styles.countButton}>{`x${plays}`}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.albumInfo}>
            <Text style={styles.artist}>{activeAlbum.artist}</Text>
            <View style={styles.tagContainer}>
              {activeAlbum.tags.map((tag) => (
                <View style={styles.tagButton}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <View>
              <Text style={styles.lastPlayed}>
                Last played &nbsp; <Text style={styles.date}>May 18, 2019</Text>
              </Text>
              <Text style={styles.notes}>Notes</Text>
              <Text style={styles.note}>{activeAlbum.notes}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
