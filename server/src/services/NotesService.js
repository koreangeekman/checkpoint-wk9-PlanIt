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

  async createNote(noteData) {
    const newNote = await dbContext.Notes.create(noteData);
    return newNote
  }

  async deleteProject(creatorId, _id) {
    const project = await dbContext.Notes.findOne({ creatorId, _id });
    if (!project) { throw new BadRequest('Cannot find the specified project with your ID') }
    await project.delete();
    return project
  }
}

export const notesService = new NotesService();