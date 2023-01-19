import { useState, useEffect } from 'react';
import { socket } from '../../../../App';

const useNotes = () => {
  const [notes, setNotes] = useState<Array<Note>>([]);

  const addNote: AddNote = newNote => {
    socket.emit('client:newnote', newNote);
  };

  const handleDelete = (selectedNote: Note) => {
    socket.emit('client:deletenote', selectedNote);
  };

  const handleEdit = (updatedNote: Note) => {
    socket.emit('client:updatenote', updatedNote);
  };

  useEffect(() => {
    console.log('se llamo al useEffect');

    socket.on('server:newnote', newNote => {
      console.log(newNote);

      setNotes([...notes, newNote]);
    });
    socket.on('server:loadnotes', notes => setNotes(notes));
  }, [notes]);

  return { notes, addNote, handleDelete, handleEdit };
};

export default useNotes;
