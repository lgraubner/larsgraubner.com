import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1, H2 } from '../components/Heading'
import { Ul, Li } from '../components/List'
import Link from '../components/Link'

const Index = () => (
  <Layout>
    <Helmet>
      <title>Uses - Lars Graubner</title>
      <meta name="robots" content="index,nofollow" />
      <meta
        name="description"
        content="If you are interested in what tools and apps I use, here is a list. Some
      things might change frequently, but I try to keep this list up to date."
      />
    </Helmet>
    <H1>Uses</H1>
    <P>
      In case you are interested in what tools and apps I use, here is a list.
      Some things might change frequently, but I try to keep this list up to
      date.
    </P>
    <P>
      If you think something is missing don't hesitate to write me a{' '}
      <Link to="hi@larsgraubner.com">mail</Link>.
    </P>
    <P>
      I'm using a Mac Book Pro 2017 therefore all software below might (but
      don't have to) be MacOS specific.
    </P>
    <H2>Editor</H2>
    <Ul>
      <Li>
        <Link to="https://google.com">Visual Studio Code</Link> is my editor of
        choice. It's fast, highly customizable and I really like working with
        it.
      </Li>
      <Li>
        I'm using the{' '}
        <Link to="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl">
          Night Owl theme
        </Link>{' '}
        from <Link to="https://twitter.com/sarah_edo">@sarah_edo</Link>. It
        provides good contrast and looks great.
      </Li>
      <Li>
        My font is "Menlo". It works fine for me, but I'm thinking of purchasing{' '}
        <Link to="https://dank.sh/">Dank Mono</Link> which looks awesome.
      </Li>
      <Li>
        If I'm doing stuff with PHP I prefer{' '}
        <Link to="https://www.jetbrains.com/phpstorm/">PhpStorm</Link>, because
        it's integration is the best.
      </Li>
    </Ul>
    <H2>Terminal</H2>
    <Ul>
      <Li>
        Currently I'm using <Link to="https://www.iterm2.com/">iTerm 2</Link>. I
        tried <Link to="https://hyper.is/">Hyper</Link> a while ago, but I had
        noticable delays when typing which was annoying. I might have to check
        it out again as it improved alot I heard.
      </Li>
      <Li>
        My terminal is running on ZSH with the{' '}
        <Link to="https://github.com/denysdovhan/spaceship-prompt">
          Spaceship
        </Link>{' '}
        prompt. I don't use Oh My Zsh because I find it too bloated and too much
        magic I don't control.
      </Li>
      <Li>
        I also maintain my own dotfiles which you can find on{' '}
        <Link to="https://github.com/lgraubner/dotfiles">Github</Link>. I'm
        always trying to find the best compromise between automation,
        maintainability and flexibility.
      </Li>
    </Ul>
    <H2>This website</H2>
    <Ul>
      <Li>
        I'm totally into static site generators. It just makes the most sense
        for a site like this. I'm using{' '}
        <Link to="http://gatsbyjs.org">GatsbyJS</Link> (which uses React) which
        is awesome. It provides a progressive web app out of the box and it's a
        breeze to create new sites.
      </Li>
      <Li>
        For styling I'm using{' '}
        <Link to="https://www.styled-components.com/">styled-components</Link>.
        I think this is the best CSS-in-JS library out there.
      </Li>
      <Li>
        The whole thing is hosted on{' '}
        <Link to="https://www.netlify.com/">Netlify</Link>. It's very fast as
        it's basicly just a CDN. They are doing an awesome job and it's free.
      </Li>
    </Ul>
    <P>
      You can find the{' '}
      <Link to="https://github.com/lgraubner/larsgraubner.com">
        source code
      </Link>{' '}
      of this website on Github.
    </P>
  </Layout>
)

export default Index
