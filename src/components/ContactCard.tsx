'use client';

import { Card } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { Contact } from '@/lib/validationSchemas';

interface Props {
  contact: Contact & { id: string };
}

const ContactCard: React.FC<Props> = ({ contact }) => {
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
      </Card.Body>

      {/* Add Edit link */}
      <Card.Footer className="text-center">
        <Link href={`/edit/${contact.id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  );
};

export default ContactCard;
