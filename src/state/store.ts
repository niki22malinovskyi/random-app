import { createStore } from 'redux';
import { reducerPlayer } from './reduce';

export const store = createStore(reducerPlayer);