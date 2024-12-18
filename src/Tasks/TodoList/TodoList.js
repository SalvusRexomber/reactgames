import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TodoList.scss";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("normal");
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [errormessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  function handleCheckboxChange(taskId) {
    setSelectedTasks((prevSelected) => {
      const updatedSet = new Set(prevSelected);
      if (updatedSet.has(taskId)) {
        updatedSet.delete(taskId);
      } else {
        updatedSet.add(taskId);
      }
      return updatedSet;
    });
  }

  function toggleTaskCompletion(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  const saveTasksToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        tasks: tasks,
        timestamp: new Date(),
      });
      alert("To-do lista sikeresen mentve!");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Hiba történt mentés közben: ", error);
    }
  };

  // Lekérdezés a Firestore-ból
  const loadTasksFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const loadedTasks = [];
      querySnapshot.forEach((doc) => {
        loadedTasks.push(...doc.data().tasks);
      });
      setTasks(loadedTasks);
    } catch (error) {
      console.error("Hiba történt az adatlekérés során: ", error);
    }
  };

  function deleteSelectedTasks() {
    setTasks(tasks.filter((task) => !selectedTasks.has(task.id)));
    setSelectedTasks(new Set());
  }

  function addTask(e) {
    e.preventDefault();
    if (taskInput) {
      const newTask = {
        id: new Date().getTime(),
        text: taskInput,
        date: taskDate || "",
        priority: taskPriority,
        isDone: false, 
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
      setTaskDate("");
      setTaskPriority("normal");
    }
  }

  return (
    <div className="todoListPage">
      <h1>To-Do List App</h1>
      <p>
        Create a simple to-do list app with features to add, mark as done, and
        delete tasks.
      </p>
      <button onClick={() => navigate("/")}>Back to the main page</button>
      <div className="todoContainer">
        <form className="todoForm" onSubmit={addTask}>
          <div className="todoInput">
            <input
              type="text"
              id="todoInput"
              placeholder="Add a task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <input
              type="date"
              id="todoDate"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />
            <select
              id="taskPriority"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Add Task</button>
          </div>
        </form>
        <button
          onClick={deleteSelectedTasks}
          disabled={selectedTasks.size === 0}
          className="deleteSelectedButton"
        >
          Delete Selected
        </button>
        <button onClick={saveTasksToFirestore} className="saveButton">
          Save Tasks
        </button>

        <button onClick={loadTasksFromFirestore} className="loadButton">
          Load Tasks
        </button>

        <div>
          <div className="todoListHeader">
            <span className="headerItem">Done?</span>
            <span className="headerItem">Task description</span>
            <span className="headerItem">Deadline</span>
            <span className="headerItem">Priority</span>
            <span className="headerItem">Select for delete</span>
            <span className="headerItem">Delete element</span>
            <span className="headerItem">Send to calendar</span>
          </div>

          <ul className="todoList">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`todoListItem ${task.isDone ? "done" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span className="taskText">{task.text}</span>
                <span className="taskDate">
                  {task.date ? task.date : "No deadline"}
                </span>
                <span className={`taskPriority ${task.priority}`}>
                  {task.priority}
                </span>
                <input
                  type="checkbox"
                  checked={selectedTasks.has(task.id)}
                  onChange={() => handleCheckboxChange(task.id)}
                />
                <button
                  className="deleteButton"
                  onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                >
                  Delete
                </button>
                <button
                  className="sendToCalendarButton"
                  onClick={() =>
                    setErrorMessage("This is not a functional button yet.")
                  }
                >
                  Send to Calendar
                </button>
                <span className="errorMessages">{errormessage}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
