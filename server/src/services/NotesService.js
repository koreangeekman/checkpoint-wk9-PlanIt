import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class NotesService {

  async getNotesByProjectId(projectId) {
    const notes = await dbContext.Notes.find({ projectId })
      .populate('creator', 'name email pictures')
      .populate('project')
      .populate('task')
    return notes
  }

  async createTaskWithProjectId(noteData) {
    const newNote = await dbContext.Notes.create(noteData);
    await newNote.populate('creator', 'name email picture');
    await newNote.populate('project');
    await newNote.populate('task');
    return newNote
  }

  async deleteNoteWithProjectId(creatorId, projectId, _id) {
    const note = await dbContext.Notes.findOne({ creatorId, projectId, _id });
    if (!note) { throw new BadRequest('Cannot find the specified project with your ID') }
    await note.delete();
    return note
  }
}

export const notesService = new NotesService();