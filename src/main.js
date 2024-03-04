import express from 'express';
import cors from 'cors';
import { getAllPosts, createPost, getPost, updatePost, deletePost } from '../db.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Error 500 al conectar con la base de datos o un error de código
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
app.get('/posts', async (req, res) => {
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
app.get('/posts/:id', async (req, res) => {
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
app.post('/posts', async (req, res) => {
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
app.put('/posts/:id', async (req, res) => {
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
app.delete('/posts/:id', async (req, res) => {
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

// Error 501 al utilizar un método no implementado de HTTP
app.use((req, res) => {
  res.status(501).send('Not Implemented');
});


app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
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