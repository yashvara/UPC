const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "upc",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Perform authentication logic (validate email and password)
  // Example:
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  connection.query(sql, [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      // User authenticated successfully
      res.json({ success: true, message: "Login successful" });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// Fetch Dashboard Data Route
app.get("/dashboard_data", (req, res) => {
  const sql = `SELECT * FROM orders`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});


// Registration Route
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  // Perform registration logic (insert user into database)
  // Example:
  const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')`;
  connection.query(sql, [username, email, password], (err, results) => {
    if (err) throw err;
    res.json({ success: true, message: "Registration successful" });
  });
});


// // Add User Route
// app.post("/dashboard_data/add_user", (req, res) => {
//   const { username, email, password } = req.body;
//   const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')`;
//   connection.query(sql, [username, email, password], (err, results) => {
//     if (err) {
//       res.status(500).json({ success: false, error: "Internal server error" });
//       return;
//     }
//     res.json({ success: true, message: "User added successfully" });
//   });
// });

// // Add Admin Route
// app.post("/dashboard_data/add_admin", (req, res) => {
//   const { username, email, password } = req.body;
//   const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'admin')`;
//   connection.query(sql, [username, email, password], (err, results) => {
//     if (err) {
//       res.status(500).json({ success: false, error: "Internal server error" });
//       return;
//     }
//     res.json({ success: true, message: "Admin added successfully" });
//   });
// });

// Fetch Orders with Details Route
app.get("/orders_with_details", (req, res) => {
  const sql = `
    SELECT orders.order_id, users.username, orders.order_type, 
    orders.order_date, orders.payment_method, 
    orders.total_amount_paid, orders.created_at,
    orders.color_price, orders.color_id, orders.color_name,
    orders.GST, orders.total_amt, orders.total_amt_in_words
    FROM orders
    INNER JOIN users ON orders.user_id = users.user_id
    WHERE users.role = 'user'
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

 
// Route to add a new user
app.post('/adduser', (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')`;
  connection.query(sql, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).json({ success: false, error: 'Internal server error' });
      return;
    }
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});


// Route to add a new admin
app.post('/addadmin', (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'admin')`;
  connection.query(sql, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error adding admin:', err);
      res.status(500).json({ success: false, error: 'Internal server error' });
      return;
    }
    res.status(201).json({ success: true, message: 'Admin added successfully' });
  });
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});