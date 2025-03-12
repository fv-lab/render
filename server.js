const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Add a simple homepage route
app.get("/", (req, res) => {
    res.send("Welcome to the Prometheus Metrics API!");
});

// ✅ Add your /metrics route
app.get("/metrics", async (req, res) => {
    try {
        const response = await axios.get("http://10.20.9.200:9090/api/v1/query?query=node_cpu_seconds_total");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch metrics" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));