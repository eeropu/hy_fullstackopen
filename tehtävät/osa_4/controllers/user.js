const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const duplicates = await User.find({username: body.username})

    if (body.password.length < 3){
      response.status(400).json('Password is too short!')
      return
    } else if (duplicates.length > 0) {
      response.status(400).json('Username is already in use!')
      return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      name: body.name,
      username: body.username,
      passwordHash,
      major: (body.major !== undefined) ? body.major : true
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (e) {
    console.log(e)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1} )
  response.json(users)
})

module.exports = usersRouter
