const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

// Account
// cpf - String
// name - String
// id - uuid
// statement - Array

const costumers = [];

app.post("/account", (req, res) => {
  const { name, cpf } = request.body;
  const id = uuidv4();
  costumers.push({
    cpf,
    name,
    id,
    statement: []
  });

  return res.status(201).send();
})

app.listen(3333);