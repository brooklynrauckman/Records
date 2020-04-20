import * as React from "react";
// import { useState } from "react";
import { Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as styles from "./styles";
import { ternaryRender } from "../lib";
import {
  useFirestoreConnect,
  useFirestore,
  useFirebase,
  isLoaded,
  isEmpty,
} from "react-redux-firebase";
import { updateApp } from "../redux/app/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-native";
import { useHistory } from "react-router-dom";

export default function HomeScreen(props) {
  const deviceWidth = `${Dimensions.get("window").width / 2 - 20}px`;

  /* Hooks */
  const history = useHistory();

  /* Firebase Redux */
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: "records",
      where: ["userId", "==", auth.uid ? auth.uid : ""],
    },
  ]);

  /* Our Redux */
  const dispatch = useDispatch();

  const records = useSelector((state) =>
    state.firestore.ordered.records ? state.firestore.ordered.records : []
  );

  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.albumResults}>
          {ternaryRender(
            !isLoaded(records) || isEmpty(records) || isEmpty(auth),
            <Text>Loading...</Text>,
            ternaryRender(
              !records || isEmpty(records),
              <Text>No records found</Text>,
              records.map((record) => (
                <TouchableOpacity
                  style={styles.smallPic(deviceWidth)}
                  key={record.createdAt}
                  onPress={() => {
                    dispatch(updateApp({ activeAlbum: record }));
                    history.push("/album");
                  }}
                >
                  {ternaryRender(
                    record.image.length,
                    <Image
                      style={styles.smallPicImage(deviceWidth)}
                      source={{ url: record.image }}
                    ></Image>,
                    <View style={styles.smallPicText}>
                      <Text style={styles.smallPicAlbum}>{record.album}</Text>
                      <Text style={styles.smallPicArtist}>{record.artist}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))
            )
          )}
        </View>
      </View>
    </ScrollView>
  );
}
