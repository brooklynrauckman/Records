import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { useHistory } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import {
  ReactReduxFirebaseProvider,
  isLoaded,
  isEmpty,
} from "react-redux-firebase";
import { store, rrfProps } from "./redux/store";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme } from "@react-navigation/native";
import { NativeRouter, Route } from "react-router-native";
import HomeScreen from "./screens/HomeScreen";
import Search from "./screens/Search";
import Add from "./screens/Add";
import Album from "./screens/Album";
import Login from "./screens/Login";
import Header from "./screens/Header";
import HeaderTwo from "./screens/HeaderTwo";
import HeaderThree from "./screens/HeaderThree";
import Nav from "./navigation/Nav";
import Images from "./screens/Images";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

function AuthIsLoaded({ children }) {
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);
  if (
    isLoaded(auth) &&
    isEmpty(auth) &&
    history.location.pathname !== "/login"
  ) {
    history.push("/login");
  }
  // else if (auth.uid && history.location.pathname !== "/") {
  //   history.push("/");
  // }

  return children;
}

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
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <NativeRouter>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <Route exact path="/login">
                <Login />
              </Route>
              <AuthIsLoaded>
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
                <Route exact path="/images" component={Images} />
              </AuthIsLoaded>
            </View>
          </NativeRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
