import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native';
import { Colors } from '../types';

// Props
interface AddTaskProps {
  onAddTask: (text: string) => void;
  colors: Colors;
}

export default function AddTask({
  onAddTask,
  colors,
}: AddTaskProps): React.JSX.Element {
  const [inputText, setInputText] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  const isDisabled: boolean = inputText.trim().length === 0;

  const handleSubmit = (): void => {
    if (isDisabled) return;
    onAddTask(inputText);
    setInputText('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.row}>
      {/* Text Input */}
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.textPrimary,
          },
        ]}
        placeholder="Add a new task..."
        placeholderTextColor={colors.textMuted}
        value={inputText}
        onChangeText={setInputText}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        maxLength={120}
        accessibilityLabel="New task input"
      />

      {/* Add Button */}
      <TouchableOpacity
        style={[
          styles.addBtn,
          {
            backgroundColor: isDisabled ? colors.border : colors.accent,
          },
        ]}
        onPress={handleSubmit}
        disabled={isDisabled}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel="Add task"
        accessibilityState={{ disabled: isDisabled }}
      >
        <Text style={styles.addBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 28,
    marginTop: -2,
  },
});
