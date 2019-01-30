import React from 'react'
import styled from 'styled-components'

import P from './Paragraph'

const Container = styled.section`
  position: relative;
`

const Heading = styled.h4`
  font-size: 26px;
  font-weight: 600;
  margin: 0 0 0.5em;
`

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const Input = styled.input`
  font-size: 17px;
  border: 1px solid hsl(0, 0%, 0%);
  border: 0;
  background-color: hsla(0, 0%, 0%, 0.065);
  line-height: 20px;
  padding: 0 15px;
  min-height: 45px;
  flex-grow: 1;
  width: 100%;
  display: block;
  margin-bottom: 5px;
  outline: 0;
  transition: background 150ms ease-in;
  border-radius: 0;

  &:focus {
    background-color: hsla(0, 0%, 0%, 0.1);
  }

  @media (min-width: 768px) {
    margin: 0;
    display: inline-block;
    border-radius: 0;
    max-width: 340px;
  }
`

const Button = styled.input`
  border: 0;
  background-color: #d22d64;
  color: hsl(0, 0%, 100%);
  font-weight: bold;
  padding: 0;
  font-size: 16px;
  cursor: pointer;
  height: 45px;
  padding: 0 15px;
  transition: background 150ms ease-in;
  border-radius: 0;

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
  bottom: -1.6em;
  font-size: 14px;
  color: hsl(0, 100%, 50%);
`

type State = {
  valid: boolean
  submitted: boolean
}

class Newsletter extends React.Component<{}, State> {
  state = {
    submitted: false,
    valid: false
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value

    if (email.length > 0 && email.indexOf('@') !== -1) {
      this.setState({
        valid: true
      })
    } else {
      this.setState({
        valid: false
      })
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      submitted: true
    })

    const { valid } = this.state
    if (!valid) {
      e.preventDefault()
    }
  }

  render() {
    const { valid, submitted } = this.state
    return (
      <Container>
        <form
          action="https://buttondown.email/api/emails/embed-subscribe/larsgraubner"
          method="post"
          onSubmit={this.handleSubmit}
          noValidate
        >
          <Heading>I maintain a newsletter to share what I learn</Heading>
          <P>Never miss an article about React and Javascript.</P>
          <InputWrapper>
            <Input
              type="email"
              name="email"
              id="bd-email"
              placeholder="your email"
              onChange={this.handleChange}
            />
            <input type="hidden" value="1" name="embed" />
            <Button type="submit" value="Subscribe" />
          </InputWrapper>
        </form>
        {submitted && !valid && (
          <Error>Please enter a valid e-mail address.</Error>
        )}
      </Container>
    )
  }
}

export default Newsletter
