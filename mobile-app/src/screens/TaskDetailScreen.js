import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { fetchTaskById } from "../services/taskService";

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTask = async () => {
    try {
      setError(null);
      const response = await fetchTaskById(taskId);
      setTask(response.data.data);
    } catch (err) {
      setError("Failed to load task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(isoString).toLocaleString("en-US", options);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4b7bec" />
        <Text style={styles.loadingText}>Loading task...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={loadTask} color="#4b7bec" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Task not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{task.title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{task.description || "No description"}</Text>

        <Text style={styles.label}>Details</Text>
        <Text style={styles.value}>{task.details || "No details"}</Text>

        <Text style={styles.label}>Created At</Text>
        <Text style={styles.value}>{formatDateTime(task.createdAt)}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#636e72",
    marginTop: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    marginTop: 6,
    color: "#2d3436",
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#4b7bec",
  },
  errorText: {
    fontSize: 16,
    color: "#d63031",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#636e72",
  },
});