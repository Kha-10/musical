import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for your frontend
app.use(cors());

// Proxy endpoint
app.get("/api/proxy", async (req, res) => {
  try {
    const { url } = req.query; // Pass the API URL as a query parameter
    const decodedUrl = decodeURIComponent(url); // Decode the URL
    const response = await axios.get(decodedUrl); // Make the request to the API
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
