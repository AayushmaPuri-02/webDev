const sampleTasks = [
  {
    title: "Buy groceries",
    description: "Milk, Bread, Eggs, Vegetables",
    completed: false,
    dueDate: new Date("2025-08-05")
  },
  {
    title: "Submit assignment",
    description: "Complete the final draft of the React project",
    completed: false,
    dueDate: new Date("2025-08-04")
  },
  {
    title: "Workout",
    description: "Leg day - squats and lunges",
    completed: true,
    dueDate: null
  },
  {
    title: "Call mom",
    description: "Weekly catch-up call",
    completed: false
  },
  {
    title: "Read a book",
    description: "Continue reading 'Atomic Habits'",
    completed: false,
    dueDate: new Date("2025-08-10")
  }
];

module.exports = { data: sampleTasks };