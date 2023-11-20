import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectService } from "../services/ProjectService.js";
import BaseController from "../utils/BaseController.js";
import { sprintService } from "../services/SprintService.js";
import { taskService } from "../services/TaskService.js";
import { notesService } from "../services/NotesService.js";

export class TaskController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .get('', this.getTasks)
      // 🔽 AUTHENTICATION REQUIRED BELOW 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTask)
      .delete('/:taskId', this.deleteTask)
      .put('/:taskId', this.updateTask)
  }

  // SECTION 🔽 REQUIRES AUTHENTICATION 🔽

  async getTasks(req, res, nxt) {
    try {
      const projects = await taskService.getTasks(req.query);
      res.send(projects)
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

  async createTask(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id;
      const newTask = await taskService.createTask(req.body);
      res.send(newTask)
    }
    catch (error) { nxt(error) }
  }

  async deleteTask(req, res, nxt) {
    try {
      const deleted = await taskService.deleteTask(req.userInfo.id, req.params.taskId);
      res.send(deleted)
    }
    catch (error) { nxt(error) }
  }

  async updateTask(req, res, nxt) {
    try {
      const updatedTask = await taskService.updateTask(req.userInfo.id, req.params.taskId, req.body);
      res.send(updatedTask)
    }
    catch (error) { nxt(error) }
  }

}