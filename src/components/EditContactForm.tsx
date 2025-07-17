'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Contact, EditContactSchema } from '@/lib/validationSchemas';
import { editContact } from '@/lib/dbActions';

const EditContactForm = ({ contact }: { contact: Contact & { id: string } }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(EditContactSchema),
  });

  const onSubmit = async (data: Contact) => {
    await editContact({ ...data, id: contact.id });
    swal('Success', 'Contact updated successfully', 'success', {
      timer: 2000,
    });
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Contact</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" value={contact.id} {...register('id')} />

                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <input
                    type="text"
                    defaultValue={contact.firstName}
                    {...register('firstName')}
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <input
                    type="text"
                    defaultValue={contact.lastName}
                    {...register('lastName')}
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.lastName?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <input
                    type="text"
                    defaultValue={contact.address}
                    {...register('address')}
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.address?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Image URL</Form.Label>
                  <input
                    type="text"
                    defaultValue={contact.image}
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    type="text"
                    defaultValue={contact.description}
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

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

export default EditContactForm;
