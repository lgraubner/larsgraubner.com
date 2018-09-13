import React from 'react'
import styled from 'styled-components'

import P from './Paragraph'

const Container = styled.section`
  margin-top: 80px;

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

const Newsletter = () => (
  <Container>
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/larsgraubner"
      method="post"
      target="popupwindow"
      onsubmit="window.open('https://buttondown.email/larsgraubner', 'popupwindow')"
      class="embeddable-buttondown-form"
    >
      <Heading>I build up a newsletter to share what I learn</Heading>
      <P>Focusing on JavaScript, React and web development. No spam.</P>
      <InputWrapper>
        <Input
          type="email"
          name="email"
          id="bd-email"
          placeholder="your email"
        />
        <input type="hidden" value="1" name="embed" />
        <Button type="submit" value="Subscribe" />
      </InputWrapper>
    </form>
  </Container>
)

export default Newsletter
