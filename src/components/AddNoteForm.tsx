'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';

interface Props {
  contactId: number;
}

const AddNoteForm: React.FC<Props> = ({ contactId }) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const onSubmit = async (data: { note: string }) => {
    await addNote({
      note: data.note,
      contactId,
      owner: currentUser,
    });

    swal('Success', 'Your note has been added', 'success', {
      timer: 2000,
    });
    reset();
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Add Note</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Note</Form.Label>
                  <input
                    type="text"
                    {...register('note')}
                    className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.note?.message}</div>
                </Form.Group>

                {/* Hidden fields */}
                <input type="hidden" {...register('contactId')} value={contactId} />
                <input type="hidden" {...register('owner')} value={currentUser} />

                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNoteForm;
