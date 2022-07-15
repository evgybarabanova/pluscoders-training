import React, { useEffect, useState } from "react"
import "./Home.css"
import {
  retrieveUser,
  retrieveNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../logic"

export default function Home() {
  const [user, setUser] = useState()
  const [notes, setNotes] = useState([])

  useEffect(() => {
    try {
      retrieveUser(sessionStorage.token)
        .then((user) => setUser(user))
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }, [])

  const handleCreateNote = (event) => {
    event.preventDefault()

    try {
      const text = event.target.text.value

      createNote(sessionStorage.token, text)
        .then(() => retrieveNotes(sessionStorage.token))
        .then((notes) => setNotes(notes))
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    try {
      retrieveNotes(sessionStorage.token)
        .then((notes) => {
          setNotes(notes)
        })
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }, [])

  const handleDeleteNote = (noteId) => {
    try {
      deleteNote(sessionStorage.token, noteId)
        .then(() => retrieveNotes(sessionStorage.token))
        .then((notes) => setNotes(notes))
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }

  const handleUpdateNote = (noteId, text) => {
    try {
      updateNote(sessionStorage.token, noteId, text)
        .then(() => retrieveNotes(sessionStorage.token))
        .then((notes) => setNotes(notes))
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <div>Hello, {user?.name}!</div>

      <h2>Note list</h2>
      <ul className="noteText">
        {notes.map((note) => (
          <div className="textDate">
            <div> {note.text}</div>
            <div>{note.date}</div>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>

            <form
              onSubmit={(event) => {
                event.preventDefault()

                const text = event.target.text.value

                handleUpdateNote(note.id, text)
              }}
            >
              <textarea
                name="text"
                placeholder="Edit me"
                defaultValue={note.text}
              ></textarea>
              <button type="submit">Update</button>
            </form>
          </div>
        ))}
      </ul>

      <h2>New note</h2>

      <form onSubmit={handleCreateNote}>
        <input name="text" type="text" placeholder="Enter your note" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

// TODO understand "short-circuit evaluation"
