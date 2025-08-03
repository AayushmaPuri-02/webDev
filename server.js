const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require("./models/task");
const ExpressError = require("./utils/ExpressError");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = 'mongodb://127.0.0.1:27017/taskTracker';
main().then(() => console.log('Connected to DB')).catch(console.error);
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get('/', (req, res) => {
  res.send("This is home page");
});

app.get("/tasks", async (req, res) => {
  const allTasks = await Task.find({});
  res.json(allTasks);
});

app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

app.get("/tasks/:id/edit", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  const saved = await newTask.save();
  res.status(201).json(saved);
});

app.put("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

app.delete("/tasks/:id", async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted", deletedTask });
});

// Optional: comment this out if you're debugging
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page not found"));
// });

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ error: message });
});

app.listen(8080, () => {
  console.log("App is listening on port 8080");
});