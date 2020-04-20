import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { ternaryRender } from "../lib";
import * as styles from "./styles";

import HomeScreen from "./HomeScreen";

export default function Login() {
  /* Redux Firebase */
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);

  /* Hooks */
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const history = useHistory();

  /* Local Constants */
  const signIn = () => {
    firebase.login({
      email: email,
      password: password,
    });
  };

  const signUp = () => {
    firebase.createUser({ email, password });
  };

  // as soon as we become logged in, go to the home page
  useEffect(() => {
    if (!isEmpty(auth)) {
      history.push("/");
    }
  }, [auth]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={130}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <View style={styles.loginGroupContainer}>
        {ternaryRender(
          !isLoaded(auth),
          <Text>Loading...</Text>,
          ternaryRender(
            isEmpty(auth),
            <View style={styles.loginGroup}>
              {/* logged out*/}
              <View style={styles.loginInput}>
                <TextInput
                  style={styles.inputText}
                  placeholder="email"
                  onChangeText={(text) => updateEmail(text)}
                  value={email}
                  textContentType="emailAddress"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.loginInput}>
                <TextInput
                  style={styles.inputText}
                  placeholder="password"
                  onChangeText={(text) => updatePassword(text)}
                  value={password}
                  secureTextEntry={true}
                  textContentType="password"
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  signIn();
                }}
              >
                <Text style={styles.submitText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  signUp();
                }}
              >
                <Text style={styles.submitText}>Sign Up</Text>
              </TouchableOpacity>
            </View>,
            <HomeScreen />
          )
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
