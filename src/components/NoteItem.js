import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
/* Bootstrap Components */
import { Card, Badge, Button } from "react-bootstrap";
/* FontAwesome Icon */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function NoteItem(props) {
   const { note, updateModal } = props;
   let { deleteNote } = useContext(NoteContext);
   return (
      <Card className="mb-3" bg="dark" text="white">
         <Card.Body>
            <Card.Title className="d-flex flex-wrap justify-content-between mb-0">
               <div>{note.title}</div>
               <div className="btn-inline">
                  <Button
                     onClick={() => updateModal(note)}
                     variant="danger"
                     size="sm"
                     className="ms-2"
                  >
                     <FontAwesomeIcon icon={faPencil} />
                  </Button>
                  <Button
                     variant="danger"
                     size="sm"
                     className="ms-2"
                     onClick={() => deleteNote(note._id)}
                  >
                     <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
               </div>
            </Card.Title>
            <Card.Text className="mb-2">{note.description}</Card.Text>
            <Badge bg="secondary">{note.tag}</Badge>
         </Card.Body>
      </Card>
   );
}
