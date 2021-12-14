// @ts-check

// framework 없이 간단한 toyproject 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 *  - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 *  - 인증 로직은 넣지 않는다.
 *  - RESful API를 사용한다.
 *  - Postman을 사용하여 로직 확인
 */
const http = require('http')

// JSDoc 이용 예정 typescript가 parsing을 해서 type data를 만들어준다.

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
    content: 'Hello!',
  },
  {
    id: 'my_second_post',
    title: 'My second post',
    content: 'Second post!',
  },
]

/**
 * Post
 *
 * GET /posts
 * GET / posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
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
    res.setHeader('Content-Type', 'application/json; encoding=utf-8')
    res.end(JSON.stringify(result))
  } else if (postIdRegexResult && req.method === 'GET') {
    // GET /posts/:id 인 경우
    const postId = postIdRegexResult[1]
    const post = posts.find((_post) => _post.id === postId)
    if (post) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; encoding=utf-8')
      res.end(JSON.stringify(post))
    } else {
      res.statusCode = 404
      res.end('Post not found.')
    }
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.setEncoding('utf-8')
    req.on('data', (data) => {
      /**
       *  @typedef CreatePostBody
       *  @property {string} title
       *  @property {string} content
       */

      /** @type {CreatePostBody} */
      const body = JSON.parse(data)
      posts.push({
        id: body.title.toLowerCase().replace(/\s/g, '_'),
        title: body.title,
        content: body.content,
      })
    })

    res.statusCode = 200
    res.end('Creating post')
  } else {
    res.statusCode = 404
    res.end('Not found.')
  }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port : ${PORT}`)
})
