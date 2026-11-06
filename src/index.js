const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let todos = [];
let nextId = 1;

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'not found' });
  if (req.body.title !== undefined) todo.title = req.body.title;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const idx = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  todos.splice(idx, 1);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Todo app listening on port ${PORT}`));
