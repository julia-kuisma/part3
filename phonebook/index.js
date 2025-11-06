const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json())
app.use(morgan("tiny"));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const now = new Date();
    response.send("<p>Phonebook has info for "+persons.length+" people</p><p>"+now+"</p>")
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const searchedPerson = persons.filter(person => person.id == id)
    response.json(searchedPerson);
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 999999);
	const newPerson = {"id": id, ...request.body}
	const exists = persons.some(person => person.name === newPerson.name);
	console.log(newPerson)
	console.log(exists);
	if (newPerson.name == "" || newPerson.number == "") {
		response.status(400).send("Data missing")
	} else {
		if (exists) {
			response.status(409).send("Name must be unique")
		} else {
			persons.push(newPerson)
			response.status(201).send("Created")
		}
	}
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
 	console.log(`Server running on port ${PORT}`)
})