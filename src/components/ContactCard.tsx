'use client';

import { Card } from 'react-bootstrap';
import Image from 'next/image'; // If you're using Next.js
import { Contact } from '@/lib/validationSchemas';

interface Props {
  contact: Contact;
}

const ContactCard: React.FC<Props> = ({ contact }) => {
  return (
    <Card className="h-100">
      <Card.Header className="d-flex align-items-center">
        {/* Use Next.js Image for better optimization if you're using Next.js */}
        {/* Otherwise fall back to a plain img tag */}
        {contact.image ? (
          <img
            src={contact.image}
            alt={`${contact.firstName} ${contact.lastName}`}
            width={75}
            height={75}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
          />
        ) : (
          <div style={{ width: 75, height: 75, backgroundColor: '#ccc' }} />
        )}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          {contact.firstName} {contact.lastName}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {contact.address}
        </Card.Subtitle>
        <Card.Text>{contact.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ContactCard;
