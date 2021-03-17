const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.status(200).json(blog)
})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (request.user.id.toString() === blogToDelete.user.id.toString()) {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    request.user.blogs = request.user.blogs.filter(item => item.id !== request.params.id)
    const updatedUser = await User.findByIdAndUpdate(request.decodedToken.id, request.user, { new: true })
    await updatedUser.save()
    response.status(200).json(blog)
  } else {
    return response.status(401).json({ error: 'You cannot delete this post'  })
  }
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) {
    request.body.likes = 0
  }
  if (!request.body.title || !request.body.title) {
    response.status(400).json('Request error')
    return
  }

  const blog = new Blog({...request.body, user: {username: request.user.username, name: request.user.name, id: request.user._id}})
  const result = await blog.save()

  request.user.blogs = request.user.blogs.concat({title: result.title,
    author: result.author,
    url: result.url,
    id: result._id})
  const updatedUser = await User.findByIdAndUpdate(request.decodedToken.id, request.user, { new: true })
  await updatedUser.save()

  response.status(201).json(result)
})

module.exports = blogsRouter
