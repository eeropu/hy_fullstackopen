const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((sum, likes) => sum + likes, 0)
}

const favoriteBlog = (blogs) => {
  blogWithMostLikes = undefined

  for (blog of blogs) {
    if(blogWithMostLikes === undefined || blogWithMostLikes.likes < blog.likes){
      blogWithMostLikes = blog
    }
  }
  return blogWithMostLikes
}

const mostBlogs = (blogs) => {
  authorsAndNumOfBlogs = {}
  result = {
    author: '',
    blogs: 0
  }

  for (blog of blogs) {
    if(authorsAndNumOfBlogs[blog.author] === undefined){
      authorsAndNumOfBlogs[blog.author] = 1
    } else {
      authorsAndNumOfBlogs[blog.author] = authorsAndNumOfBlogs[blog.author] + 1
    }

    if(authorsAndNumOfBlogs[blog.author] > result.blogs) {
      result.author = blog.author
      result.blogs = authorsAndNumOfBlogs[blog.author]
    }
  }

  return result
}

const mostLikes = (blogs) => {
  authorsAndNumOfLikes = {}
  result = {
    author: '',
    likes: 0
  }

  for (blog of blogs) {
    if(authorsAndNumOfLikes[blog.author] === undefined){
      authorsAndNumOfLikes[blog.author] = blog.likes
    } else {
      authorsAndNumOfLikes[blog.author] = authorsAndNumOfLikes[blog.author] + blog.likes
    }

    if(authorsAndNumOfLikes[blog.author] > result.likes) {
      result.author = blog.author
      result.likes = authorsAndNumOfLikes[blog.author]
    }
  }

  return result
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
