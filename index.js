const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require("./src/models");
const { errorHandler } = require("./src/utils/errorHandler");
const cors = require("cors");
require("dotenv").config(); // Import dotenv
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Project Management SaaS API",
    version: "1.0.0",
    description: "API documentation for Project Management SaaS",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js",
    "./src/services/*.js",
    "./src/models/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);
sequelize.sync({ alter: false, force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
});
