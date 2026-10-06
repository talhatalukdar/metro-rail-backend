const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Routes
const adminAuthRoutes = require("./routes/auth.routes");
const zoneRoutes = require("./routes/zone.routes");
const staffRoutes = require("./routes/staff.routes");
const driverRoutes = require("./routes/driver.routes");
const passengerRoutes = require("./routes/passenger.routes");
const StationRoutes = require("./routes/station.routes");
const stationRoutes = require("./routes/user/station.routes");
const fareRoutes = require("./routes/user/fare.routes");
const userAuthRoutes = require("./routes/user/auth.routes");
const passengerRegRoutes = require("./routes/user/passenger.routes");
const ticketRoutes = require("./routes/user/ticket.routes");
const ticketPdfRoutes = require("./routes/user/ticketPdf.routes");
const transactionRoutes = require("./routes/user/transaction.routes");
const TicketRoutes = require("./routes/ticket.routes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// =========================
// CORS CONFIGURATION
// =========================

const allowedOrigins = [
  "http://localhost:3000",
  "https://metro-rail-frontend-chi.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests without an Origin header
    // (e.g. server-to-server requests)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],
  credentials: true,
  optionsSuccessStatus: 204
}));

// Explicitly handle preflight requests
app.options(/.*/, cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],
  credentials: true,
  optionsSuccessStatus: 204
}));

// Parse JSON request body
app.use(express.json());

// =========================
// API ROUTES
// =========================

app.use("/api/admin", adminAuthRoutes);
app.use("/api/zone", zoneRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/passenger", passengerRoutes);
app.use("/api/station", StationRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/fare", fareRoutes);
app.use("/api/user", userAuthRoutes);
app.use("/api/passenger-registration", passengerRegRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/ticket", ticketPdfRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/tickets", TicketRoutes);

// =========================
// ROOT ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("Metro Rail API is running");
});

// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});