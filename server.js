const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for all requests (for development)
// app.use(cors());

// ✅ OR, restrict CORS to only your frontend
app.use(cors({ origin: "https://phenikaa-phpc.web.app" }));

// ✅ Add a simple homepage route
app.get("/", (req, res) => {
    res.send("Welcome to the Prometheus Metrics API!");
});

// ✅ Add your /metrics route
app.get("/metrics", async (req, res) => {
    try {
        const response = await axios.get("https://8248-118-70-209-177.ngrok-free.app/api/v1/query?query=node_cpu_seconds_total");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch metrics" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));