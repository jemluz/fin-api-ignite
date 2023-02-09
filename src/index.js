const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

// Account
// cpf - String
// name - String
// id - uuid
// statement - Array

// Statement
// description - String
// amount - double
// created at - Date()
// type - enum "credit" | "debit"

const costumers = [];

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.params;
  const costumer = costumers.find(costumer => costumer.cpf === cpf);

  if (!costumer) {
    return res.status(400).json({ error: "Costumer not found" })
  }

  // criação de um objeto costumer dentro da reqisição para
  // ser acessado após o next()
  req.costumer = costumer;

  return next();
}

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

app.get("/statement/:cpf", verifyIfExistsAccountCPF, (req, res) => {
  return res.json(costumer.statement);
})

app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = request.body;
  const { costumer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
})

app.listen(3333);