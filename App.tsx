import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";
import TaskItem from "./components/TaskItem";
import { Task, Colors } from "./types";
import AddTask from "./components/AddTask";

// Color Palette
const COLORS: Colors = {
  bg: "#0F0F14",
  surface: "#1A1A24",
  border: "#2A2A3A",
  accent: "#7C6EFA",
  accentLight: "#A99EFC",
  success: "#4ECDC4",
  danger: "#FF6B6B",
  textPrimary: "#F0EFF8",
  textSecondary: "#7A798A",
  textMuted: "#4A4A5A",
};

// Seed Data
const INITIAL_TASKS: Task[] = [
  { id: "1", text: "Review pull requests", completed: false },
  { id: "2", text: "Write unit tests for auth module", completed: true },
  { id: "3", text: "Update README documentation", completed: false },
];

const HORIZONTAL_PADDING = 40; // 20px left + 20px right

export default function App(): React.JSX.Element {
  // State
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  // Window dimensions for progress bar
  const { width } = useWindowDimensions();
  const trackWidth = width - HORIZONTAL_PADDING;

  // Derived counts
  const completedCount: number = tasks.filter((t) => t.completed).length;
  const totalCount: number = tasks.length;
  const progressWidth: number =
    totalCount === 0 ? 0 : (completedCount / totalCount) * trackWidth;

  // Handlers

  /** Toggle a task's completed status */
  const handleToggleTask = (id: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  /** Remove a task from the list */
  const handleDeleteTask = (id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  /** Add a new task with a unique timestamp-based ID */
  const handleAddTask = (text: string): void => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Render
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tasks</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>
              {completedCount}/{totalCount}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressBarTrack, { width: trackWidth }]}>
          <View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>

        {/* Add Task */}
        <AddTask onAddTask={handleAddTask} colors={COLORS} />

        {/* Task List */}
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyText}>All clear. Add a task above.</Text>
          </View>
        ) : (
          <FlatList<Task>
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                colors={COLORS}
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 28,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerBadge: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerBadgeText: {
    color: COLORS.accentLight,
    fontSize: 13,
    fontWeight: "600",
  },
  progressBarTrack: {
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  list: {
    paddingBottom: 40,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  emptyIcon: {
    fontSize: 40,
    color: COLORS.textMuted,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textMuted,
  },
});
