import React, { useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {mine_backend} from "../../../declarations/mine_backend"


function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      mine_backend.createNote(newNote.title,newNote.content)
      return [newNote,...prevNotes];
    });
  }

  useEffect(()=>{
    console.log("useEffect is triggered")
    fetchData();
  },[]);

  async function fetchData() {
    const notesArray =await mine_backend.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    mine_backend.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

 

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
