# Developer Documentation - To-Do List React Application
This documentation provides a detailed description of the provided To-Do List application, its functionality, structure, and the technologies used.

## Overview
This application is a simple To-Do List, which allows users to:

- Add tasks.
- Mark tasks as completed.
- Delete tasks.
- Save tasks to a Firebase Firestore database.
- Load tasks from Firebase Firestore.

## Technologies Used
 - React: For building the user interface in a component-based architecture.
 - React Router DOM: For navigation between different pages of the app.
 - Firebase: For storing and retrieving tasks from Firestore.
 - SCSS: For styling the components.

## App Structure

### Main Components
 - TodoList: The main component where all tasks are displayed, added, and managed. It handles interactions like adding, completing, and deleting tasks. It also integrates with Firebase to load and save tasks.
 - State Variables:
 - tasks: An array holding all the tasks.
 - taskInput: The input value for the task description.
 - taskDate: The input value for the task deadline.
 - taskPriority: The selected priority for the task.
 - selectedTasks: A Set that holds the IDs of the tasks selected for deletion.
 - errormessage: Stores the error message when a user attempts an unsupported action (e.g., "Send to Calendar" button).
### Event Handlers:
 - handleCheckboxChange(taskId): Toggles whether a task is selected for deletion.
 - toggleTaskCompletion(taskId): Toggles the completion status of a task.
 - saveTasksToFirestore(): Saves the current tasks to Firebase Firestore.
 - loadTasksFromFirestore(): Loads tasks from Firebase Firestore into the component state.
 - deleteSelectedTasks(): Deletes the tasks that have been selected.
 - addTask(e): Adds a new task to the tasks state based on the input values.

## Detailed Breakdown of Key Features
### 1. Adding a Task
 - Input Fields: The user can input a task description, set a deadline (date), and select a priority (low, normal, high).
 - Add Task: Upon submitting the form, the task is added to the tasks state with a unique id generated using new Date().getTime(). The task object contains:
   - id: Unique identifier for the task.
   - text: Description of the task.
   - date: Deadline of the task (optional).
   - priority: The priority level of the task.
   - isDone: Default is false, indicating the task is not completed.
### 2. Completing a Task
Checkbox for Completion: Each task has a checkbox that, when clicked, toggles the isDone property of the task between true and false. If isDone is true, the task's visual style changes (e.g., strikethrough).
### 3. Selecting Tasks for Deletion
Checkbox for Selection: Users can select one or more tasks for deletion. This is managed by the selectedTasks Set, which stores the task IDs. The Delete Selected button will only be enabled if one or more tasks are selected.
### 4. Deleting Tasks
Delete Button: Each task has a delete button that, when clicked, removes the task from the tasks state. In addition, the "Delete Selected" button will remove all selected tasks from the list.
### 5. Saving Tasks to Firestore
Firestore Save: The saveTasksToFirestore() function saves all tasks in the current state to Firebase Firestore in a collection named "todos". Each document in the collection will have a timestamp to track when the tasks were saved.
### 6. Loading Tasks from Firestore
Firestore Load: The loadTasksFromFirestore() function retrieves all tasks stored in Firestore. Once the tasks are fetched, they are added to the tasks state, allowing the user to view previously saved tasks.

## Firestore Integration
The app interacts with Firebase Firestore for storing and loading tasks. Below are the key Firestore operations used:

 - addDoc: Adds a new document containing the list of tasks to the Firestore "todos" collection.
 - getDocs: Retrieves all documents from the Firestore "todos" collection. The tasks are extracted from each document and added to the local state.

## UI Layout and Styling
The UI is structured as follows:

 - Task Form: A form where users can input task details (description, deadline, priority).
 - Task List: A list of tasks is displayed, where each task shows its description, deadline, priority, completion status, and checkboxes for deletion.
 - Action Buttons:
     - Add Task: Submits the task form.
     - Delete Selected: Deletes all selected tasks.
     - Save Tasks: Saves the tasks to Firebase Firestore.
     - Load Tasks: Loads tasks from Firestore.

Each component and element is styled using SCSS, with classes like todoListPage, todoContainer, todoForm, etc.

## Known Limitations
 - Send to Calendar: The "Send to Calendar" button is currently non-functional and displays an error message when clicked.
 - Error Handling: Error messages are displayed when actions fail (e.g., saving/loading tasks), but more user-friendly error handling and notifications could be added for production-level apps.

## Future Improvements
 - Calendar Integration: Implementing the functionality to send tasks to an actual calendar.
 - User Authentication: Adding Firebase Authentication to enable multiple users to manage their tasks securely.
 - Task Filtering and Sorting: Implementing sorting by date or priority, and filtering by task completion status or due date.

## Conclusion
This simple To-Do List React app demonstrates core React functionalities like state management, component-based architecture, and integration with Firebase Firestore for persistent storage. It serves as a solid foundation for building more complex task management applications.
