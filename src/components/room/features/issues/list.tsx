import Item from './item';

interface ListItemsProps {
  notes: Note[];
  handleDelete: RemoveNote;
  handleEdit: EditNote;
}

export const List: React.FC<ListItemsProps> = ({
  notes,
  handleDelete,
  handleEdit
}) => {
  return (
    <div>
      {notes &&
        notes.map((note: Note) => (
          <Item
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={note.id}
            note={note}
          />
        ))}
    </div>
  );
};
