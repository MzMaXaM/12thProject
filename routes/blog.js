const express = require('express')

const db = require('../data/database')

const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/posts')
})

router.get('/posts', async (req, res) => {
  const query = `
  SELECT posts.*, authors.name AS author FROM posts 
  INNER JOIN authors ON posts.author_id = authors.id`
  const [posts] = await db.query(query)
  res.render('posts-list', {
    posts: posts
  })
})

router.post('/posts', async (req, res) => {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author
  ]
  await db.query(`
  INSERT INTO posts (title, summary, body, author_id) VALUES (?)
  `, [data])
  res.redirect('/posts')
})

router.get('/new-post', async (req, res) => {
  const [authors] = await db.query('SELECT * FROM authors')
  res.render('create-post', {
    authors: authors
  })
})

router.get('/detailPost/:id', async (req, res) => {
  const query = `SELECT posts.*, authors.name AS authorName, 
  Authors.email AS authorEmail
  FROM posts INNER JOIN authors ON posts.author_id = authors.id
  WHERE posts.id = ?`
  const [posts] = await db.query(query, [req.params.id])

  if (!posts || posts.length == 0) {
    return res.status(404).render('404')
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    changedDate: posts[0].date.toLocaleDateString('en-CA', options)
  }

  res.render('post-detail', {
    post: postData
  })
})

router.get('/updatePost/:id', async (req, res) => {
  const query = `SELECT * FROM posts WHERE id = ?`
  const [posts] = await db.query(query, [req.params.id])

  if (!posts || posts.length == 0) {
    return res.status(404).render('404')
  }

  res.render('update-post', {
    post: posts[0]
  })
})

router.post('/updatePost/:id', async (req, res) =>{
  await db.query(`
  UPDATE posts SET title = ?, summary = ?, body = ?
  WHERE id = ?
  `, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id
  ])

  res.redirect('/posts')
})

router.post('/delete/:id', async (req, res)=>{
  await db.query(`DELETE FROM posts WHERE id = ?`,
  [req.params.id])

  res.redirect('/posts')
})

module.exports = router