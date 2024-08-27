# **FOCUS: A Gamified Task Management Application**

## Team:

This project was a solo-built project by Ruhinda Roderick Izooba.

## Overview

Focus is a feature-rich, gamified platform designed to help users manage their daily tasks efficiently. The application integrates a Pomodoro timer, drag and drop task prioritzation and health and experience tracking to make task management engaging and productive.

## Features

* User Authentication: Sign up and sign in to your personal task manager.
* Task Management: Add, edit, delete, complete and skip tasks.
* Focus Mode: Enter a distraction-free mode with a Pomodoro timer to focus on your tasks.
* Gamified Experience: Gain experience points and lose health based on task completion or skipping.
* Notifications: Recieve categorized notifications for various actions like task completion, task deletion, health loss and more.
* Drag-and-Drop Prioritization: Organize your tasks based on priority using a drag-and-drop feature.
* Responsive UI/UX: Minimalistic and gamified design inspired by the games 'Threes!' and 'Football Manager 2024', built with Tailwind CSS.

## Technologies Used

* Front-end: React.js, Tailwind CSS
* Routing: React Router
* State Management: React Hooks
* Authentication: Firebase Google, Custom Auth Context
* Notifications: Custom Notification Context
* Persistence: LocalStorage for task management

## Getting Started

### Prerequisities

* Node.js and npm (Node Package Manager) should be installed on your machine.

### Installation

1. Clone the repository

```
git clone https://github.com/Ruhinda01/Focus.git
cd focus
```

2. Install the dependencies

```
npm install
```

3. Start the development server

```
npm start
```

This will start the application on `http://localhost:3000`.

### Folder Structure

* `/completed`: Contains reusable components like `Header`, `Sidebar`, `TaskModal`, etc.
* `/pages`: Contains page components like `Today`, `Completed`, `Skipped`, `Upcoming`, `Focus` etc.
* `/Auth`: Contains authentication components like `SignUp`, `SignIn` and the `AuthContext`.
* `/Notifications`: Contains the notification system and context.
* `/ProtectedRoute.js`: A higher-order to protect routes that require authentication.
* `/App.js`: The main component that renders the application's layout and routes.

### Key Components

* `App.js`: The root component that sets up the application's layout, routes and state management.
* `TaskModal.js`: A modal component for adding or editing tasks.
* `Focus.js`: A dedicated page for focusing on a single task with a Pomodoro timer.
* `Sidebar.js`: A sidebar for easy navigation between different sections of the application.

### Routing

The application uses React Router to manage routes:

* `/signup`: User registration page.
* `/signin`: User login page
* `/today`: View and manage today's tasks.
* `/completed`: View and manage today's tasks.
* `/skipped`: View and manage skipped tasks
* `/upcoming`: View and manage upcoming tasks.
* `/focus`: Enter focus mode for a single task.
* `/*`: Catch-all route for handling 404 (Not Found) errors.

### Task Management

* Add Task: Use the modal to add a new task with a title, description, due date and priority.
* Edit Task: Modify existing tasks via the same modal.
* Delete Task: Remove tasks from the list with corresponding notifications.
* Complete Task: Mark tasks as completed, gain experience points and recieve notifications.
* Skip Task: Skip tasks, lose health points and recieve notifications.
* Respawn Tasks: Re-do tasks, gain health points if task is respawned from skipped section and recieve notifications.
* Task Status:
  * Pending: Tasks due today
  * Upcoming: Tasks with future due date.
  * Completed: Tasks that have been completed.
  * Skipped: Tasks that have been skipped.

### Notifications

The application provides notifications categorized into info, warning and failure. Notifications are displayed for actions like task addition, task completion, task skipping, health loss and experience gain.

### Customization

* UI/UX: Customize the look and feel using Tailwind CSS. The app is designed with a minimalist aesthetic inpsired by the games "Threes!" and "Football Manager".
* Task Management Logic: Easily modify task management logic in `App.js` to suit your needs.

### Known Issues

* Upcoming page: There is an issue with the responsiveness of the page in the mobile view.
* Drag-and-Drop Feature: This functionality may have issue due to the Tailwind CSS styling.
* Persistent Bugs: Some bugs may persist, and the code requires careful testing and debugging.

## Contributing

If you'd like to contribute to this project, please fork the repository, create a new branch and submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License.