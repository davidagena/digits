'use client';

import { Card, ListGroup } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';
import { Note } from '@prisma/client';
import NoteItem from './NoteItem';

interface Props {
  contact: Contact;
  notes: Note[];
}

const ContactCardAdmin: React.FC<Props> = ({ contact, notes }) => (
  <Card className="h-100">
    <Card.Header>
      <img
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        width="75"
      />
    </Card.Header>
    <Card.Body>
      <Card.Title>
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">{contact.owner}</p>

      {/* Notes Section */}
      <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
