import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectService } from "../services/ProjectService.js";
import BaseController from "../utils/BaseController.js";
import { sprintService } from "../services/SprintService.js";
import { taskService } from "../services/TaskService.js";

export class ProjectController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getProjects)
      .get('/:projectId', this.getProjectById)
      .get('/:projectId/sprints', this.getSprintsByProjectId)
      .get('/:projectId/tasks', this.getTasksByProjectId)
      // 🔽 AUTHENTICATION REQUIRED BELOW 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createProject)
      .post('/:projectId/sprints', this.createSprintWithProjectId)
      .post('/:projectId/tasks', this.createTaskWithProjectId)
      .delete('/:projectId', this.deleteProject)
      .delete('/:projectId/sprints/:sprintId', this.deleteSprintWithProjectId)
      .delete('/:projectId/tasks/:taskId', this.deleteTaskWithProjectId)
  }

  async getProjects(req, res, nxt) {
    try {
      const projects = await projectService.getProjects(req.query);
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

  // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

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
      const newProject = await sprintService.createSprintWithProjectId(req.body);
      res.send(newProject)
    }
    catch (error) { nxt(error) }
  }

  async createTaskWithProjectId(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id;
      req.body.projectId = req.params.projectId;
      const newProject = await taskService.createTaskWithProjectId(req.body);
      res.send(newProject)
    }
    catch (error) { nxt(error) }
  }

  async deleteProject(req, res, nxt) {
    try {
      const newProject = await projectService.deleteProject(req.userInfo.id, req.params.projectId);
      res.send(newProject)
    }
    catch (error) { nxt(error) }
  }

  async deleteSprintWithProjectId(req, res, nxt) {
    try {
      const newProject = await sprintService.deleteSprintWithProjectId(req.userInfo.id, req.params.projectId, req.params.sprintId);
      res.send(newProject)
    }
    catch (error) { nxt(error) }
  }

  async deleteTaskWithProjectId(req, res, nxt) {
    try {
      const newProject = await taskService.deleteTaskWithProjectId(req.userInfo.id, req.params.projectId, req.params.taskId);
      res.send(newProject)
    }
    catch (error) { nxt(error) }
  }

}