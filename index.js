const express = require('express');
const app = express();
var morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('combined'));

let persons = [
    {
        "id": 1,
        "name": "Daria",
        "number": "111-90-89"
    },
    {
        "name": "Nikita",
        "id": 2,
        "number": "+375296776969"
    },
    {
        "name": "Natasha",
        "id": 3,
        "number": "34-66-5-6"
    },
    {
        "name": "Sasha",
        "id": 4,
        "number": "233330"
    },
    {
        "id": 5,
        "name": "Alex",
        "number": "111-90-00009"
    },
    {
        "name": "Dan",
        "id": 6,
        "number": "3333"
    },
    {
        "id": 7,
        "name": "Ann",
        "number": "1234"
    },
    {
        "name": "Wera",
        "id": 8,
        "number": "333343456"
    }
];

app.get('/', (request, response) => {
    response.send('<h1>welcome</h1>')
});

app.get('/api/persons', (request, response) => {
    response.json(persons)
});

app.get('/api/info', (request, response) => {
    let dateOfRequest = new Date(Date.now());
    response.send(`
                 <h2>Phonebook has info about ${persons.length} persons</h2>
                 <p>${dateOfRequest.toDateString()}</p>
`);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = persons.find(person => person.id === id);
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body || !body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(item => item.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(person);
    response.json(person)
});

const generateId = () => {
    return Math.floor(Math.random() * 10000000);
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
