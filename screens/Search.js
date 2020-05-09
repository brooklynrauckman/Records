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
import { updateApp } from "../redux/app/actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Search(props) {
  /* Hooks */
  const history = useHistory();
  const { results, updateResults } = props;

  //hooks
  const [search, updateSearch] = React.useState("");

  const deviceWidth = `${Dimensions.get("window").width / 2 - 20}px`;

  /* Redux */
  const dispatch = useDispatch();
  const records = useSelector((state) => state);

  React.useEffect(() => {
    updateResults(records.records);
  }, [records]);

  React.useEffect(() => {
    const filtered = records.records.filter(
      (record) =>
        record.title.toLowerCase().includes(search.toLowerCase()) ||
        record.artist.toLowerCase().includes(search.toLowerCase()) ||
        !!record.tags.filter((i) =>
          i.toLowerCase().includes(search.toLowerCase())
        ).length
    );
    if (search.length) {
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
              updateResults(records.records);
            }}
          >
            <Icon name="close" size={24} color="#999" />
          </TouchableOpacity>
        </View>
        <View style={styles.albumResults}>
          {results.map((record) => (
            <TouchableOpacity
              style={styles.smallPic(deviceWidth)}
              onPress={() => {
                dispatch(updateApp({ openRecord: record }));
                history.push("/album");
              }}
            >
              {ternaryRender(
                record.image,
                <Image
                  style={styles.smallPicImage(deviceWidth)}
                  source={{ uri: record.image }}
                ></Image>,
                <View style={styles.smallPicText}>
                  <Text style={styles.smallPicAlbum}>{record.title}</Text>
                  <Text style={styles.smallPicArtist}>{record.artist}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
