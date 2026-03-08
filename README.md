# Task Manager — React Native (TypeScript)

A clean, minimal task manager built with React Native + Expo + TypeScript.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- Expo CLI: `npm install -g expo-cli`
- **Expo Go** app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Install & Run

```bash
git clone https://github.com/YOUR_USERNAME/task-manager-rn.git
cd task-manager-rn
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or your Camera app (iOS).  
Or press `i` for iOS Simulator / `a` for Android Emulator.

### Type Checking

```bash
npm run ts:check
```

---

## Project Structure

```
TaskManager/
├── App.tsx                 # Root component + state management
├── types.ts                # Shared TypeScript interfaces (Task, Colors)
├── components/
│   ├── AddTask.tsx         # Controlled text input + submit button
│   └── TaskItem.tsx        # Individual task row with animation
├── tsconfig.json           # TypeScript compiler config
├── app.json                # Expo configuration
├── package.json
└── README.md
```

---

## Features

| Feature | Description |
|---|---|
| **Add Task** | Type a description and press `+` or keyboard Done |
| **Complete Task** | Tap checkbox — strikethrough + teal highlight |
| **Delete Task** | Tap `✕` — row fades out before removal |
| **Progress Bar** | Live ratio of completed/total tasks |
| **Empty State** | Clean message when no tasks remain |
| **Keyboard Aware** | Layout shifts on keyboard open (iOS + Android) |

---

## TypeScript Notes

- All shared types live in `types.ts` (`Task`, `Colors` interfaces)
- Component props are typed with explicit interfaces
- Handlers use explicit `: void` return types
- `useState` is typed: `useState<Task[]>`, `useState<string>`
- `FlatList` is typed with its generic: `FlatList<Task>`

---

## Third-Party Libraries

None — only React Native core + Expo. TypeScript support is built into Expo.

| Package | Purpose |
|---|---|
| `expo` | Dev toolchain, builds, QR dev server |
| `typescript` | Type checking |
| `@types/react` | React type definitions |
| `@types/react-native` | React Native type definitions |
