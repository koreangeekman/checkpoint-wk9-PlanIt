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
      .get('', this.getProjects)
      // 🔽 AUTHENTICATION REQUIRED BELOW 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/account', this.getProjectsByAccountId)
      .get('/:projectId', this.getProjectById)
      .get('/:projectId/sprints', this.getSprintsByProjectId)
      .get('/:projectId/tasks', this.getTasksByProjectId)
      .get('/:projectId/notes', this.getNotesByProjectId)
      .post('', this.createProject)
      .put('/:projectId', this.updateProject)
      .delete('/:projectId', this.deleteProject)
  }

  // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

  async getProjects(req, res, nxt) {
    try {
      const projects = await projectService.getProjects(req.query);
      res.send(projects)
    }
    catch (error) { nxt(error) }
  }

  async getProjectsByAccountId(req, res, nxt) {
    try {
      const projects = await projectService.getProjectsByAccountId(req.userInfo.id);
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

  async updateProject(req, res, nxt) {
    try {
      const updated = await projectService.updateProject(req.userInfo.id, req.params.projectId, req.body);
      res.send(updated)
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

}