import * as React from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "react-router-native";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateApp } from "../redux/app/actions";
import { ternaryRender } from "../lib";

export default function Album(props) {
  //props
  const { isActiveTwo } = props;

  /* Redux */
  const dispatch = useDispatch();
  const records = useSelector((state) => state);
  const activeAlbum = records.openRecord;

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

  //Update timesPlayed on click
  // async function updateRecord() {
  //   const timesPlayed = plays + 1;
  //   v.docs[0].ref.update({
  //     timesPlayed: timesPlayed,
  //   });
  //   updatePlays(timesPlayed);
  // }

  //Update lastPlayed on click
  // async function updateRecordTwo() {
  //   const date = new Date();
  //   const lastPlayed = date.toISOString();
  //
  //   v.docs[0].ref.update({
  //     lastPlayed: lastPlayed,
  //   });
  //   updatePlayDate(lastPlayed);
  // }

  //Delete album on click
  // async function deleteRecord() {
  //   Alert.alert(
  //     "Delete Record",
  //     "Are you sure you want to delete this record?",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Delete Canceled"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "OK",
  //         onPress: () => {
  //           v.docs[0].ref.delete();
  //           dispatch(updateApp({ activeAlbum: {} }));
  //           history.push(isActiveTwo === true ? "/search" : "/");
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // }

  //Watch for activeAlbum to sync timesPlayed and lastPlayed values
  React.useEffect(() => {
    if (activeAlbum) {
      updatePlays(activeAlbum.timesPlayed);
      const date = new Date(activeAlbum.lastPlayed);
      const day = date.getDate();
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
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const dateConverted = month + " " + day + ", " + year;
      if (activeAlbum.lastPlayed) {
        updatePlayDate(dateConverted);
      }
    }
  }, [activeAlbum]);

  const convertDate = () => {
    const date = new Date();
    const day = date.getDate();
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
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dateConverted = month + " " + day + ", " + year;

    updatePlayDate(dateConverted);
  };

  const deviceWidth = `${Dimensions.get("window").width - 32}px`;

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.closeIconContainer}
        onPress={() => {
          dispatch(updateApp({ openRecord: {} }));
          history.push(isActiveTwo === true ? "/search" : "/");
        }}
      >
        <View style={styles.closeIconAlbum}>
          <Icon name="close" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View style={styles.page}>
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
              convertDate();
            }}
          >
            <Text style={styles.countButton}>{`x${plays}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.albumInfo}>
          <View style={styles.row}>
            <Text style={styles.headingTwo}>{activeAlbum.title}</Text>
          </View>
          <View style={styles.albumInfo}>
            <Text style={styles.artist}>{activeAlbum.artist}</Text>
            <View style={styles.tagContainer}>
              {ternaryRender(
                activeAlbum,
                activeAlbum.tags.map((tag) => (
                  <View style={styles.tagButton}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                )),
                null
              )}
            </View>
            <View>
              {ternaryRender(
                playDate,
                <Text style={styles.lastPlayed}>
                  Last played &nbsp; <Text style={styles.date}>{playDate}</Text>
                </Text>,
                <Text></Text>
              )}
              <Text style={styles.notes}>Notes</Text>
              <Text style={styles.note}>{activeAlbum.notes}</Text>
            </View>
            <View style={styles.buttonRight}>
              <TouchableOpacity
                style={styles.deleteContainer}
                onPress={() => {
                  deleteRecord();
                }}
              >
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
