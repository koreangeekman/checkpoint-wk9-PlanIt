import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectService } from "../services/ProjectService.js";
import BaseController from "../utils/BaseController.js";

export class ProjectController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getProjects)
      .get('/:projectId', this.getProjectById)
      // 🔽 AUTHENTICATION REQUIRED BELOW 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createProject)
      .delete('/:projectId', this.deleteProject)
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

  async createProject(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id;
      const newProject = await projectService.createProject(req.body);
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

}