// @flow
import React from 'react'
import Helmet from 'react-helmet'
import idx from 'idx'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Container from '../components/Container'
import { H1, H2, H3 } from '../components/Heading'
import P from '../components/Paragraph'
import { Ul, Li } from '../components/List'
import Link from '../components/Link'

type Props = {
  data: Object
}

export default ({ data }: Props) => {
  const author = idx(data, _ => _.site.siteMetadata.author) || ''

  return (
    <Layout>
      <Helmet>
        <title>Privacy - {author}</title>
        <meta name="robots" content="index,nofollow" />
      </Helmet>
      <Container>
        <H1>Privacy Policy</H1>
        <H2>1. An overview of data protection</H2>
        <H3>General</H3>
        <P>
          The following gives a simple overview of what happens to your personal
          information when you visit our website. Personal information is any
          data with which you could be personally identified. Detailed
          information on the subject of data protection can be found in our
          privacy policy found below.
        </P>
        <H3>Data collection on our website</H3>
        <P>
          <strong>
            Who is responsible for the data collection on this website?
          </strong>
        </P>
        <P>
          The data collected on this website are processed by the website
          operator. The operator
          {"'"}s contact details can be found in the website
          {"'"}s required legal notice.
        </P>
        <P>
          <strong>How do we collect your data?</strong>
        </P>
        <P>
          Some data are collected when you provide it to us. This could, for
          example, be data you enter on a contact form.
        </P>
        <P>
          Other data are collected automatically by our IT systems when you
          visit the website. These data are primarily technical data such as the
          browser and operating system you are using or when you accessed the
          page. These data are collected automatically as soon as you enter our
          website.
        </P>
        <P>
          <strong>What do we use your data for?</strong>
        </P>
        <P>
          Part of the data is collected to ensure the proper functioning of the
          website. Other data can be used to analyze how visitors use the site.
        </P>
        <P>
          <strong>What rights do you have regarding your data?</strong>
        </P>
        <P>
          You always have the right to request information about your stored
          data, its origin, its recipients, and the purpose of its collection at
          no charge. You also have the right to request that it be corrected,
          blocked, or deleted. You can contact us at any time using the address
          given in the legal notice if you have further questions about the
          issue of privacy and data protection. You may also, of course, file a
          complaint with the competent regulatory authorities.
        </P>
        <H3>Analytics and third-party tools</H3>
        <P>
          When visiting our website, statistical analyses may be made of your
          surfing behavior. This happens primarily using cookies and analytics.
          The analysis of your surfing behavior is usually anonymous, i.e. we
          will not be able to identify you from this data. You can object to
          this analysis or prevent it by not using certain tools. Detailed
          information can be found in the following privacy policy.
        </P>
        <P>
          You can object to this analysis. We will inform you below about how to
          exercise your options in this regard.
        </P>
        <H2>2. General information and mandatory information</H2>
        <H3>Data protection</H3>
        <P>
          The operators of this website take the protection of your personal
          data very seriously. We treat your personal data as confidential and
          in accordance with the statutory data protection regulations and this
          privacy policy.
        </P>
        <P>
          If you use this website, various pieces of personal data will be
          collected. Personal information is any data with which you could be
          personally identified. This privacy policy explains what information
          we collect and what we use it for. It also explains how and for what
          purpose this happens.
        </P>
        <P>
          Please note that data transmitted via the internet (e.g. via email
          communication) may be subject to security breaches. Complete
          protection of your data from third-party access is not possible.
        </P>
        <H3>Notice concerning the party responsible for this website</H3>
        <P>The party responsible for processing data on this website is:</P>
        <P>
          Lars Graubner
          <br />
          Süderstr. 8<br />
          23554 Lübeck
        </P>
        <P>
          Telephone: +4917632647303
          <br />
          Email: hello@larsgraubner.com
        </P>
        <P>
          The responsible party is the natural or legal person who alone or
          jointly with others decides on the purposes and means of processing
          personal data (names, email addresses, etc.).
        </P>
        <H3>Revocation of your consent to the processing of your data</H3>
        <P>
          Many data processing operations are only possible with your express
          consent. You may revoke your consent at any time with future effect.
          An informal email making this request is sufficient. The data
          processed before we receive your request may still be legally
          processed.
        </P>
        <H3>Right to data portability</H3>
        <P>
          You have the right to have data which we process based on your consent
          or in fulfillment of a contract automatically delivered to yourself or
          to a third party in a standard, machine-readable format. If you
          require the direct transfer of data to another responsible party, this
          will only be done to the extent technically feasible.
        </P>
        <H3>SSL or TLS encryption</H3>
        <P>
          This site uses SSL or TLS encryption for security reasons and for the
          protection of the transmission of confidential content, such as the
          inquiries you send to us as the site operator. You can recognize an
          encrypted connection in your browser
          {"'"}s address line when it changes from {'"'}
          http://
          {'"'} to {'"'}
          https://
          {'"'} and the lock icon is displayed in your browser
          {"'"}s address bar.
        </P>
        <P>
          If SSL or TLS encryption is activated, the data you transfer to us
          cannot be read by third parties.
        </P>
        <H3>Information, blocking, deletion</H3>
        <P>
          As permitted by law, you have the right to be provided at any time
          with information free of charge about any of your personal data that
          is stored as well as its origin, the recipient and the purpose for
          which it has been processed. You also have the right to have this data
          corrected, blocked or deleted. You can contact us at any time using
          the address given in our legal notice if you have further questions on
          the topic of personal data.
        </P>
        <H2>3. Data collection on our website</H2>
        <H3>Cookies</H3>
        <P>
          Some of our web pages use cookies. Cookies do not harm your computer
          and do not contain any viruses. Cookies help make our website more
          user-friendly, efficient, and secure. Cookies are small text files
          that are stored on your computer and saved by your browser.
        </P>
        <P>
          Most of the cookies we use are so-called {'"'}
          session cookies.
          {'"'} They are automatically deleted after your visit. Other cookies
          remain in your device
          {"'"}s memory until you delete them. These cookies make it possible to
          recognize your browser when you next visit the site.
        </P>
        <P>
          You can configure your browser to inform you about the use of cookies
          so that you can decide on a case-by-case basis whether to accept or
          reject a cookie. Alternatively, your browser can be configured to
          automatically accept cookies under certain conditions or to always
          reject them, or to automatically delete cookies when closing your
          browser. Disabling cookies may limit the functionality of this
          website.
        </P>
        <P>
          Cookies which are necessary to allow electronic communications or to
          provide certain functions you wish to use (such as the shopping cart)
          are stored pursuant to Art. 6 paragraph 1, letter f of DSGVO. The
          website operator has a legitimate interest in the storage of cookies
          to ensure an optimized service provided free of technical errors. If
          other cookies (such as those used to analyze your surfing behavior)
          are also stored, they will be treated separately in this privacy
          policy.
        </P>
        <H3>Server log files</H3>
        <P>
          The website provider automatically collects and stores information
          that your browser automatically transmits to us in {'"'}
          server log files
          {'"'}. These are:
        </P>
        <Ul>
          <Li>Browser type and browser version</Li>
          <Li>Operating system used</Li>
          <Li>Referrer URL</Li>
          <Li>Host name of the accessing computer</Li>
          <Li>Time of the server request</Li>
          <Li>IP address</Li>
        </Ul>
        <P>These data will not be combined with data from other sources.</P>
        <P>
          The basis for data processing is Art. 6 (1) (f) DSGVO, which allows
          the processing of data to fulfill a contract or for measures
          preliminary to a contract.
        </P>
        <H2>4. Analytics and advertising</H2>
        <H3>Google Analytics</H3>
        <P>
          Google Analytics is a web analytics service offered by Google that
          tracks and reports website traffic. Google uses the data collected to
          track and monitor the use of our Service. This data is shared with
          other Google services. Google may use the collected data to
          contextualize and personalize the ads of its own advertising network.
        </P>
        <P>
          You can opt-out of having made your activity on the Service available
          to Google Analytics by installing the Google Analytics opt-out browser
          add-on. The add-on prevents the Google Analytics JavaScript (ga.js,
          analytics.js, and dc.js) from sharing information with Google
          Analytics about visits activity.
        </P>
        <P>
          For more information on the privacy practices of Google, please visit
          the Google Privacy & Terms web page:
          <Link to="https://policies.google.com/privacy?hl=en">
            https://policies.google.com/privacy?hl=en
          </Link>
        </P>
        <H2>5. Newsletter</H2>
        <H3>Newsletter data</H3>
        <P>
          If you would like to receive our newsletter, we require a valid email
          address as well as information that allows us to verify that you are
          the owner of the specified email address and that you agree to receive
          this newsletter. No additional data is collected or is only collected
          on a voluntary basis. We only use this data to send the requested
          information and do not pass it on to third parties.
        </P>
        <P>
          We will, therefore, process any data you enter onto the contact form
          only with your consent per Art. 6 (1) (a) DSGVO. You can revoke
          consent to the storage of your data and email address as well as their
          use for sending the newsletter at any time, e.g. through the {'"'}
          unsubscribe
          {'"'} link in the newsletter. The data processed before we receive
          your request may still be legally processed.
        </P>
        <P>
          The data provided when registering for the newsletter will be used to
          distribute the newsletter until you cancel your subscription when said
          data will be deleted. Data we have stored for other purposes (e.g.
          email addresses for the members area) remain unaffected.
        </P>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
      }
    }
  }
`
