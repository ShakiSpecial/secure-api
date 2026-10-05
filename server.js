const sanitizeMiddleware = require(
  "./middleware/sanitizeMiddleware"
);
//const mongoSanitize = require("express-mongo-sanitize");
const { swaggerUi, specs } = require("./config/swagger");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(sanitizeMiddleware);
//app.use(mongoSanitize());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    message:
      "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Secure API is Running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});