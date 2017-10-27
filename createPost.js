const fs = require('fs')
const path = require('path')

// @TODO: get cli args

function createPost(path) {
  const stream = fs.createWriteStream(`${path}/index.md`)

  stream.on('error', err => console.error(err))

  stream.on('open', () => {
    stream.write('---\n')
    stream.write(`title: "${title}"\n`)
    stream.write(`date: \n`)
    stream.write(`path: ""\n`)
    stream.write('---\n\n')
    stream.end()
  })

  // @TODO: create folder
}

createPost()
