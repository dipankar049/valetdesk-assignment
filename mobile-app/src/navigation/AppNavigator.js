import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TaskListScreen from "../screens/TaskListScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: "Tasks" }}
        />

        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{ title: "Task Details" }}
        />

        <Stack.Screen
          name="CreateTask"
          component={CreateTaskScreen}
          options={{ title: "Create Task" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}