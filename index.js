const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const mongoURI =
    "mongodb+srv://VASUNTHARA:vasunthara@2005@cluster0.gabzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(mongoURI, { useNewURIParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.error("MongoDB connection error:", err));
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
});
const Item = mongoose.model("Item", itemSchema);
app.get("/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post("/items", async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    try {
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put("/items/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true },
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete("/items/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.paramsms.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
