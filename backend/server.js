// backend/api.js (or any name for Vercel serverless)
require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend.vercel.app"
];

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-user-id");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

app.use(express.json());

// ------------------ Routes ------------------

// Root route
app.get("/", (req, res) => {
  res.send("✅ FoodFly backend is live!");
});

// ------------------ Users ------------------

// Create new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password, mobNo, role } = req.body;
    if (!name || !email || !password || !mobNo)
      return res.status(400).json({ error: "All fields are required!" });

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password, mobno: mobNo, role: role || "user" }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: "User created!", user: data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single user
app.get("/user/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, mobno, role")
      .eq("id", req.params.id)
      .single();

    if (error || !data) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: "User not found!" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required!" });

    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, mobno, role")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) return res.status(401).json({ error: "Invalid credentials!" });
    res.json({ message: "Login successful!", user: data });
  } catch (err) {
    res.status(500).json({ error: "Server error!" });
  }
});

// ------------------ Orders ------------------

// Create order
app.post("/orders", async (req, res) => {
  try {
    const { orderItems, total, address, userId } = req.body;
    if (!orderItems || !total || !address || !userId)
      return res.status(400).json({ error: "All fields required!" });

    const { data, error } = await supabase
      .from("orders")
      .insert([{ order_items: orderItems, total, address, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: "Order created!", order: data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get orders for specific user
app.get("/orders/:userId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("id, total, address, order_items, created_at")
      .eq("user_id", req.params.userId);

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: "No orders found!" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching orders!" });
  }
});

// ------------------ Admin Middleware ------------------
const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.header("x-user-id");
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { data: user, error } = await supabase
      .from("users")
      .select("id, role")
      .eq("id", userId)
      .single();

    if (error || !user) return res.status(401).json({ error: "Unauthorized" });
    if (user.role !== "admin") return res.status(403).json({ error: "Forbidden" });

    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Admin: fetch all users
app.get("/users", checkAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, mobno, role");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: fetch all orders
app.get("/orders", checkAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("id, total, address, order_items, created_at, user_id, users(id, name, email, mobno)");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Export for Vercel ------------------
module.exports = serverless(app);
