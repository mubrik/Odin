import React from 'react';
import {Container, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm  } from "formik";

const NoteForm = (props) => {
    const newNote = props.newNote;

    const initialValues = {
        title: typeof props.noteData === "undefined" ? '' : props.noteData['title'],
        text: typeof props.noteData === "undefined" ? '' : props.noteData['text'] 
    };

    let onSubmit;
    let buttonText;
    if (newNote === undefined) {onSubmit = props.onUpdateNoteSubmit; buttonText = 'Update Card'}
    else {onSubmit = props.onNewNoteSubmit; buttonText = 'New Card'}

    return (
        <Formik {...{ initialValues, onSubmit }}>
        {() => (
            <>
            <Container >
                <FormikForm className="baseForm" noValidate>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Field
                        type="text"
                        id="noteTitle"
                        className="form-control"
                        name="title"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Text</Form.Label>
                        <Field as="textarea"
                        id="noteText"
                        className="form-control"
                        name="text"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {buttonText}
                    </Button>
                </FormikForm>
            </Container>
            </>
        )}
        </Formik>
    );
}

export default NoteForm;