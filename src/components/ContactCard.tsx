'use client';

import { Card, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { Contact } from '@/lib/validationSchemas';
import { Note } from '@prisma/client';
import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';

interface Props {
  contact: Contact;
  notes: Note[];
}

const ContactCard: React.FC<Props> = ({ contact, notes }) => (
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

      {/* Notes Section */}
      <ListGroup variant="flush" className="mb-3">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>

      {/* Add Note Form with styled header */}
      <Card>
        <Card.Header className="bg-light text-center fw-semibold">
          Add Timestamped Note
        </Card.Header>
        <Card.Body className="p-2">
          <AddNoteForm contactId={contact.id} />
        </Card.Body>
      </Card>
    </Card.Body>
    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
