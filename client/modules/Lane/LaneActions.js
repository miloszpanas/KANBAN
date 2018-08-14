import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalizr } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const EDIT_LANES = 'EDIT_LANES';
export const MOVE_BEETWEN_LANES = 'MOVE_BEETWEN_LANES';
export const PUSH_TO_LANE = 'PUSH TO LANE';
export const REMOVE_FROM_LANE = 'REMOVE FROM LANE'

// Export Actions

export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      notes: [],
      ...lane,
    },
  };
}
    
export function createLaneRequeast(lane) {
    return (dispatch) => {
        return callApi('lanes', 'post', lane).then(res => {
            dispatch(createLane(res));
        });
    };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function updateLaneRequest(lane) {
    return (dispatch) => {
        return callApi('lanes/${lane.id}', 'put', { name: lane.name, editing: lane.editing}).then(() => {
            dispatch(createLane(lane));
        });
    };
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId,
  };
}

export function deleteLaneRequest(lane) {
    return dispatch => {
        return callApi('lanes/${lane.id}', 'delete').then(() => {
            dispatch(deleteLane(laneId));
        });
    };
}

export function editLane(laneId) {
    return {
        type: EDIT_LANE,
        laneId,
    };
}

export function createLanes(lanesData) {
    return {
        type: CREATE_LANES,
        lanes: lanesData,
    };
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;

     dispatch(createLanes(normalizedLanes));
     dispatch(createNotes(notes));
    });
  };
}

export function moveBeetwenLanes(targerLaneId, noteId, sourceLaneId) {
    return {
        type: MOVE_BEETWEN_LANES,
        targetLaneId,
        noteId,
        sourceLaneId,
    };
}

export function pushToLane(targetLaneId, noteId) {
    return {
        type: PUSH_TO_LANE,
        targetLaneId,
        noteId,
    };
}

export function removeFromLane(sourceLaneId, noteId) {
    return {
        type: REMOVE_FROM_LANE,
        sourceLaneId,
        noteId,
    };
}

export function changeLaneRequest(sourceLaneId, targetLaneId, noteId, newTask) {
    return (dispatch) => {
        return callApi('notes/${noteId}', 'delete')
        .then(() => {
            callApi('notes', 'post', { note: { id: noteId, task: newTask}, laneId: targetLaneId });
        })
        .then(() => {
            dispatch(removeFromLane(
                sourceLaneId,
                noteId,
            ));
            dispatch(pushToLane(
                targetLaneId,
                noteId,
            ));
        });
    };
}