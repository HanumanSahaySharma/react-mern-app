import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
/* NoteContext */
import NoteContext from "../context/notes/NoteContext";

/* Add Note and Note Item Component */
import AddNote from "../components/AddNote";
import NoteItem from "../components/NoteItem";

/* FontAwesome Icon */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-regular-svg-icons";

/* Bootstrap Components */
import { Container, Row, Col, Modal, Form, Button, Alert } from "react-bootstrap";

export default function Notes() {
   const navigate = useNavigate();
   const { notes, getNotes, alert, updateNote, alertMsg } = useContext(NoteContext);
   const [showModal, setShowModal] = useState(false);
   const [note, setNote] = useState({ title: "", description: "", tag: "" });

   const ref = useRef(null);

   const updateModal = (currentNote) => {
      ref.current.click();
      setNote({
         id: currentNote._id,
         title: currentNote.title,
         description: currentNote.description,
         tag: currentNote.tag,
      });
   };

   const onChange = (event) => {
      setNote({ ...note, [event.target.name]: event.target.value });
   };

   const handleUpdate = (note) => {
      updateNote(note);
      setShowModal(false);
   };

   useEffect(() => {
      if (localStorage.getItem("authToken")) {
         getNotes();
      } else {
         navigate("/login");
      }
      // eslint-disable-next-line
   }, []);
   return (
      <>
         <Alert show={alert} variant="warning" className="d-flex align-items-center rounded-0">
            <FontAwesomeIcon icon={faStickyNote} className="me-2" />
            {alertMsg}
         </Alert>
         <Container className="my-5">
            <AddNote />
            <Button
               ref={ref}
               variant="primary"
               onClick={() => setShowModal(true)}
               className="d-none"
            >
               Open Modal
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
               <Modal.Header closeButton>
                  <Modal.Title>Edit Note</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form>
                     <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                           name="title"
                           id="title"
                           value={note.title}
                           minLength="5"
                           required
                           onChange={onChange}
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                           name="description"
                           id="description"
                           value={note.description}
                           minLength="5"
                           required
                           onChange={onChange}
                        ></Form.Control>
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Tag</Form.Label>
                        <Form.Control
                           name="tag"
                           id="tag"
                           value={note.tag}
                           minLength="2"
                           required
                           onChange={onChange}
                        ></Form.Control>
                     </Form.Group>
                  </Form>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                     Close
                  </Button>
                  <Button
                     disabled={
                        note.title.length < 5 || note.description.length < 5 || note.tag.length < 2
                     }
                     variant="primary"
                     onClick={() => handleUpdate(note)}
                  >
                     Update Note
                  </Button>
               </Modal.Footer>
            </Modal>
            <h2>All Notes</h2>
            <Row>
               {notes.map((note, index) => {
                  return (
                     <Col lg="4" md="6" key={index}>
                        <NoteItem note={note} updateModal={updateModal}></NoteItem>
                     </Col>
                  );
               })}
            </Row>
         </Container>
      </>
   );
}
