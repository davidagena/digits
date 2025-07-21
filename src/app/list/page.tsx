import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ContactCard from '@/components/ContactCard';
import ContactCardAdmin from '@/components/ContactCardAdmin'; // Optional if ADMIN is supported
import { Role } from '@prisma/client';

/** Render a list of contacts for the logged in user. */
const ListPage = async () => {
  // Protect the page
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const owner = session?.user?.email || '';

  // Get user role (optional: only needed if you want to support ADMIN views)
  const user = await prisma.user.findUnique({
    where: { email: owner },
  });

  // Get all contacts owned by this user
  const contacts = await prisma.contact.findMany({
    where: { owner },
  });

  // Get all notes owned by this user
  const notes = await prisma.note.findMany({
    where: { owner },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>List Contacts</h1>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => {
            const contactNotes = notes.filter(note => note.contactId === contact.id);
            return (
              <Col key={`Contact-${contact.id}`}>
                {user?.role === Role.ADMIN ? (
                  <ContactCardAdmin contact={contact} notes={contactNotes} />
                ) : (
                  <ContactCard contact={contact} notes={contactNotes} />
                )}
              </Col>
            );
          })}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;