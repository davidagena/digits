import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import StuffItemAdmin from '@/components/StuffItemAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const stuff = await prisma.stuff.findMany({});
  const users = await prisma.user.findMany({});
  const contacts = await prisma.contact.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        {/* Stuff Table */}
        <Row>
          <Col>
            <h1>List Stuff Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stuff.map((item) => (
                  <StuffItemAdmin key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Users Table */}
        <Row>
          <Col>
            <h1>List Users Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Contacts Table */}
        <Row>
          <Col>
            <h1>List Contacts Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First</th>
                  <th>Last</th>
                  <th>Address</th>
                  <th>Description</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.address}</td>
                    <td>{contact.description}</td>
                    <td>{contact.owner}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
