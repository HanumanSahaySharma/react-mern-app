import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
/* Bootstrap Components */
import { Card, Form, Button } from "react-bootstrap";

export default function AddNote(props) {
   const { addNote } = useContext(NoteContext);
   const [note, setNote] = useState({ title: "", description: "", tag: "" });

   const handleSubmit = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
   };
   const onChange = (event) => {
      setNote({ ...note, [event.target.name]: event.target.value });
   };
   return (
      <>
         <h2>Add Notes</h2>
         <Card bg="light" className="mb-4">
            <Card.Body>
               <Form>
                  <Form.Group className="mb-3">
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                        type="text"
                        name="title"
                        id="title"
                        value={note.title}
                        minLength="5"
                        required
                        onChange={onChange}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3">
                     <Form.Label>Description</Form.Label>
                     <Form.Control
                        type="text"
                        name="description"
                        id="description"
                        value={note.description}
                        minLength="5"
                        required
                        onChange={onChange}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3">
                     <Form.Label>Tag</Form.Label>
                     <Form.Control
                        type="text"
                        name="tag"
                        id="tag"
                        value={note.tag}
                        minLength="2"
                        required
                        onChange={onChange}
                     />
                  </Form.Group>
                  <Button
                     disabled={
                        note.title.length < 5 || note.description.length < 5 || note.tag.length < 2
                     }
                     variant="primary"
                     type="submit"
                     onClick={handleSubmit}
                  >
                     Add New Note
                  </Button>
               </Form>
            </Card.Body>
         </Card>
      </>
   );
}
