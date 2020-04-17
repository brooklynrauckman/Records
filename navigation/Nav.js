import * as React from "react";
import { View } from "react-native";
import { Link } from "react-router-native";
import HomeScreen from "../screens/HomeScreen";
import Header from "../screens/Header";
import TabBarIcon from "../components/TabBarIcon";
import * as styles from "../screens/styles";

export default function Nav() {
  return (
    <View style={styles.navBar}>
      <Link to="/" underlayColor="transparent">
        <View style={styles.link}>
          <TabBarIcon type="COLLECTION" style={styles.link} />
        </View>
      </Link>
      <Link
        to="/search"
        underlayColor="transparent"
        activeStyle={{ background: "red" }}
      >
        <View>
          <TabBarIcon type="SEARCH" />
        </View>
      </Link>
      <Link to="/add" underlayColor="transparent">
        <View>
          <TabBarIcon type="ADD" />
        </View>
      </Link>
    </View>
  );
}
