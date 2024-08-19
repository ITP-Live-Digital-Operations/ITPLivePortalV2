const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

require("dotenv").config();

const { httpLogStream } = require("./utils/logger");

const authHandler = require("./middlewares/authHandler");
const userRoutes = require("./routes/user.routes");
const influencerRoutes = require("./routes/influencer.routes");
const celebrityRoutes = require("./routes/celebrity.routes");
const logRoutes = require("./routes/log.routes");
const salesBriefRoutes = require("./routes/salesBrief.routes");
const TaskRoutes = require("./routes/task.routes");

const exportRoutes = require("./routes/export-seeds.routes");
const webHookRoutes = require("./routes/webhook.routes");
const fileRoutes = require("./routes/file.routes");
const NotificationRoutes = require("./routes/notification.routes");
const campaignRoutes = require("./routes/campaign.routes");
const clientRoutes = require("./routes/client.routes");
const statisticsRoutes = require("./routes/statistics.routes");
const OGRoutes = require("./routes/og.routes");
const userStatsRoutes = require("./routes/userStats.routes");
const suggestionRoutes = require("./routes/suggestions.routes");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PUT", "PATCH"],
  })
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "http://localhost:3000",
      ],
      connectSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "http://localhost:3000",
      ],
      scriptSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "http://localhost:3000",
      ],
      imgSrc: ["'self'", "data:",
        "https://*.modash.io",],
    },
  })
);

app.use(compression());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/influencers", authHandler, influencerRoutes);
app.use("/api/v1/celebrities", authHandler, celebrityRoutes);
app.use("/api/v1/logs", authHandler, logRoutes);
app.use("/api/v1/salesbriefs", authHandler, salesBriefRoutes);
app.use("/api/v1/tasks", authHandler, TaskRoutes);
app.use("/api/v1/files", authHandler, fileRoutes);
app.use("/api/v1/campaigns", authHandler, campaignRoutes);
app.use("/api/v1/notifications", authHandler, NotificationRoutes);
app.use("/api/v1/clients", authHandler, clientRoutes);
app.use("/api/v1/statistics", authHandler, statisticsRoutes);
app.use("/api/v1/ogs", authHandler, OGRoutes);
app.use("/api/v1/suggestions", authHandler, suggestionRoutes);
app.use("/api/v1/userStats", authHandler, userStatsRoutes);



app.use("/api/v1/webhooks", webHookRoutes);

console.log("Backend started");
app.use("/api/v1/seeds", exportRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

module.exports = app;
