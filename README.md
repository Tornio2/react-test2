# Todo App with Advanced Features

A modern, feature-rich todo application built with React that helps you organize and manage your tasks efficiently.

🔗 **https://tornio2.github.io/react-test2/**

## Features

### Core Functionality
- ✅ Create, edit, and delete tasks
- 📂 Organize tasks with custom categories
- 🎯 Set task priorities (High, Medium, Low)
- ✔️ Mark tasks as complete
- 📦 Archive completed tasks
- 🔄 Restore archived tasks

### Advanced Features
- 🔍 Search tasks by text
- 🏷️ Filter by status, priority, category, or archived state
- 📊 Sort tasks by date, priority, or alphabetically
- 📈 View statistics and analytics
- 🌙 Dark mode support
- 💾 Data persistence with localStorage
- 📤 Export tasks as JSON or CSV
- 📥 Import tasks from JSON and CSV files
- 🔔 Smart notifications for user actions
- ⚙️ Auto-archive completed tasks (optional)

### User Interface
- 🎨 Modern, responsive design
- 🖱️ Intuitive user experience
- 📱 Mobile-friendly interface
- 🎯 Clean, organized layout
- 🌈 Color-coded categories

## Tech Stack

- **React 19.1.0** - Frontend framework
- **React Router 7.6.3** - Client-side routing
- **React Icons 5.5.0** - Icon library
- **date-fns 4.1.0** - Date formatting utilities
- **CSS3** - Custom styling with CSS variables
- **localStorage** - Data persistence

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tornio2/react-test2.git
cd react-test2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm run build`
Builds the app for production to the `build` folder. The build is minified and optimized for best performance.

### `npm run deploy`
Deploys the app to GitHub Pages using the built files.

### `npm test`
Launches the test runner in interactive watch mode.

## Usage

### Creating Tasks
1. Enter your task in the input field
2. Select a category (optional)
3. Choose a priority level
4. Click "Add Task"

### Managing Tasks
- **Complete**: Click the circle icon next to a task
- **Edit**: Click the edit icon to modify task details
- **Archive**: Click the archive icon on completed tasks
- **Delete**: Click the delete icon to permanently remove tasks

### Filtering and Sorting
- Use the search bar to find specific tasks
- Filter by status (All, Active, Completed)
- Filter by priority or category
- Sort by date, priority, or alphabetically

### Settings
Access the settings page to:
- Toggle dark mode
- Enable auto-archiving of completed tasks
- Export your data
- Import tasks from JSON files
- View detailed statistics

## Data Management

The app automatically saves your data to your browser's localStorage, so your tasks persist between sessions. You can also:

- **Export**: Download your tasks as JSON or CSV files
- **Import**: Upload a JSON file to restore tasks
- **Backup**: Regular exports serve as backups of your data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

Project Link: [https://github.com/Tornio2/react-test2](https://github.com/Tornio2/react-test2)