const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const entries = Object.keys(persons).length
  const date = new Date()
  response.send(`<p>Phonebook has info for ${entries} people</p>
                 <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(entry => entry.id === id)
  if (!person) {
    response.status(404).end()
  } else {
    response.json(person);
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(entry => entry.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  let body = request.body
  if (!body.name || !body.number) {
    response.status(400).json({
      error: 'name or number missing'
    })
  } else if (persons.some(entry => entry.name === body.name)) {
    response.status(400).json({
      error: 'Name already exists in phonebook'
    })
  } else {
    persons.push({
      id: Math.ceil(Math.random() * 100000000),
      name: body.name,
      number: body.number
    })
  
    response.json(persons)
  }

})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)