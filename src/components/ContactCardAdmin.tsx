'use client';

import { Card } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

interface Props {
  contact: Contact;
}

const ContactCardAdmin: React.FC<Props> = ({ contact }) => {
  return (
    <Card className="h-100">
      <Card.Header>
        <img
          src={contact.image}
          alt={`${contact.firstName} ${contact.lastName}`}
          width="75"
        />
      </Card.Header>
      <Card.Body>
        <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
        <Card.Text>{contact.description}</Card.Text>
        <p className="blockquote-footer">{contact.owner}</p>
      </Card.Body>
    </Card>
  );
};

export default ContactCardAdmin;
