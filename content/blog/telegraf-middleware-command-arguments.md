---
categories: ["JavaScript"]
date: 2017-01-04T12:00:00+02:00
description: "Telegraf does not offer any command arguments parsing. This post explains how to implement a simple middleware for this task."
title: "Creating a Telegraf middleware for command arguments parsing"
url: "/blog/javascript/telegraf-middleware-command-arguments"
---

Over the holidays I set up a simple Telegram chatbot using [Telegraf][1]. It allows to easily register commands the bot can react to. Unfortunately Telegraf does not parse any command arguments which might be useful for some commands. Luckily it is very easy to extend Telegraf using middlewares.

The year 2016 was all about chatbots. 🤖 Facebook [announced them][2], Telegram has them [since 2015][3]. Therefore I wanted to hop on the train and create a simple bot. The bot should serve as control for some home automation tasks like switching the lights on and off.

## Setting up the Telegram chatbot

To get started you have to follow the steps from the official [telegram bot docs][4]. Once you have an authorization token you can start right away.

```javascript
const Telegraf = require('telegraf')

const app = new Telegraf(YOUR_BOT_TOKEN)
// register command "lights"
app.command('lights', (ctx) => ctx.reply('Hello from the bot side.'))
// start listening for messages
app.startPolling()
```

So if you want to pass some arguments to your command (e.g. `/lights on`) there is no built in way to access the single arguments. Therefore I created a simple middleware to parse the original message and save the command parts.

## Creating the middleware

A middleware is a function hooked into the message flow. If the bot receives a message the message runs through all middlewares to alter or just hand it to the next middleware.

Our middleware will parse the sent message text and store the results in the recommended namespace `ctx.state`. We will extract the command itself, the arguments and expose it along the raw command.

```javascript
const commandArgs = () => (ctx, next) => {
  if (ctx.updateType === 'message' && ctx.updateSubType === 'text') {
    const text = ctx.update.message.text.toLowerCase()
    if (text.startsWith('/')) {
      const match = text.match(/^\/([^\s]+)\s?(.+)?/)
      let args = []
      let command
      if (match !== null) {
        if (match[1]) {
          command = match[1]
        }
        if (match[2]) {
          args = match[2].split(' ')
        }
      }

      ctx.state.command = {
        raw: text,
        command,
        args
      }
    }
  }
  return next()
}

module.exports = commandArgs
```

Now we can easily access the parsed arguments in the `ctx` variable. The middleware can be used like this:

```javascript
const Telegraf = require('telegraf')
const commandArgsMiddleware = require('./commandArgs')

const app = new Telegraf(YOUR_BOT_TOKEN)

// enable our middleware
app.use(commandArgsMiddleware())

app.command('lights', (ctx) => {
  console.log(ctx.state.command) // command object
})

app.startPolling()
```

An example command object looks like this:

```javascript
{
  raw: '/lights on',
  command: 'lights',
  args: ['on']
}
```

## Wrapping up

Initially I thought there has to be a builtin way to get the command arguments with Telegraf. I was wrong. 🙈 But as it's a very well written library and supports middlewares it's no problem to parse them by yourself. This is a good example of the power of middlewares which are also used with the popular [Express framework][5].

My personal assistant is already able to answer my commands. Soon it will use a Raspberry Pi to wirelessly control the lights. 😊

[1]: http://telegraf.js.org
[2]: https://techcrunch.com/2016/04/12/agents-on-messenger/
[3]: https://telegram.org/blog/bot-revolution
[4]: https://core.telegram.org/bots#6-botfather
[5]: http://expressjs.com/
