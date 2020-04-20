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
import { useSelector } from "react-redux";
import {
  useFirestoreConnect,
  useFirestore,
  useFirebase,
} from "react-redux-firebase";
import Images from "./Images.js";
import firebase from "firebase";
import { ternaryRender } from "../lib";

export default function Add() {
  /* Hooks */
  const [tags, updateTags] = React.useState([]);
  const [newTag, updateNewTag] = React.useState("");
  const [album, updateAlbum] = React.useState("");
  const [artist, updateArtist] = React.useState("");
  const [notes, updateNotes] = React.useState("");
  const [toggleCamera, updateToggleCamera] = React.useState(false);
  const [pic, updatePic] = React.useState({});
  // const [alert, toggleAlert] = React.useState(false);

  /* Firebase Redux */
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);
  useFirestoreConnect([
    { collection: "records", where: ["userId", "==", auth.uid] },
  ]);
  const records = useSelector((state) => state.firestore.ordered.records);

  /* Local Constants */
  const deviceWidth = `${Dimensions.get("window").width / 3}px`;

  const uploadImageToFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uploadTask = firebase
      .storage()
      .ref()
      .child(`IMAGE_${new Date().toISOString()}`)
      .put(blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => reject("There was an error uploading your image"),
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => resolve(downloadURL));
        }
      );
    });
  };

  const updateFirebaseDoc = async (imageUrl) => {
    return new Promise((resolve, reject) => {
      try {
        const record = firestore.add("records", {
          image: imageUrl && imageUrl.length ? imageUrl : "",
          album: album,
          artist: artist,
          tags: tags,
          notes: notes,
          timesPlayed: 0,
          createdAt: firestore.FieldValue.serverTimestamp(),
          userId: auth.uid,
        });
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  };

  const addNewRecord = async () => {
    const imageUrl = pic.uri ? await uploadImageToFirebase(pic.uri) : "";
    const saveSuccessful = await updateFirebaseDoc(imageUrl);
    if (saveSuccessful) {
      Alert.alert("New record has been successfully added to your collection!");
      updateTags([]);
      updatePic({});
      updateAlbum("");
      updateArtist("");
      updateNotes("");
    }
  };

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
              <Image
                style={styles.picPreview(deviceWidth)}
                source={{ uri: pic.uri }}
              ></Image>,
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
            onPress={() => addNewRecord()}
          >
            <Text style={styles.submitText}>Add to my Collection</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
