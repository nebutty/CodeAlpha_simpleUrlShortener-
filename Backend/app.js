require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db/dbConfig'); // ✅ make sure this line exists and path is correct
const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/', urlRoutes);

// ✅ Check DB connection before starting server
async function testDbConnection() {
  try {
    // Notice: we use "db" from above (no typo)
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ Database connected successfully! Test result:', rows[0].result);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await testDbConnection();
});
