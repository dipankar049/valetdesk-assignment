# ValetDesk Mobile App

## Overview
A simple React Native app to manage tasks with a Node.js + Express backend. Users can view, create, and see details of tasks. Backend uses in-memory storage for simplicity.

## Setup

### Backend
1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Use your computer's **IP address** in `config.js` for the mobile app to connect from your device (not localhost).

**API endpoints:**
- `GET /items` -> fetch all tasks
- `GET /items/:id` -> fetch task by ID
- `POST /items` -> create new task

### Mobile App
1. Navigate to the mobile app folder:
   ```bash
   cd mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Expo:
   ```bash
   npx expo start
   ```

4. Scan the QR code in **Expo Go** app on your mobile (same network as backend).

## Key Decisions
- **In-memory backend:** Simple, avoids DB setup; task IDs use timestamps to avoid collisions.
- **Reusable components:** TaskCard for consistent UI.
- **Pull-to-refresh:** Ensures list updates after creating tasks.
- **Toast notifications:** Better UX than alerts.
- **Form validation:** Title & description required.
- **Date formatting:** Human-readable creation date in detail screen.

## Usage
1. Open the app, view task list.
2. Tap a task for details.
3. Tap "Create" to add a new task.