import * as React from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
import { useHistory } from "react-router-dom";

export default function Search(props) {
  /* Hooks */
  const history = useHistory();
  const { results, updateResults } = props;
  const [search, updateSearch] = React.useState("");

  const deviceWidth = `${Dimensions.get("window").width / 2 - 20}px`;

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

  React.useEffect(() => {
    if (records.length) {
      updateResults(records);
    }
  }, [records]);

  React.useEffect(() => {
    const filtered = records.filter(
      (record) =>
        record.album.toLowerCase().includes(search.toLowerCase()) ||
        record.artist.toLowerCase().includes(search.toLowerCase()) ||
        !!record.tags.filter((i) =>
          i.toLowerCase().includes(search.toLowerCase())
        ).length
    );
    if (records.length && search.length) {
      updateResults(filtered);
    }
  }, [search]);

  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchBar}
            onChangeText={(text) => updateSearch(text)}
            value={search}
            placeholder="i.e. Album, Artist, Genre"
            placeholderTextColor="#999"
            clearTextOnFocus={true}
            onSubmitEditing={() => {
              updateSearch(search);
            }}
          />
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              updateSearch("");
              updateResults(records);
            }}
          >
            <Icon name="close" size={24} color="#999" />
          </TouchableOpacity>
        </View>
        <View style={styles.albumResults}>
          {ternaryRender(
            !isLoaded(records) || isEmpty(records) || isEmpty(auth),
            <Text>Loading...</Text>,
            ternaryRender(
              !records || isEmpty(records),
              <Text>No records found</Text>,
              results.map((record) => (
                <TouchableOpacity
                  style={styles.smallPic(deviceWidth)}
                  key={record.id}
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
