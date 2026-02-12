import React from "react";
import { View, Text, Button } from "react-native";

export default function TaskListScreen({ navigation }) {
  return (
    <View>
      <Text>Task List Screen</Text>

      <Button
        title="Go to Create Task"
        onPress={() => navigation.navigate("CreateTask")}
      />
    </View>
  );
}
