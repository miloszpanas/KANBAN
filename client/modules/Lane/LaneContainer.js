import { connect } from 'react-redux';
import Lane from './Lane';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import { createLaneRequeast, editLane, deleteLaneRequest, updateLaneRequest, moveBeetwenLanes, removeFromLane, pushToLane, changeLaneRequest} from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const noteTarget = {
    drop(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const { id: noteId, laneId: sourceLaneId, task: task } = sourceProps;
        
        if (targetProps.lane.id !== sourceLaneId) {
            targetProps.changeLanesRequest(
                targetProps.lane.id,
                noteId,
                sourceLaneId,
                task
            );
        }
    },
};

const mapStateToProps = (state, ownProps) => ({
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
    editLane,
    deleteLane: deleteLaneRequest,
    updateLane:updateLaneRequest,
    addNote: createNoteRequest,
    createLane: createLaneRequeast,
    moveBeetwenLanes,
    removeFromLane,
    pushToLane,
    changeLaneRequest,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
        connectDropTarget: dragConnect.dropTarget()
    }))
)(Lane);
