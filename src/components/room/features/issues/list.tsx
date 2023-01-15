import useNotes from "./useNotes";
import Item from "./item";

export const List = (() =>  {

    const { notes } = useNotes();
    
    return (
        <div>
            {notes && notes.map((note:Note) => (
            <Item
             key={note.id}
             note={note}
             />
            ))}
        </div>
    );
}
)