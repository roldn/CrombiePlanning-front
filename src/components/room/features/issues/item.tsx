import { FC, useState } from "react";
import useNotes from "./useNotes";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ClearIcon from '@mui/icons-material/Clear';
import Button from "@mui/material/Button";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ListItemsProps { note: Note; }

const Item: FC<ListItemsProps> = ({ note }) => {

    const [isEditOn, setIsEditOn] = useState<boolean>(false)
    const [updatedNote, setUpdatedNote] = useState<Note>(note)
    const [isNoteMenuOpen, setisNoteMenuOpen] = useState<boolean>(false)

    const { handleEdit, handleDelete } = useNotes()

    const onDelete = () => { handleDelete(note) }
    const onEdit = () => { setIsEditOn(true) }

    const onNoteUpdate = (event: any) => {
        const tempHolder = event.target.value
        const newObject: Note = { id: note.id, text: tempHolder, complete: note.complete }
        setUpdatedNote(newObject)
    }

    const submitEdit = () => {
        handleEdit(updatedNote)
        setIsEditOn(!isEditOn)
    }

    return (
        <div className="card card-body rounded-0 mb-2 animate__animated animate__fadeInUp">
            <div className="col d-flex justify-content-between">
                <div>
                    <label>
                        <h6>
                            {isEditOn ?
                                <div>
                                    <textarea value={updatedNote.text} id={updatedNote.id} onChange={(event) => onNoteUpdate(event)} />
                                    <button type="submit" onClick={submitEdit}>submit</button>
                                </div>
                                : note.text}
                        </h6>
                    </label>
                </div>
                <div className="btn">
                    {isNoteMenuOpen ? 
                    <><Button onClick={onEdit} color="info"><DriveFileRenameOutlineIcon /></Button>
                    <Button onClick={onDelete} color="warning"><ClearIcon /></Button>
                    <Button className="dropdown" onClick={() => { setisNoteMenuOpen(false); } }><MoreVertIcon /></Button></> 
                    : <Button  className="dropdown"  onClick={() => {setisNoteMenuOpen(!isNoteMenuOpen)}}><MoreVertIcon/></Button>
                    }
                </div>
            </div>
        </div>
    )
}
export default Item