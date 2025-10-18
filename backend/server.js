require("dotenv").config(); // Must be first
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Root route for quick status check
app.get("/", (req, res) => {
  res.send("✅ FoodFly backend is live on Vercel!");
});

// ------------------ Supabase Setup ------------------
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ------------------ Routes ------------------

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password, mobNo, role } = req.body;

    if (!name || !email || !password || !mobNo) {
      return res.status(400).json({ error: "All fields (name, email, password, mobNo) are required!" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password, mobno: mobNo, role: role || "user" }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: "User created successfully!", user: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  } catch (error) {
    res.status(404).json({ error: "User not found!" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, mobno, role")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    res.json({ message: "Login successful!", user: data });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});

// Create an order
app.post("/orders", async (req, res) => {
  try {
    const { orderItems, total, address, userId } = req.body;

    if (!orderItems || !total || !address || !userId) {
      return res.status(400).json({ error: "All fields (orderItems, total, address, userId) are required!" });
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([{ order_items: orderItems, total, address, user_id: userId }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: "Order created successfully!", order: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Middleware to check admin role via header
const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.header("x-user-id"); // Admin must send user ID in header
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

// Admin: fetch all orders with user info (limited fields)
app.get("/orders", checkAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;

    const { data, error } = await supabase
      .from("orders")
      .select("id, total, address, order_items, created_at, user_id, users(id, name, email, mobno)")
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch orders for a specific user
app.get("/orders/:userId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("id, total, address, order_items, created_at")
      .eq("user_id", req.params.userId);

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No orders found for this user!" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching user's orders!" });
  }
});

// ✅ Important for Vercel — don't use app.listen()
module.exports = app;
