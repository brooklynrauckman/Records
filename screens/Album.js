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
  /* Our Redux */
  const dispatch = useDispatch();
  const { activeAlbum } = useSelector((state) => ({
    activeAlbum: state.recordsReducer.activeAlbum,
  }));

  //Hooks
  const [value, onChangeText] = React.useState("Album");
  const [valueTwo, onChangeTextTwo] = React.useState("Artist");
  const [valueThree, onChangeTextThree] = React.useState("Notes");
  const [plays, updatePlays] = React.useState(
    activeAlbum ? activeAlbum.timesPlayed : 0
  );
  const [playDate, updatePlayDate] = React.useState(
    activeAlbum ? activeAlbum.lastPlayed : ""
  );
  const history = useHistory();

  /* Firebase Redux */
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  //Firebase Hook to access user docs
  const [v] = useCollection(
    firebase
      .firestore()
      .collection("records")
      .where("id", "==", activeAlbum.id ? activeAlbum.id : "")
  );

  //Update timesPlayed on click
  async function updateRecord() {
    const timesPlayed = plays + 1;
    v.docs[0].ref.update({
      timesPlayed: timesPlayed,
    });
    updatePlays(timesPlayed);
  }

  //Update lastPlayed on click
  async function updateRecordTwo() {
    const today = new Date();
    const months = new Array();
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";
    const year = today.getFullYear();
    const month = months[today.getMonth()];
    const day = today.getDate();
    const seconds = today.getSeconds();
    const lastPlayed = month + " " + day + ", " + year;
    v.docs[0].ref.update({
      lastPlayed: lastPlayed,
    });
    updatePlayDate(lastPlayed);
  }

  //Watch for activeAlbum to sync timesPlayed and lastPlayed values
  React.useEffect(() => {
    if (activeAlbum) {
      updatePlays(activeAlbum.timesPlayed);
      updatePlayDate(activeAlbum.lastPlayed);
    }
  }, [activeAlbum]);

  useFirestoreConnect([
    {
      collection: "records",
      where: ["userId", "==", auth.uid ? auth.uid : ""],
    },
  ]);

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
        <View style={styles.albumInfo} key={activeAlbum.id}>
          <Image
            style={styles.albumPic(deviceWidth)}
            source={{ url: activeAlbum.image }}
          />

          <View style={styles.row}>
            <Text style={styles.headingTwo}>{activeAlbum.album}</Text>
            <TouchableOpacity
              style={styles.buttonContainerTop}
              onPress={() => {
                updateRecord();
                updateRecordTwo();
              }}
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
                Last played &nbsp; <Text style={styles.date}>{playDate}</Text>
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
