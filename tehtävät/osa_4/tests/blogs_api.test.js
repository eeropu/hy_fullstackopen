const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

describe('GET /api/blogs', () => {
  beforeAll(async () => {
    await Blog.remove({})

    for (blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Correct amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const blogNames = response.body.map(blog => blog.title)

    expect(blogNames).toContainEqual('First class tests')
  })
})

describe('POST /api/blogs', () => {
  beforeAll(async () => {
    await Blog.remove({})
  })

  test('Correct amount of blogs are returned before and and after post', async () => {
    const response = await api.get('/api/blogs')
    const amount = response.body.length

    await api.post('/api/blogs', {
      title: 'testi',
      author: 'Erkki esimerkki',
      url: 'testi.example.com/moi',
      likes: 5
    })

    const newResponse = await api.get('/api/blogs')
    expect(newResponse.body.length).toBe(amount + 1)
  })

  test('The added blog is returned', async () => {
    const response = await api
      .post('/api/blogs')
      .send({
        title: 'testi',
        author: 'Erkki esimerkki',
        url: 'testi.example.com/moi',
        likes: 5
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toEqual('testi')
    expect(response.body.author).toEqual('Erkki esimerkki')

    const getResponse = await api.get('/api/blogs')
    expect(getResponse.body).toContainEqual(response.body)
  })
})

afterAll(() => {
  server.close()
})
