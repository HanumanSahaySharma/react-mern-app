const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const mongoose = require("mongoose");
const { application } = require("express");
const { Schema } = mongoose;
const { body, validationResult } = require("express-validator");

/* ROUTE 1 : Get All Notes using GET => "/api/notes/getallnotes" -> Login required */
/*--------------------------------------------------------------------------------*/
router.get("/getallnotes", fetchUser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes);
   } catch (error) {
      res.status(500).send({ error: "Internal server error!" });
   }
});

/* ROUTE 2 : Add Note using POST => "/api/notes/addnote" -> Login required */
/*------------------------------------------------------------------------*/
router.post(
   "/addnote",
   fetchUser,
   //Set basic error messages
   [
      body("title", "Title should be minium 3 charectors.").isLength({ min: 3 }),
      body("description", "Description must be atleast 5 charectors.").isLength({ min: 5 }),
   ],
   async (req, res) => {
      const { title, description, tag } = req.body;
      try {
         // If there are errors, then send a Bad request and errors
         let errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
         }
         // Create new note with title, description and tag with current user id
         const note = new Note({
            title,
            description,
            tag,
            user: req.user.id,
         });
         const savedNote = await note.save();
         res.json(savedNote);
      } catch (error) {
         res.status(500).send({ error: "Internal server error!" });
      }
   }
);

/* ROUTE 3 : Update Note using PUT => "/api/notes/updatenote" -> Login required */
/*------------------------------------------------------------------------------*/
router.put("/updatenote/:id", fetchUser, async (req, res) => {
   const { title, description, tag } = req.body;
   try {
      // created a black note oject
      const newNote = {};
      if (title) {
         newNote.title = title;
      }
      if (description) {
         newNote.description = description;
      }
      if (tag) {
         newNote.tag = tag;
      }
      // Get the id of note
      let note = await Note.findById(req.params.id);
      if (!note) {
         return res.status(404).send("Not Found!");
      }
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Access Denied: Not Allowed");
      }
      // Update the note with id
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.json(note);
   } catch (error) {
      res.status(500).send("Internal server error!");
   }
});

/* ROUTE 4 : Delete Note using DELETE => "/api/notes/deletenote" -> Login required */
/*------------------------------------------------------------------------------*/
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
   try {
      // Find note with id
      let note = await Note.findById(req.params.id);
      if (!note) {
         return res.status(404).send("Not Found!");
      }
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Access Denied: Not Allowed");
      }
      // Delete note with id
      if (note) {
         await Note.findByIdAndDelete(req.params.id);
         return res.status(200).send("Note successfully deleted");
      }
   } catch (error) {
      res.status(500).send("Internal server error!");
   }
});

module.exports = router;
