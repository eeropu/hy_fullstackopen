const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  blog.likes = blog.likes === undefined ? 0 : blog.likes

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).send({error: 'title or url was not defined!'})
  } else {
    const result = await blog.save()
    response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const result = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (err) {
    response.status(400).send({error: 'malformatted id'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(result)
  } catch (err) {
    response.status(400).send({error: 'malformatted id'})
  }
})

module.exports = blogsRouter
