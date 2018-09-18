// @flow
import * as React from 'react'
import styled from 'styled-components'

import P from './Paragraph'

const Container = styled.section`
  margin-top: 80px;
  position: relative;

  @media (min-width: 768px) {
    margin-top: 140px;
  }
`

const Heading = styled.h4`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 0.75em;
`

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`

const Input = styled.input`
  font-size: 17px;
  border: 1px solid hsla(0, 0%, 0%);
  line-height: 20px;
  padding: 0 15px;
  min-height: 45px;
  display: inline-block;
  flex-grow: 1;
  max-width: 400px;
`

const Button = styled.input`
  border: 0;
  background-color: hsl(0, 0%, 0%);
  color: hsl(0, 0%, 100%);
  font-weight: bold;
  padding: 0;
  cursor: pointer;
  height: 45px;
  padding: 0 15px;

  @media (min-width: 768px) {
    padding: 0 25px;
  }
`

const Error = styled.div`
  position: absolute;
  bottom: -22px;
  font-size: 14px;
  color: hsl(0, 100%, 50%);
`

type Props = {}

type State = {
  valid: boolean,
  submitted: boolean
}

class Newsletter extends React.Component<Props, State> {
  state = {
    valid: false,
    submitted: false
  }

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
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

  handleSubmit = (e: SyntheticEvent<HTMLInputElement>) => {
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
          <Heading>I build up a newsletter to share what I learn</Heading>
          <P>Focusing on JavaScript, React and web development. No spam.</P>
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
        {submitted &&
          !valid && <Error>Please enter a valid e-mail address.</Error>}
      </Container>
    )
  }
}

export default Newsletter
