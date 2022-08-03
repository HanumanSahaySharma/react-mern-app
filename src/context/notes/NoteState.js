import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
   let initialNotes = [];
   let [notes, setNotes] = useState(initialNotes);
   const [alert, setAlert] = useState(false);
   const [alertMsg, setAlertMsg] = useState("");

   // Get All Notes
   const getNotes = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/getallnotes`, {
         method: "GET",
         headers: {
            "content-type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
         },
      });
      const json = await response.json();
      setNotes(json);
   };

   // Add Note
   const addNote = async (title, description, tag) => {
      const noteInfo = {
         title,
         description,
         tag,
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/addnote`, {
         method: "POST",
         headers: {
            "content-type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
         },
         body: JSON.stringify(noteInfo),
      });
      const addedNote = await response.json();
      setNotes(notes.concat(addedNote));
      setAlert(true);
      setAlertMsg(`The ${addedNote.title} note is added now.`);
      setTimeout(() => {
         setAlert(false);
      }, 3000);
   };

   // Delete Note
   const deleteNote = async (id) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/deletenote/${id}`, {
         method: "DELETE",
         headers: {
            "content-type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
         },
      });
      console.log(response);
      const newNotes = notes.filter((note) => {
         return note._id !== id;
      });

      setNotes(newNotes);
      setAlert(true);
      setAlertMsg(`The note is deleted now.`);
      setTimeout(() => {
         setAlert(false);
      }, 3000);
   };

   // Edit/Update Note
   const updateNote = async (note) => {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/api/notes/updatenote/${note.id}`,
         {
            method: "PUT",
            headers: {
               "content-type": "application/json",
               "auth-token": localStorage.getItem("authToken"),
            },
            body: JSON.stringify(note),
         }
      );
      console.log(response);
      const newNotes = JSON.parse(JSON.stringify(notes));
      // Edit/Update the edited/updated notes
      for (let i = 0; i < newNotes.length; i++) {
         const element = notes[i];
         if (element._id === note.id) {
            newNotes[i].title = note.title;
            newNotes[i].description = note.description;
            newNotes[i].tag = note.tag;
            break;
         }
      }
      setNotes(newNotes);
      setAlert(true);
      setAlertMsg(`The ${note.title} is updated now.`);
      setTimeout(() => {
         setAlert(false);
      }, 3000);
   };

   return (
      <NoteContext.Provider
         value={{
            notes,
            getNotes,
            addNote,
            updateNote,
            deleteNote,
            alert,
            setAlert,
            alertMsg,
            setAlertMsg,
         }}
      >
         {props.children}
      </NoteContext.Provider>
   );
};

export default NoteState;
