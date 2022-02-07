const fs = require('fs/promises');
const format = require('date-fns/format');
const slugify = require('slugify');
const mri = require('mri');

function generateTemplate({ title, date }) {
  return `---
title: ${title}
date: ${date}
description: ""
---


`;
}

async function main(argv) {
  let args = mri(argv);

  let title = args['title'] || 'New blog post';

  let filePath = `src/posts/${slugify(title, {
    lower: true,
  })}.md`;

  try {
    await fs.stat(filePath);
    console.error(`File "${filePath}" already exists...`);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }

    // file does not exist yet
    let template = generateTemplate({
      date: format(new Date(), 'yyyy-MM-dd'),
      title,
    });

    await fs.writeFile(filePath, template);

    console.log(`Blog post "${title}" successfully created at "${filePath}".`);
  }
}

main(process.argv.slice(2));
