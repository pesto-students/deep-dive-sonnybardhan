const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const SimpleODM = require('./odm-lib/odm');

const odm = new SimpleODM('mongodb://localhost:27017', 'todo-app', 'todos');

app.use(cors());
app.use(bodyParser.json());

//app.use(express.urlencoded({ extended: false }));

app.get('/todos', async (req, res) => {
  await odm.init();
  const result = await odm.all();

  res.json(result);
});

app.post('/todo/add', async (req, res) => {
  await odm.init();
  let result = await odm.addNew({
    task: req.body.task,
    complete: req.body.complete,
  });

  res.json(result);
});

app.post('/todo/update/:id', async (req, res) => {
  await odm.init();
  let todo = await odm.updateById(req.params.id, {
    task: req.body.task,
    complete: req.body.complete,
  });

  res.json(todo);
});

app.get('/todo/delete/:id', async (req, res) => {
  await odm.init();
  let result = await odm.deleteById(req.params.id);

  res.json(result);
});

app.listen(5000, () => {
  console.log('listening to port 5000');
});
