const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require("./models/task");
const ExpressError = require("./utils/ExpressError");
const User = require('./models/user'); // adjust path if needed
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const authenticateToken = require('./middleware/authenticateToken');

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

// Get all tasks – only for logged-in users
app.get("/tasks", authenticateToken, async (req, res) => {
  const allTasks = await Task.find({});
  res.json(allTasks);
});

// Get single task – protected
app.get("/tasks/:id", authenticateToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

// Get task for editing – protected
app.get("/tasks/:id/edit", authenticateToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

// Create a task – protected
app.post("/tasks", authenticateToken, async (req, res) => {
  const newTask = new Task(req.body);
  const saved = await newTask.save();
  res.status(201).json(saved);
});

// Update a task – protected
app.put("/tasks/:id", authenticateToken, async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete a task – protected
app.delete("/tasks/:id", authenticateToken, async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted", deletedTask });
});
// Register route
app.post('/register', async (req, res, next) => {
  try {
   const { username, email, password } = req.body;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ error: 'Invalid email format' });
}
    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already taken' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// Login route
// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // 3. Create JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // 4. Send it
    res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
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