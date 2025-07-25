import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ContactCard from '@/components/ContactCard';

const contacts = [
  {
    firstName: 'Philip',
    lastName: 'Johnson',
    address: 'POST 307, University of Hawaii',
    image: 'https://github.com/philipmjohnson.png',
    description:
      // eslint-disable-next-line max-len
      'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
  },
  {
    firstName: 'Henri',
    lastName: 'Casanova',
    address: 'POST 307, University of Hawaii',
    image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
    description:
      // eslint-disable-next-line max-len
      'I am originally from France. I maintain a list of reports from my surf sessions. I have proof that I ran the Hana relay with an actual Team.',
  },
  {
    firstName: 'Kim',
    lastName: 'Binsted',
    address: 'POST 307, University of Hawaii',
    image: 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg',
    description:
      // eslint-disable-next-line max-len
      'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as "What do you call a Martian who drinks beer? An ale-ien!".',
  },
];

/** Render a list of hardcoded contacts */
const ListPage = async () => {
  // Protect the page
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">List Contacts</h1>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact, index) => (
            <Col key={`Contact-${index}`}>
              <ContactCard contact={contact} notes={[]} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
