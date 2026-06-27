import swaggerJsdoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Event Driven Notification Engine",
      version: "1.0.0",
      description:
        "API Documentation",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec =
  swaggerJsdoc(options);