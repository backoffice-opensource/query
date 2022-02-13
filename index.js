const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 4040;

app.use(express.json());
app.use(cors());

const users = {}

app.get("/users", (req, res) => {
  res.send(users)
})

app.get("/users/:id", (req, res) => {
  res.send(users[req.params.id])
})

app.patch("/users/:id", (req, res) => {
  const user = users[req.params.id];
  if (!user) throw res.status(404).send();
  const permissions = req.body;
  user.permissions = { ...permissions, ...user.permissions};
  res.send(users[req.params.id])
})

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === 'USER_CREATED') {
    const { id } = data;
    users[id] = { id, permissions: [] };
  }
  
  res.send({status: 'OK'})
})

app.listen(PORT, () => {
  console.log(`Query Microservice running on port ${PORT}`);
})