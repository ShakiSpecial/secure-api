const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Secure API",
      version: "1.0.0",
      description:
        "A Secure REST API with JWT Authentication and Role-Based Authorization",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};