const { sequelize } = require("../models/index");
const app = require("./app");
const { logger } = require("./utils/logger");
const db = require("../models/index");
const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3000;

console.log(`Port = ${PORT} `);
const angularAppPath = path.join(__dirname, "../../frontend/dist/frontend");
app.use(express.static(angularAppPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/frontend/index.html"));
});

app.listen({ port: PORT }, async () => {
  try {
    logger.info(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );

    await db.sequelize.sync({ alter: true });

    await sequelize.authenticate();
    logger.info("Database Connected");
  } catch (err) {
    console.log(`Error occured: ${err.message}`);
  }
});
