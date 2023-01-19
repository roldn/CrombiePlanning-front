import Button from '@mui/material/Button/Button';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { socket } from '../../../../App';
import './styles.css';
import useNotes from './useNotes';

export const Form = () => {
  const [newNote, setNewNote] = useState<string>('');
  const { addNote } = useNotes();

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addNote(newNote);
    setNewNote('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  useEffect(() => {
    socket.on('server:selectednote', selectedNote => setNewNote(selectedNote));
  }, []);

  return (
    <form>
      <input
        type='text'
        value={newNote}
        placeholder='Write here your issues'
        name='issue'
        onChange={handleChange}
      />
      <Button
        type='submit'
        variant='contained'
        onClick={handleSubmit}>
        Send
      </Button>
    </form>
  );
};
export default Form;
