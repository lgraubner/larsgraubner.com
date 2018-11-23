const fs = require('fs')
const path = require('path')
const mri = require('mri')
const slugify = require('slugify')
const format = require('date-fns/format')

const args = process.argv.slice(2)

const options = mri(args, {
  default: {
    title: 'New Post'
  }
})

const date = new Date()
const folderName = slugify(options.title).toLowerCase()
const folderPath = path.resolve('./src/pages/', folderName)
const filePath = path.resolve(folderPath, 'index.md')

fs.mkdir(folderPath, error => {
  if (error) return console.error(error)

  const stream = fs.createWriteStream(filePath)

  stream.on('error', err => console.error(err))

  stream.on('open', () => {
    stream.write('---\n')
    stream.write(`title: ${options.title}\n`)
    stream.write(`date: ${format(date, 'YYYY-MM-DDTHH:mm:00+00:00')}\n`)
    stream.write("description: ''\n")
    stream.write('---\n\n')
    stream.end()
  })

  console.log(`Created post "${options.title}" at ${filePath}`)

  return true
})
