import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Header({
  title,
  rightText,
  onRightPress,
}) {
  return (
    <View style={styles.container}>
      
      {/* Left Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Action */}
      {rightText && (
        <TouchableOpacity
          style={styles.rightContainer}
          onPress={onRightPress}
        >
          <Ionicons name="add" size={24} color="#007AFF" />
          <Text style={styles.rightText}>{rightText}</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {
    marginLeft: 4,
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
});