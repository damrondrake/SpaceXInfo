const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

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
