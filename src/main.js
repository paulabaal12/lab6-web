import express from 'express';
import { getAllPosts, createPost, getPost, updatePost, deletePost } from '../db.js';

const app = express();
const port = 3001;

app.use(express.json());

//Error 500 al conectar con la base de datos o un error de código
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/posts', async (req, res) => {
  try {
    const circuits = await getAllPosts();
    res.status(200).json(circuits);
  } catch (error) {
    next(error);
  }
});

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

app.post('/posts', async (req, res) => {
  try {
    const { name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64 } = req.body;
    const result = await createPost(name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const circuitData = req.body;
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
