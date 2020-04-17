import * as React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";

export default function TabBarIcon(props) {
  const { type } = props;
  if (type === "COLLECTION") {
    return (
      <Svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Rect
          x="3"
          y="5"
          width="18"
          height="18"
          rx="2"
          ry="2"
          fill="none"
          stroke="gray"
        />
        <Path d="M8 12h8" stroke="gray" />
      </Svg>
    );
  } else if (type === "SEARCH") {
    return (
      <Svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        stroke="gray"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle cx="11" cy="11" r="7" />
        <Path d="M21 21l-4.35-4.35" />
      </Svg>
    );
  } else if (type === "ADD") {
    return (
      <Svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        stroke="gray"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle cx="12" cy="12" r="10" />
        <Path d="M12 8v8M8 12h8" />
      </Svg>
    );
  }
  return "";
}
