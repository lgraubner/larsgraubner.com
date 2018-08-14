import styled from 'styled-components'

const MarkdownContent = styled.div`
  h2 {
    margin: 2rem 0 1.5rem;
    font-size: 1.85rem;
    font-weight: 600;
    line-height: 2.5rem;
  }

  h3 {
    margin: 2rem 0 1.25rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2.5rem;
  }

  p {
    color: hsl(0, 0%, 27%) #;
    font-size: 19px;
    line-height: 1.65em;
    margin: 0 0 1.5em;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      color: hsla(0, 0%, 0%, 0.8);
      text-decoration: none;
      border-bottom: 1px solid currentColor;

      &:hover {
        color: #d006bf;
        border-color: #d006bf;
      }
    }

    code {
      font-size: 0.9rem;
      padding: 0.2em 0.4em;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 0.25rem;
      color: rgba(0, 0, 0, 0.65);
      text-shadow: none;
    }
  }

  .gatsby-highlight {
    margin: 2rem 0 2rem -4%;
    width: 108%;

    pre {
      margin: 0;
      border-radius: 3px;
      padding: 20px 4%;
      font-size: 0.85rem;
    }
  }

  .gatsby-highlight-code-line {
  }
`

export default MarkdownContent
