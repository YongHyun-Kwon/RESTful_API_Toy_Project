// @ts-check

// framework 없이 간단한 toyproject 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 *  - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 *  - 인증 로직은 넣지 않는다.
 *  - RESful API를 사용한다.
 */

const http = require('http')
const { title } = require('process')

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: 'my_first_post',
    title: 'My first post',
    content: 'Hello',
  },
  {
    id: 'my_second_post',
    title: '나의 두번째 포스트',
    content: 'Second post!',
  },
]

/**
 *  Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/post\{[a-zA-Z0-9-_]+}$/
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined

  if (req.url === '/posts' && req.method === 'GET') {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(result))
  } else if (postIdRegexResult && req.method === 'GET') {
    // GET /posts/:id
    const postId = postIdRegexResult[1]
    const post = posts.find((_post) => _post.id === postId)

    if (post) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(post))
    } else {
      res.statusCode = 404
      res.end('Post not found')
    }

    res.statusCode = 200
    res.end('Reading a post')
  } else if (req.url === '/posts' && req.method === 'POST') {
    res.statusCode = 200
    res.end('Creating post')
  } else {
    res.statusCode = 404
    res.end('Not found.')
  }

  res.statusCode = 200
  res.end('Hello!')
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})
