import { AppState } from "../AppState.js";
import { Note } from "../models/Note.js";
import { api } from "./AxiosService.js";

class NoteService {

  async getNotes() {
    const res = await api.get('api/notes');
    AppState.notes = res.data.map(note => new Note(note));
  }

  async createNote(noteData) {
    const res = await api.post('api/notes/', noteData);
    AppState.notes.push(new Note(res.data));
  }

  async deleteNote(noteId) {
    const res = await api.delete('api/notes/' + noteId);
    AppState.notes = AppState.notes.filter(note => note.id != noteId);
  }


}

export const noteService = new NoteService();