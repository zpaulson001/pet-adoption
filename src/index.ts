import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import { writeSpecFiles } from './lib/spec-files.js';
import petsRouter from './routes/pets.js';
import sheltersRouter from './routes/shelters.js';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

//OpenAPI definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pet Adoption API',
      version: '1.0.0',
      description: 'API for pet adoption',
    },
    tags: [
      {
        name: 'Pets',
        description: 'Pet management endpoints',
      },
      {
        name: 'Shelters',
        description: 'Shelter management endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
    ],
    components: {
      schemas: {
        Pet: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            species: { type: 'string' },
            breed: { type: 'string' },
            age: { type: 'number' },
            size: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string' },
            shelterId: { type: 'string' },
          },
        },
        Shelter: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            preferences: {
              type: 'object',
              properties: {
                species: { type: 'array', items: { type: 'string' } },
                size: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

//write swaggerSpec to file json and yaml
writeSpecFiles(swaggerSpec);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-spec.json', (req, res) => {
  res.json(swaggerSpec);
});

app.get('/api-spec.yaml', (req, res) => {
  res.setHeader('Content-Type', 'application/yaml');
  res.send(yaml.dump(swaggerSpec));
});

/**
 * @openapi
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Returns a welcome message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
app.get('/', (req, res) => {
  res.send('Look out world!');
});

// Mount the routers
app.use('/pets', petsRouter);
app.use('/shelters', sheltersRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
