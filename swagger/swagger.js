const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Food Delivery API",
            version: "1.0.0",
            description: "Authentication APIs"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: ["./swagger/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;