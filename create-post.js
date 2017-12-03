/* eslint no-console:0 import/no-extraneous-dependencies:0 */
const fs = require('fs')
const path = require('path')
const mri = require('mri')
const slugify = require('slugify')
const { format } = require('date-fns')

const args = process.argv.slice(2)

const options = mri(args, {
  default: {
    draft: true,
    title: 'New Post',
    description: ''
  }
})

const date = new Date()
const titlePath = slugify(options.title).toLowerCase()
const folderName = `${format(date, 'YYYY-MM-DD')}-${titlePath}`
const folderPath = path.resolve('./src/pages/', folderName)
const filePath = path.resolve(folderPath, 'index.md')

fs.mkdir(folderPath, error => {
  if (error) return console.error(error)

  const stream = fs.createWriteStream(filePath)

  stream.on('error', err => console.error(err))

  stream.on('open', () => {
    stream.write('---\n')
    stream.write(`title: "${options.title}"\n`)
    stream.write(`date: "${format(date, 'YYYY-MM-DDTHH:ii:00+00:00')}"\n`)
    stream.write(`path: "${titlePath}"\n`)
    stream.write('---\n\n')
    stream.end()
  })

  console.log(`Created post "${titlePath}"!`)

  return true
})
