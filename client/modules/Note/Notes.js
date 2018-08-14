import React, { PropTypes } from 'react';
import Note from './Note';
import Edit from '../../components/Edit.js';
import styles from './Note.css';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote, moveWithinLane }) => {
  return (<ul>{notes.map((note) =>
    <Note
      id={note.id}
      key={note.id}
      editing={note.editing}
      laneId={laneId}
      task={note.task}
      moveWithinLane={moveWithinLane}
      _id={note._id}
    >
      <Edit
        editing={note.editing}
        value={note.task}
        onValueClick={() => editNote(note.id)}
        onUpdate={(task) => updateNote({
          ...note,
          task,
          editing: false,
        }
        )}
        onDelete={() => deleteNote(note.id, laneId)}
      />
    </Note>
)})</ul>);
};

Notes.propTypes = {
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
};

export default Notes;
