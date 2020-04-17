import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme } from "@react-navigation/native";
import { NativeRouter, Route } from "react-router-native";
import HomeScreen from "./screens/HomeScreen";
import Search from "./screens/Search";
import Add from "./screens/Add";
import Album from "./screens/Album";
import Header from "./screens/Header";
import HeaderTwo from "./screens/HeaderTwo";
import HeaderThree from "./screens/HeaderThree";
import Nav from "./navigation/Nav";

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <NativeRouter>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <Route exact path="/">
            <Header />
            <HomeScreen />
            <Nav />
          </Route>
          <Route exact path="/search">
            <HeaderTwo />
            <Search />
            <Nav />
          </Route>
          <Route exact path="/add">
            <HeaderThree />
            <Add />
            <Nav />
          </Route>
          <Route exact path="/album" component={Album} />
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});