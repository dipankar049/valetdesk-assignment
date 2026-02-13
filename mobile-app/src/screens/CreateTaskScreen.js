import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { createTask } from "../services/taskService";
import Toast from "react-native-toast-message";

export default function CreateTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Title and description are required.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await createTask({ title, description, details });

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Task created successfully!',
        });

        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to create task',
        });
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Server Error',
        text2: 'Failed to create task. Please try again.',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter short description"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Details</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter detailed info (optional)"
          value={details}
          onChangeText={setDetails}
          multiline
          numberOfLines={5}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={loading ? "Creating..." : "Create Task"}
            onPress={handleSubmit}
            disabled={loading}
            color="#4b7bec"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: "#636e72",
    marginTop: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 6,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 24,
  },
});