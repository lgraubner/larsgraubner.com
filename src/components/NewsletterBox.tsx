import React from 'react'
import styled from 'styled-components'
import { useGoal } from 'gatsby-plugin-fathom'

import P from './Paragraph'

const Container = styled.section`
  position: relative;
  background: hsla(0, 0%, 0%, 0.03);
  padding: 40px 50px;
  width: calc(100% + 100px);
  margin-bottom: 60px;
  margin-left: -50px;
`

const Heading = styled.h4`
  font-size: 30px;
  font-weight: 600;
  margin: 0 0 0.75em;
`

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    width: 90%;
  }
`

const Input = styled.input`
  font-size: 18px;
  border: 1px solid hsl(0, 0%, 0%);
  border: 0;
  background-color: hsla(0, 0%, 0%, 0.065);
  line-height: 18px;
  padding: 0 15px;
  min-height: 55px;
  flex-grow: 1;
  width: 100%;
  display: block;
  margin-bottom: 5px;
  outline: 0;
  transition: background 150ms ease-in;

  &:focus {
    background-color: hsla(0, 0%, 0%, 0.1);
  }

  @media (min-width: 768px) {
    margin: 0;
    display: inline-block;
  }
`

const Button = styled.input`
  border: 0;
  background-color: #d22d64;
  color: hsl(0, 0%, 100%);
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 0;
  font-size: 18px;
  cursor: pointer;
  height: 55px;
  padding: 0 15px;
  transition: background 150ms ease-in;

  &:active {
    outline: 0;
  }

  @media (min-width: 768px) {
    padding: 0 30px;
  }

  &:hover {
    background-color: hsl(0, 0%, 0%);
  }
`

const Error = styled.div`
  position: absolute;
  bottom: 16px;
  font-size: 14px;
  color: hsl(0, 100%, 50%);
`

const Honeypot = styled.input({
  display: 'none'
})

// time to submit
const TTS_THRESHHOLD = 1000

type Props = {
  className?: string
}

type State = {
  isValid: boolean
  submitted: boolean
  isSpam: boolean
  timeRendered: number
}

class Newsletter extends React.Component<Props, State> {
  state = {
    submitted: false,
    isValid: false,
    isSpam: false,
    timeRendered: 0
  }

  componentDidMount() {
    this.setState({
      timeRendered: +new Date()
    })
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value

    if (email.length > 0 && email.indexOf('@') !== -1) {
      this.setState({
        isValid: true
      })
    } else {
      this.setState({
        isValid: false
      })
    }
  }

  handleChangeHoneypot = () => {
    this.setState({
      isSpam: true
    })
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const now = +new Date()
    const trackGoal = useGoal('DO8KUOZC')

    this.setState({
      submitted: true
    })

    const { isValid, isSpam, timeRendered } = this.state

    const tts = now - timeRendered

    if (!isValid || isSpam || tts < TTS_THRESHHOLD) {
      e.preventDefault()
    }

    trackGoal(100)
  }

  render() {
    const { isValid, submitted } = this.state
    const { className } = this.props

    return (
      <Container className={className}>
        <form
          action="https://buttondown.email/api/emails/embed-subscribe/larsgraubner"
          method="post"
          onSubmit={this.handleSubmit}
          noValidate
        >
          <Heading>Improve your career</Heading>
          <P>
            I write a weekly newsletter about the latest from the JavaScript
            ecosystem, daily learnings and new posts on my blog.
          </P>
          <InputWrapper>
            <Input
              type="email"
              name="email"
              id="bd-email"
              placeholder="Your email address"
              onChange={this.handleChange}
            />
            <Honeypot
              type="text"
              name="name8tY4bPY"
              autoComplete="off"
              onChange={this.handleChangeHoneypot}
              tabIndex={-1}
            />
            <input type="hidden" value="1" name="embed" />
            <Button type="submit" value="Join now" />
          </InputWrapper>
        </form>
        {submitted && !isValid && (
          <Error>Please enter a valid e-mail address.</Error>
        )}
      </Container>
    )
  }
}

export default Newsletter
