import express from 'express'

import {  getAllPosts, createPost, getPost, updatePost, deletePost} from '../db.js'

const app = express()
const port = 3000

app.use(express.json());


app.get('/posts', async (req, res) => {
    const circuits = await getAllPosts();
    res.status(200).json(circuits);
  });
  
app.get('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const circuit = await getPost(id);
    res.status(200).json(circuit);
  });
  
  
  app.post('/posts', async (req, res) => {
    try {
      const {name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64} = req.body;  
      const result = await createPost(name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error: ' + error.message });
    }
  });



  app.put('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const circuitData = req.body;
  
    const result = await updatePost(id, circuitData);
  
    if (result.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).send('Circuit not found');
    }
  });
  
  
  app.delete('/posts/:id', async (req, res) => {
    const id = req.params.id;
    
    const result = await deletePost(id);
    
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).send('Circuit not found'); 
    }
  });
  
  
  app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
  });