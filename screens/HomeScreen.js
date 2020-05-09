import * as React from "react";
import { Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as styles from "./styles";
import { ternaryRender } from "../lib";
import { updateApp } from "../redux/app/actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Dropdown from "./Dropdown.js";

export default function HomeScreen(props) {
  //props
  const { dropdown, updateDropdown, sortSelect, updateSortSelect } = props;

  /* Our Redux */
  const dispatch = useDispatch();
  const records = useSelector((state) => state);

  /* Hooks */
  const history = useHistory();
  // const [sort, updateSort] = React.useState(records);

  //Watch for change in sortSelect to update array of records
  // React.useEffect(() => {
  //   if (records.length) {
  //     if (sortSelect === "") {
  //       updateSort([...records]);
  //     } else if (sortSelect === "most") {
  //       updateSort([...records].sort((a, b) => b.timesPlayed - a.timesPlayed));
  //     } else if (sortSelect === "recent") {
  //       updateSort(
  //         [...records].sort((a, b) => {
  //           const key1 = new Date(a.lastPlayed);
  //           const key2 = new Date(b.lastPlayed);
  //           if (key2 < key1) return -1;
  //           if (key2 > key1) return 1;
  //           return 0;
  //         })
  //       );
  //     } else if (sortSelect === "artist") {
  //       updateSort(
  //         [...records].sort((a, b) => {
  //           const nameA = a.artist.toLowerCase();
  //           const nameB = b.artist.toLowerCase();
  //           if (nameA < nameB) return -1;
  //           if (nameA > nameB) return 1;
  //           return 0;
  //         })
  //       );
  //     } else if (sortSelect === "album") {
  //       updateSort(
  //         [...records].sort((a, b) => {
  //           const nameA = a.album.toLowerCase();
  //           const nameB = b.album.toLowerCase();
  //           if (nameA < nameB) return -1;
  //           if (nameA > nameB) return 1;
  //           return 0;
  //         })
  //       );
  //     }
  //   }
  // }, [sortSelect, records]);

  //Local constants
  const deviceWidth = `${Dimensions.get("window").width / 2 - 20}px`;
  const deviceWidthTwo = `${Dimensions.get("window").width - 32}px`;

  return (
    <React.Fragment>
      {ternaryRender(
        dropdown === true,
        <View style={styles.dropdownContainer(deviceWidthTwo)}>
          <Dropdown
            sortSelect={sortSelect}
            updateSortSelect={updateSortSelect}
          />
        </View>,
        null
      )}
      <ScrollView>
        <View style={styles.page}>
          <View style={styles.albumResults}>
            {records.records.map((record) => (
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
    </React.Fragment>
  );
}
