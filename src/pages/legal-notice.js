// @flow
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import P from '../components/Paragraph'
import { H1, H2, H3 } from '../components/Heading'
import Container from '../components/Container'

export default () => (
  <Layout>
    <Helmet>
      <meta name="robots" content="noindex,nofollow" />
    </Helmet>
    <Container>
      <H1>Legal Notice</H1>
      <H2>
        Information provided according to Sec. 5 German Telemedia Act (TMG):
      </H2>
      <P>
        Lars Graubner
        <br />
        Percevalstr. 9<br />
        23564 Lübeck
      </P>
      <H2>Contact:</H2>
      <P>
        Telephone: +49 176 326 47 303
        <br />
        Email: hello@larsgraubner.com
      </P>
      <H2>
        Responsible for contents acc. to Sec. 55, para. 2 German Federal
        Broadcasting Agreement (RstV):
      </H2>
      <P>
        Lars Graubner
        <br />
        Percevalstr. 9<br />
        23564 Lübeck
      </P>
      <H2>Dispute resolution</H2>
      <P>
        We do not take part in online dispute resolutions at consumer
        arbitration boards.
      </P>
      <H3>Liability for Contents</H3>
      <P>
        As service providers, we are liable for own contents of these websites
        according to Sec. 7, paragraph 1 German Telemedia Act (TMG). However,
        according to Sec. 8 to 10 German Telemedia Act (TMG), service providers
        are not obligated to permanently monitor submitted or stored information
        or to search for evidences that indicate illegal activities.
      </P>
      <P>
        Legal obligations to removing information or to blocking the use of
        information remain unchallenged. In this case, liability is only
        possible at the time of knowledge about a specific violation of law.
        Illegal contents will be removed immediately at the time we get
        knowledge of them.
      </P>
      <H3>Liability for Links</H3>
      <P>
        Our offer includes links to external third party websites. We have no
        influence on the contents of those websites, therefore we cannot
        guarantee for those contents. Providers or administrators of linked
        websites are always responsible for their own contents.
      </P>
      <P>
        The linked websites had been checked for possible violations of law at
        the time of the establishment of the link. Illegal contents were not
        detected at the time of the linking. A permanent monitoring of the
        contents of linked websites cannot be imposed without reasonable
        indications that there has been a violation of law. Illegal links will
        be removed immediately at the time we get knowledge of them.
      </P>
      <H3>Copyright</H3>
      <P>
        Contents and compilations published on these websites by the providers
        are subject to German copyright laws. Reproduction, editing,
        distribution as well as the use of any kind outside the scope of the
        copyright law require a written permission of the author or originator.
        Downloads and copies of these websites are permitted for private use
        only.
        <br /> The commercial use of our contents without permission of the
        originator is prohibited.
      </P>
      <P>
        Copyright laws of third parties are respected as long as the contents on
        these websites do not originate from the provider. Contributions of
        third parties on this site are indicated as such. However, if you notice
        any violations of copyright law, please inform us. Such contents will be
        removed immediately.
      </P>
    </Container>
  </Layout>
)