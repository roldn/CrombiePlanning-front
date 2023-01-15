// types of Issues
type AddNote = (newNote: Note) => void;

type Note = { id:string, text: string, complete: boolean }

type RemoveNote = (noteToRemove: Note) => void;

type EditNote = (noteToEdit: Note) => void;

type ToggleComplete = (selectedNote: Note) => void;

type Option = { className: string, value: string; onClick: () => void; color?: string; }
