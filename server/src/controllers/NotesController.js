import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      // .get('', this.getNotes)
      // 🔽 AUTHENTICATION REQUIRED BELOW 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
    // .put('/:noteId', this.updateNote)
  }

  // async getNotes(req, res, nxt) {
  //   try {
  //     const notes = await notesService.getNotes(req.query);
  //     res.send(notes);
  //   }
  //   catch (error) { nxt(error) }
  // }

  // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

  async createNote(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id;
      const newNote = await notesService.createNote(req.body);
      res.send(newNote);
    }
    catch (error) { nxt(error) }
  }

  async deleteNote(req, res, nxt) {
    try {
      const deleted = await notesService.deleteNote(req.userInfo.id, req.params.noteId);
      res.send(deleted);
    }
    catch (error) { nxt(error) }
  }

  // async updateNote(req, res, nxt) {
  //   try {
  //     const updatedNote = await notesService.updateNote(req.userInfo.id, req.params.noteId, req.body);
  //     res.send(updatedNote);
  //   }
  //   catch (error) { nxt(error) }
  // }

}