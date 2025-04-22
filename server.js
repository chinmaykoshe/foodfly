const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/foodfly");

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobNo: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema);

// Define Order Schema
const orderSchema = new mongoose.Schema({
    orderItems: { type: Array, required: true },
    total: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Order = mongoose.model("Order", orderSchema);

// Routes
app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/orders", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials!" });
        }

        res.json({ message: "Login successful!", user });
    } catch (error) {
        res.status(500).json({ error: "Server error!" });
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error!" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));