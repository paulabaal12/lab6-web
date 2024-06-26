import express from 'express';
import cors from 'cors';
import swaggerDocument from '../swagger.json' assert { type: 'json' };
import swaggerUi from 'swagger-ui-express';
import { getAllPosts, createPost, getPost, updatePost, deletePost , getAllUsers, getUser , createUser, updateUser, deleteUser} from '../db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, '..', 'log.txt'); 
const logRequests = (req, res, next) => {
  const now = new Date();
  const logEntry = `[${now.toISOString()}] ${req.method} ${req.originalUrl}\nPayload: ${JSON.stringify(req.body)}\n`;

  const originalSend = res.send;
  res.send = function(body) {
    const logResponse = `Response: ${JSON.stringify(body)}\n\n`;
    fs.appendFile(logFilePath, logEntry + logResponse, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
    originalSend.call(this, body);
  };

  next();
};

app.use(express.json());
app.use(cors());
app.use(logRequests);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todos los circuitos
 *     responses:
 *       200:
 *         description: Circuitos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Circuit'
 */
app.get('/users', async (req, res,next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/posts', async (req, res,next) => {
  try {
    const circuits = await getAllPosts();
    res.status(200).json(circuits);
  } catch (error) {
    next(error);
  }
});


/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtener un circuito por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Circuito obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circuit'
 *       400:
 *         description: Circuito no encontrado
 */
app.get('/posts/:id', async (req, res,next) => {
  try {
    const id = req.params.id;
    const circuit = await getPost(id);
    if (circuit) {
      res.status(200).json(circuit);
    } else {
      res.status(400).send('Circuit not found');
    }
  } catch (error) {
    next(error);
  }
});


app.get('/users/:id', async (req, res,next) => {
  try {
    const id = req.params.id;
    const users = await getUser(id);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).send('User not found');
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear un nuevo circuito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Circuit'
 *     responses:
 *       200:
 *         description: Circuito creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circuit'
 *       400:
 *         description: Cuerpo de la solicitud inválido
 */
app.post('/posts', async (req, res,next) => {
  try {
    const { name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64 } = req.body;

    // Validación de datos de entrada
    if (!name_circuit || !country_circuit || !name_winner || !team || !date || !year || !time_fastest_lap || !highlights || !image_base64) {
      return res.status(400).send('Invalid request body');
    }

    const result = await createPost(name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});


app.post('/users', async (req, res,next) => {
  try {
    const {username, password, name } = req.body;

    // Validación de datos de entrada
    if (!username || !password || !name ) {
      return res.status(400).send('Invalid request body');
    }

    const result = await createUser(username, password, name);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualizar un circuito existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Circuit'
 *     responses:
 *       200:
 *         description: Circuito actualizado correctamente
 *       400:
 *         description: Cuerpo de la solicitud inválido
 *       404:
 *         description: Circuito no encontrado
 */
app.put('/posts/:id', async (req, res,next) => {
  try {
    const id = req.params.id;
    const circuitData = req.body;

    // Validación de datos de entrada
    if (!circuitData || Object.keys(circuitData).length === 0) {
      return res.status(400).send('Invalid request body');
    }

    const result = await updatePost(id, circuitData);
    if (result.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).send('Circuit not found');
    }
  } catch (error) {
    next(error);
  }
});



app.put('/users/:id', async (req, res,next) => {
  try {
    const id = req.params.id;
    const userData = req.body;

    // Validación de datos de entrada
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).send('Invalid request body');
    }

    const result = await updateUser(id, userData);
    if (result.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).send('Circuit not found');
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar un circuito
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Circuito eliminado correctamente
 *       404:
 *         description: Circuito no encontrado
 */
app.delete('/posts/:id', async (req, res,next) => {
  try {
    const id = req.params.id;
    const result = await deletePost(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).send('Circuit not found');
    }
  } catch (error) {
    next(error);
  }
});

app.delete('/users/:id', async (req, res,next) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    next(error);
  }
});


// Error 501 al utilizar un método no implementado de HTTP
app.use((req, res) => {
  res.status(501).send('Not Implemented');
});




app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Circuit:
 *       type: object
 *       properties:
 *         name_circuit:
 *           type: string
 *         country_circuit:
 *           type: string
 *         name_winner:
 *           type: string
 *         team:
 *           type: string
 *         date:
 *           type: date
 *         year:
 *           type: integer
 *         time_fastest_lap:
 *           type: string
 *         highlights:
 *           type: string
 *         image_base64:
 *           type: string
 */

