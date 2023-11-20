import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectService } from "../services/ProjectService.js";
import BaseController from "../utils/BaseController.js";
import { sprintService } from "../services/SprintService.js";
import { taskService } from "../services/TaskService.js";
import { notesService } from "../services/NotesService.js";

export class ProjectController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      // 🔽 AUTHENTICATION REQUIRED BELOW 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getProjectsByAccountId)
      .get('/:projectId', this.getProjectById)
      .get('/:projectId/sprints', this.getSprintsByProjectId)
      .get('/:projectId/tasks', this.getTasksByProjectId)
      .get('/:projectId/notes', this.getNotesByProjectId)
      .post('', this.createProject)
      .post('/:projectId/sprints', this.createSprintWithProjectId)
      .post('/:projectId/tasks', this.createTaskWithProjectId)
      .post('/:projectId/notes', this.createNoteWithProjectId)
      .delete('/:projectId', this.deleteProject)
      .delete('/:projectId/sprints/:sprintId', this.deleteSprintWithProjectId)
      .delete('/:projectId/tasks/:taskId', this.deleteTaskWithProjectId)
      .delete('/:projectId/notes/:noteId', this.deleteNoteWithProjectId)
      .put('/:projectId/tasks/:taskId', this.updateTaskWithProjectId)
  }

  // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

  async getProjectsByAccountId(req, res, nxt) {
    try {
      const projects = await projectService.getProjectsByAccountId(req.query);
      res.send(projects)
    }
    catch (error) { nxt(error) }
  }

  async getProjectById(req, res, nxt) {
    try {
      const project = await projectService.getProjectById(req.params.projectId);
      res.send(project)
    }
    catch (error) { nxt(error) }
  }

  async getSprintsByProjectId(req, res, nxt) {
    try {
      const sprints = await sprintService.getSprintsByProjectId(req.params.projectId);
      res.send(sprints)
    }
    catch (error) { nxt(error) }
  }

  async getTasksByProjectId(req, res, nxt) {
    try {
      const tasks = await taskService.getTasksByProjectId(req.params.projectId);
      res.send(tasks)
    }
    catch (error) { nxt(error) }
  }

  async getNotesByProjectId(req, res, nxt) {
    try {
      const tasks = await notesService.getNotesByProjectId(req.params.projectId);
      res.send(tasks)
    }
    catch (error) { nxt(error) }
  }

  async createProject(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id;
      const newProject = await projectService.createProject(req.body);
      res.send(newProject)
    }
    catch (error) { nxt(error) }
  }

  async createSprintWithProjectId(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id;
      req.body.projectId = req.params.projectId;
      const newSprint = await sprintService.createSprintWithProjectId(req.body);
      res.send(newSprint)
    }
    catch (error) { nxt(error) }
  }

  async createTaskWithProjectId(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id;
      req.body.projectId = req.params.projectId;
      const newTask = await taskService.createTaskWithProjectId(req.body);
      res.send(newTask)
    }
    catch (error) { nxt(error) }
  }

  async createNoteWithProjectId(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id;
      req.body.projectId = req.params.projectId;
      const newTask = await notesService.createTaskWithProjectId(req.body);
      res.send(newTask)
    }
    catch (error) { nxt(error) }
  }

  async deleteProject(req, res, nxt) {
    try {
      const deleted = await projectService.deleteProject(req.userInfo.id, req.params.projectId);
      res.send(deleted)
    }
    catch (error) { nxt(error) }
  }

  async deleteSprintWithProjectId(req, res, nxt) {
    try {
      const deleted = await sprintService.deleteSprintWithProjectId(req.userInfo.id, req.params.projectId, req.params.sprintId);
      res.send(deleted)
    }
    catch (error) { nxt(error) }
  }

  async deleteTaskWithProjectId(req, res, nxt) {
    try {
      const deleted = await taskService.deleteTaskWithProjectId(req.userInfo.id, req.params.projectId, req.params.taskId);
      res.send(deleted)
    }
    catch (error) { nxt(error) }
  }

  async deleteNoteWithProjectId(req, res, nxt) {
    try {
      const deleted = await notesService.deleteNoteWithProjectId(req.userInfo.id, req.params.projectId, req.params.noteId);
      res.send(deleted)
    }
    catch (error) { nxt(error) }
  }

  async updateTaskWithProjectId(req, res, nxt) {
    try {
      const updatedTask = await taskService.updateTaskWithProjectId(req.userInfo.id, req.params.projectId, req.params.taskId, req.body);
      res.send(updatedTask)
    }
    catch (error) { nxt(error) }
  }

}