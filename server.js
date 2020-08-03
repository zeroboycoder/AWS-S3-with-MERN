const express = require("express");
const app = express();

// Use Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set route(api)
const api = require("./routes/api/api");
app.use("/", api);

// Set port and listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
   console.log("Open the browser and type localhost:5000/")
);
