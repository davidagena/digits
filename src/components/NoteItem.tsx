'use client';

import { ListGroup } from 'react-bootstrap';

interface Note {
  note: string;
  createdAt: string | Date;
}

interface Props {
  note: Note;
}

const NoteItem: React.FC<Props> = ({ note }) => {
  return (
    <ListGroup.Item>
      <p className="fw-lighter">
        {new Date(note.createdAt).toLocaleDateString('en-US')}
      </p>
      <p>{note.note}</p>
    </ListGroup.Item>
  );
};

export default NoteItem;
