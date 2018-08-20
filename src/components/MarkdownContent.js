import styled from 'styled-components'

import { ParagraphStyles } from '../components/Paragraph'

const MarkdownContent = styled.div`
  h2 {
    margin: 1.5em 0 1em;
    font-size: 34px;
    font-weight: 600;
    line-height: 1.3em;

    @media (min-width: 768px) {
      margin: 2em 0 1.5em;
    }
  }

  h3 {
    margin: 1.5em 0 1em;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.3em;
  }

  p {
    ${ParagraphStyles};

    code {
      font-size: 87.5%;
      word-break: break-word;
      background-color: transparent;
      color: hsla(332, 79%, 58%);
      text-shadow: none;
    }
  }

  .gatsby-highlight {
    margin: 50px 0;

    pre {
      margin: 0;
      border-radius: 3px;
      padding: 20px 20px;
      font-size: 0.9rem;
    }

    code {
      line-height: 1.55em;
    }
  }

  .gatsby-highlight-code-line {
  }
`

export default MarkdownContent
