import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { Task, Colors } from "../types";

// Props
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  colors: Colors;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  colors,
}: TaskItemProps): React.JSX.Element {
  // Fade out the row before it's removed from state
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleDelete = (): void => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(() => onDelete(task.id));
        },
      },
    ]);
  };

  const handleToggle = (): void => {
    onToggle(task.id);
  };

  return (
    <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: task.completed ? colors.success + "44" : colors.border,
          },
        ]}
      >
        {/* Checkbox */}
        <TouchableOpacity
          style={[
            styles.checkbox,
            {
              borderColor: task.completed ? colors.success : colors.border,
              backgroundColor: task.completed
                ? colors.success + "22"
                : "transparent",
            },
          ]}
          onPress={handleToggle}
          activeOpacity={0.7}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: task.completed }}
          accessibilityLabel={`Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`}
        >
          {task.completed && (
            <Text style={[styles.checkmark, { color: colors.success }]}>✓</Text>
          )}
        </TouchableOpacity>

        {/* Task Text */}
        <Text
          style={[
            styles.taskText,
            {
              color: task.completed ? colors.textMuted : colors.textPrimary,
              textDecorationLine: task.completed ? "line-through" : "none",
            },
          ]}
          numberOfLines={2}
        >
          {task.text}
        </Text>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={handleDelete}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Delete task "${task.text}"`}
        >
          <Text style={[styles.deleteIcon, { color: colors.textMuted }]}>
            ✕
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

// Styles
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  checkmark: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 16,
  },
  taskText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "400",
  },
  deleteBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  deleteIcon: {
    fontSize: 12,
    fontWeight: "600",
  },
});
