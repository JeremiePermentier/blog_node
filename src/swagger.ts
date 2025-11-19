import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon API',
      version: '1.0.0',
      description: 'Documentation API avec authentification',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // indique que c'est un JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [], // applique par défaut à toutes les routes (optionnel)
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // chemins vers tes fichiers de routes
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: express.Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
