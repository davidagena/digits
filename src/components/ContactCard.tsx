'use client';

import { Card, ListGroup } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { Contact } from '@/lib/validationSchemas';
import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';

interface Note {
  id: number;
  note: string;
  createdAt: string | Date;
}

interface Props {
  contact: Contact & { id: number };
  notes: Note[];
}

const ContactCard: React.FC<Props> = ({ contact, notes }) => {
  return (
    <Card className="h-100">
      <Card.Header className="text-center">
        <Image
          src={contact.image}
          alt={`${contact.firstName} ${contact.lastName}`}
          width={75}
          height={75}
          className="rounded-circle"
          style={{ objectFit: 'cover' }}
        />
      </Card.Header>

      <Card.Body>
        <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
        <Card.Text>{contact.description}</Card.Text>

        {/* Notes Section */}
        <ListGroup variant="flush" className="mb-3">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ListGroup>

        {/* Add Note Form */}
        <AddNoteForm contactId={contact.id} />
      </Card.Body>

      <Card.Footer className="text-center">
        <Link href={`/edit/${contact.id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  );
};

export default ContactCard;
