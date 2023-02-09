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
  const { name, cpf } = req.body;

  const costumerAlreadyExists = costumers.some(
    (costumer) => costumer.cpf === cpf
  )

  if(costumerAlreadyExists) {
    return res.status(400).json({
      error: "Costumer already exists!"
    })
  }

  costumers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return res.status(201).send();
})

app.get("/statement/:cpf", (req, res) => {
  const { cpf } = req.params;
  const costumer = costumers.find(costumer => costumer.cpf === cpf);

  if (!costumer) {
    return res.status(400).json({ error: "Costumer not found" })
  }

  return res.json(costumer.statement);
})

app.listen(3333);