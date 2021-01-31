require('dotenv').config();
const express = require('express');
const app = express();
var morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');


app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('combined'));


app.get('/', (request, response) => {
    response.send('<h1>welcome</h1>')
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

app.get('/api/info', (request, response) => {
    let dateOfRequest = new Date(Date.now());
    response.send(`
                 <h2>Phonebook has info about ${persons.length} persons</h2>
                 <p>${dateOfRequest.toDateString()}</p>
`);
});

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
        response.status(204).end();
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    if (!body || !body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
