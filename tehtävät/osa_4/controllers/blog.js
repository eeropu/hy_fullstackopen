const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      response.status(401).json({ error: 'Token missing or invalid' })
      return
    }

    const blog = new Blog(request.body)
    blog.likes = (blog.likes === undefined) ? 0 : blog.likes

    const user = await User.findById(decodedToken.id)
    blog.user = user._id

    if (blog.title === undefined || blog.url === undefined) {
      response.status(400).send({error: 'title or url was not defined!'})
    } else {
      const result = await blog.save()

      user.blogs = user.blogs.concat(result._id)
      await user.save()

      response.status(201).json(result)
    }
  } catch (e) {
    response.status(500).json(e)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      response.status(401).json({error: 'Token missing or invalid'})
      return
    }

    const blog = await Blog.findById(request.params.id)
    if (blog.user._id.toString() !== decodedToken.id) {
      response.status(401).json({error: 'Unauthorised!'})
      return
    }

    const result = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (err) {
    response.status(400).send(err)
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
    response.status(400).send(e)
  }
})

module.exports = blogsRouter
