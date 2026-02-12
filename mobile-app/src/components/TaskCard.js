import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskCard({ task, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>
      <Text style={styles.date}>
        {new Date(task.createdAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#999",
  },
});