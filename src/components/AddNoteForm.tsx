'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { AddNoteSchema } from '@/lib/validationSchemas';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Props {
  contactId: number;
}

const AddNoteForm: React.FC<Props> = ({ contactId }) => {
  const { data: session, status } = useSession();
  const owner = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      contactId,
      owner,
    },
  });

  const onSubmit = async (data: any) => {
    await addNote(data);
    swal('Success', 'Your note has been added', 'success', { timer: 2000 });
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') redirect('/auth/signin');

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Note</Form.Label>
                  <textarea
                    {...register('note')}
                    className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.note?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('owner')} value={owner} />
                <input type="hidden" {...register('contactId')} value={contactId} />

                <Form.Group className="form-group pt-3">
                  <Row>
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning">
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