const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'Nobody',
        url: '',
        likes: 3,
    },
    {
        title: 'HTML is easy',
        author: 'Nobody',
        url: '',
        likes: 33,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs length is 2', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(item => expect(item.id).toBeDefined())
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'New blog',
        author: 'Nobody',
        url: '',
        likes: 45,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
        'New blog'
    )
})

test('blog without likes property return likes 0 ', async () => {
    const newBlog = {
        title: 'New blog 1',
        author: 'Nobody',
        url: '',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find(r => r.title === newBlog.title)

    expect(addedBlog.likes).toEqual(0)
})

test('blog without url or title property return 400 ', async () => {
    const newBlog = {
        title: '',
        author: 'Nobody',
        url: '',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})
