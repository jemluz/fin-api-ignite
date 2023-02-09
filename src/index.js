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

const custumers = [];

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.params;
  const custumer = custumers.find(custumer => custumer.cpf === cpf);

  if (!custumer) {
    return res.status(400).json({ error: "Costumer not found" })
  }

  // criação de um objeto costumer dentro da reqisição para
  // ser acessado após o next()
  req.custumer = custumer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === "credit") {
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0);
  return balance;
}

app.post("/account", (req, res) => {
  const { name, cpf } = req.body;

  const custumerAlreadyExists = custumers.some(
    (custumer) => custumer.cpf === cpf
  )

  if(costumerAlreadyExists) {
    return res.status(400).json({
      error: "Custumer already exists!"
    })
  }

  custumers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return res.status(201).send();
})

app.get("/statement/:cpf", verifyIfExistsAccountCPF, (req, res) => {
  return res.json(custumer.statement);
})

app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = request.body;
  const { custumer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  custumer.statement.push(statementOperation);

  return res.status(201).send();
})

app.post("/withdraw", verifyIfExistsAccountCPF, (req, res) => {
  const { amount } = req.body;
  const { custumer } = req;

  const balance = getBalance(custumer.statement);

  if (balance < amount) {
    return res.status(400).json({ error: "Insuficient funds!!"});
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  }

  custumer.statement.push(statementOperation);
  return res.status(201).send();
})

app.listen(3333);