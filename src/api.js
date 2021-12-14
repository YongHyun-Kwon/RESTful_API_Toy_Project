// @ts-check

// code refactoring

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

/**
 *  @typedef APIResponse
 *  @property {number} statusCode
 *  @property {string | object} body
 */

/**
 * @typedef Route
 *  @property {RegExp} url
 *  @property {'GET' | 'POST'} method
 *  @property {() => Promise<APIResponse>} callback
 */

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: 'All posts',
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },
]

module.exports = {
  routes,
}
