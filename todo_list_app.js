// To-Do List Application in JavaScript
// Author: Sami
// Description: A simple console-based To-Do List app with enhanced features.

// Task List Array
let tasks = [];

// Utility Functions
// Function to display a separator line
function printSeparator() {
  console.log("\n" + "-".repeat(40) + "\n");
}

// Function to validate user input for numeric choices
function isValidNumber(input) {
  return !isNaN(input) && Number.isInteger(Number(input));
}

// Function to pause execution for readability (simulates a clear screen effect)
function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Display Menu
function showMenu() {
  printSeparator();
  console.log("--- To-Do List Menu ---");
  console.log("1. Add Task");
  console.log("2. View All Tasks");
  console.log("3. View Completed Tasks");
  console.log("4. Mark Task as Completed");
  console.log("5. Delete Task");
  console.log("6. Clear All Tasks");
  console.log("7. Exit");
  printSeparator();
}

// Add a New Task
function addTask(taskDescription) {
  const task = {
    id: tasks.length + 1,
    description: taskDescription,
    completed: false,
    createdAt: new Date().toLocaleString(),
  };
  tasks.push(task);
  console.log(`Task added: "${taskDescription}"`);
}

// View All Tasks
function viewTasks() {
  if (tasks.length === 0) {
    console.log("\nNo tasks to show.");
    return;
  }
  printSeparator();
  console.log("--- To-Do List ---");
  tasks.forEach((task) => {
    console.log(
      `[${task.completed ? "✔" : " "}] Task ID: ${task.id}, Description: "${
        task.description
      }", Created At: ${task.createdAt}`
    );
  });
  printSeparator();
}

// View Only Completed Tasks
function viewCompletedTasks() {
  const completedTasks = tasks.filter((task) => task.completed);
  if (completedTasks.length === 0) {
    console.log("\nNo completed tasks to show.");
    return;
  }
  printSeparator();
  console.log("--- Completed Tasks ---");
  completedTasks.forEach((task) => {
    console.log(
      `✔ Task ID: ${task.id}, Description: "${task.description}", Completed At: ${
        task.completedAt || "N/A"
      }`
    );
  });
  printSeparator();
}

// Mark Task as Completed
function markTaskCompleted(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    if (task.completed) {
      console.log(`Task ID ${taskId} is already marked as completed.`);
    } else {
      task.completed = true;
      task.completedAt = new Date().toLocaleString();
      console.log(`Task ID ${taskId} marked as completed.`);
    }
  } else {
    console.log(`Task with ID ${taskId} not found.`);
  }
}

// Delete a Task
function deleteTask(taskId) {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1)[0];
    console.log(`Task deleted: "${deletedTask.description}"`);
  } else {
    console.log(`Task with ID ${taskId} not found.`);
  }
}

// Clear All Tasks
function clearAllTasks() {
  tasks = [];
  console.log("All tasks have been cleared!");
}

// Main Function
async function main() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async function promptUser() {
    showMenu();
    readline.question("\nEnter your choice: ", async (choice) => {
      if (!isValidNumber(choice)) {
        console.log("Invalid input! Please enter a number between 1 and 7.");
        await pause(1000);
        promptUser();
        return;
      }

      switch (parseInt(choice.trim())) {
        case 1: // Add Task
          readline.question("Enter task description: ", (desc) => {
            if (desc.trim() === "") {
              console.log("Task description cannot be empty!");
            } else {
              addTask(desc);
            }
            promptUser();
          });
          break;

        case 2: // View Tasks
          viewTasks();
          promptUser();
          break;

        case 3: // View Completed Tasks
          viewCompletedTasks();
          promptUser();
          break;

        case 4: // Mark Task as Completed
          readline.question("Enter Task ID to mark as completed: ", (id) => {
            if (!isValidNumber(id)) {
              console.log("Invalid Task ID! Please enter a valid number.");
            } else {
              markTaskCompleted(parseInt(id));
            }
            promptUser();
          });
          break;

        case 5: // Delete Task
          readline.question("Enter Task ID to delete: ", (id) => {
            if (!isValidNumber(id)) {
              console.log("Invalid Task ID! Please enter a valid number.");
            } else {
              deleteTask(parseInt(id));
            }
            promptUser();
          });
          break;

        case 6: // Clear All Tasks
          readline.question(
            "Are you sure you want to clear all tasks? (yes/no): ",
            (confirmation) => {
              if (confirmation.toLowerCase() === "yes") {
                clearAllTasks();
              } else {
                console.log("Clear action canceled.");
              }
              promptUser();
            }
          );
          break;

        case 7: // Exit
          console.log("Exiting To-Do List Application. Goodbye!");
          readline.close();
          break;

        default:
          console.log("Invalid choice! Please try again.");
          await pause(1000);
          promptUser();
      }
    });
  }

  promptUser();
}

// Run the Program
main();
