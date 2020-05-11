import * as React from "react";
import { useEffect, useState } from "react";
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
import { updateApp, updateRecord, deleteRecord } from "../redux/app/actions";
import { ternaryRender } from "../lib";

export default function Album(props) {
  //props
  const { isActiveTwo } = props;

  /* Redux */
  const dispatch = useDispatch();
  const records = useSelector((state) => state);
  const record = records.records.filter((r) => r.isOpen === true)[0];

  //Hooks
  const history = useHistory();
  const [shouldDelete, updateShouldDelete] = useState(false);

  const remove = () => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete Canceled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            updateShouldDelete(true);
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (shouldDelete) {
      dispatch(deleteRecord(record));
      history.push(isActiveTwo === true ? "/search" : "/");
    }
  }, [shouldDelete]);

  const printDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDate();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];

    return `${month} ${day}, ${year}`;
  };

  const deviceWidth = `${Dimensions.get("window").width - 32}px`;

  return (
    <ScrollView>
      {ternaryRender(
        record !== undefined,
        <View>
          <TouchableOpacity
            style={styles.closeIconContainer}
            onPress={() => {
              dispatch(
                updateRecord({
                  ...record,
                  ...{ isOpen: false },
                })
              );
              history.push(isActiveTwo === true ? "/search" : "/");
            }}
          >
            <View style={styles.closeIconAlbum}>
              <Icon name="close" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View style={styles.page}>
            <View style={styles.albumInfo}>
              {ternaryRender(
                record.image,
                <Image
                  style={styles.albumPic(deviceWidth)}
                  source={{ url: record.image }}
                />,
                <View style={styles.missingPic(deviceWidth)}></View>
              )}
              <View style={styles.row}>
                <Text style={styles.headingTwo}>{record.title}</Text>
                <TouchableOpacity
                  style={styles.buttonContainerTop}
                  onPress={() => {
                    dispatch(
                      updateRecord({
                        ...record,
                        ...{ timesPlayed: record.timesPlayed + 1 },
                        ...{ lastPlayed: printDate() },
                      })
                    );
                  }}
                >
                  <Text
                    style={styles.countButton}
                  >{`x${record.timesPlayed}`}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.albumInfo}>
                <Text style={styles.artist}>{record.artist}</Text>
                <View style={styles.tagContainer}>
                  {ternaryRender(
                    record,
                    record.tags.map((tag) => (
                      <View style={styles.tagButton} key={record.id}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    )),
                    null
                  )}
                </View>
                <View>
                  <Text style={styles.lastPlayed}>
                    Last played &nbsp;{" "}
                    <Text style={styles.date}>{record.lastPlayed}</Text>
                  </Text>
                  <Text></Text>
                  <Text style={styles.notes}>Notes</Text>
                  <Text style={styles.note}>{record.notes}</Text>
                </View>
                <View style={styles.buttonRight}>
                  <TouchableOpacity
                    style={styles.deleteContainer}
                    onPress={() => {
                      remove();
                    }}
                  >
                    <Text style={styles.deleteButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
