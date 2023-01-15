import { useState, useEffect } from 'react';
import { socket } from '../../../../App';

const useNotes = (): any => {

    const [notes, setNotes] = useState<Array<Note>>([])

    const addNote: AddNote = newNote => { socket.emit('client:newnote', newNote); }

    const handleDelete: RemoveNote = (selectedNote => { socket.emit('client:deletenote', selectedNote) })

    const handleEdit: EditNote = (updatedNote => { socket.emit('client:updatenote', updatedNote); })

    useEffect(() => {
        socket.on('server:newnote', newNote => setNotes([...notes, newNote]))
        socket.on('server:loadnotes', notes => setNotes(notes))
    }, [])

    return ({ notes, addNote, handleDelete, handleEdit })
}

export default useNotes
