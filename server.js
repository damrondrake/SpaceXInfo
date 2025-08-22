const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB connection
mongoose.connect('mongodb+srv://damrondrake:3qeUeRvUV2c2EwDg@spacexinfo.nsjhoxc.mongodb.net/?retryWrites=true&w=majority&appName=spacexinfo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Register route (with password hashing)
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists.' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Save user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed.' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }
        // Create JWT
        const token = jwt.sign({ userId: user._id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'Login successful.', token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed.' });
    }
});

// Get upcoming launches
app.get('/api/launches', async (req, res) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/launches/upcoming');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch upcoming launches' });
  }
});

// Get next launch
app.get('/api/next-launch', async (req, res) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v5/launches/latest');
    const launch = response.data;
    // Standardize response for frontend
    res.json({
      name: launch.name,
      date_utc: launch.date_utc,
      pad: launch.launchpad || '',
      mission: launch.details || '',
      status: launch.success ? 'Success' : 'Failure',
      provider: 'SpaceX'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch next launch' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
