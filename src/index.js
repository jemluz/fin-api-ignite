const { response } = require('express');
const express = require('express');
const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "hello you ohh" })
})

app.listen(3333);