import * as React from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Link } from "react-router-native";
import { ScrollView } from "react-native-gesture-handler";
import * as styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Images from "./Images.js";
import { ternaryRender } from "../lib";
import { addRecord } from "../redux/app/actions";
import { useSelector, useDispatch } from "react-redux";

export default function Add() {
  /* Hooks */
  const [tags, updateTags] = React.useState([]);
  const [newTag, updateNewTag] = React.useState("");
  const [album, updateAlbum] = React.useState("");
  const [artist, updateArtist] = React.useState("");
  const [notes, updateNotes] = React.useState("");
  const [toggleCamera, updateToggleCamera] = React.useState(false);
  const [pic, updatePic] = React.useState({});

  /* Local Constants */
  const deviceWidth = `${Dimensions.get("window").width / 3}px`;
  const dispatch = useDispatch();

  // const addNewRecord = async () => {
  //   const imageUrl = pic.uri ? await uploadImageToFirebase(pic.uri) : "";
  //   const saveSuccessful = await updateFirebaseDoc(imageUrl);
  //   if (saveSuccessful) {
  //     Alert.alert("New record has been successfully added to your collection!");
  //     updateTags([]);
  //     updatePic({});
  //     updateAlbum("");
  //     updateArtist("");
  //     updateNotes("");
  //   }
  // };

  return (
    <ScrollView>
      {toggleCamera === true ? (
        <Images
          pic={pic}
          updatePic={updatePic}
          updateToggleCamera={updateToggleCamera}
          toggleCamera={toggleCamera}
        />
      ) : (
        <View style={styles.page}>
          <View style={styles.newAlbumInfo}>
            {ternaryRender(
              pic.uri,
              <TouchableOpacity
                style={styles.smallPic}
                onPress={() => updateToggleCamera(!toggleCamera)}
              >
                <Image
                  style={styles.picPreview(deviceWidth)}
                  source={{ uri: pic.uri }}
                ></Image>
              </TouchableOpacity>,
              <View style={styles.addPic(deviceWidth)}>
                <TouchableOpacity
                  style={styles.plusIcon}
                  onPress={() => updateToggleCamera(!toggleCamera)}
                >
                  <Icon name="plus-circle" size={32} color="#ccc" />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.inputGroup}>
              <View style={styles.topBasicInput}>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => updateAlbum(text)}
                  value={album}
                  placeholder="Album"
                  placeholderTextColor="#999"
                  clearTextOnFocus={true}
                  clearButtonMode="always"
                />
              </View>
              <View style={styles.basicInput}>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => updateArtist(text)}
                  value={artist}
                  placeholder={"Artist"}
                  placeholderTextColor="#999"
                  clearTextOnFocus={true}
                  clearButtonMode="always"
                />
              </View>
            </View>
          </View>

          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
              <View style={styles.tagButton} key={`${tag}-${index}`}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity style={styles.clearIcon}>
                  <Icon
                    name="close-circle"
                    size={16}
                    color="#ccc"
                    onPress={() => {
                      updateTags(tags.filter((item) => item !== tag));
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.addTagButton}>
              <TextInput
                style={styles.addTagText}
                placeholder="+ Add Tag"
                textAlign="center"
                value={newTag}
                clearTextOnFocus={true}
                clearButtonMode="always"
                onChangeText={(text) => updateNewTag(text)}
                onSubmitEditing={() => {
                  updateTags([...tags, newTag]);
                  updateNewTag("");
                }}
              />
            </View>
          </View>
          <View style={styles.basicInput}>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => updateNotes(text)}
              value={notes}
              placeholder={"Notes"}
              placeholderTextColor="#999"
              clearTextOnFocus={true}
              clearButtonMode="always"
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              dispatch(
                addRecord({
                  image: pic.uri,
                  title: album,
                  artist: artist,
                  tags: tags,
                  notes: notes,
                  timesPlayed: 0,
                  lastPlayed: "",
                })
              )
            }
          >
            <Text style={styles.submitText}>Add to my Collection</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
