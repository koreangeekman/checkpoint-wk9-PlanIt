import { AppState } from "../AppState.js";
import { Project } from "../models/Project.js";
import { Sprint } from "../models/Sprint.js";
import { Task } from "../models/Task.js";
import { Note } from "../models/Note.js";
import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger.js";

class ProjectService {

  async getProjectsByAccountId() {
    const res = await api.get('api/projects/account');
    AppState.projects = res.data.map(proj => new Project(proj));
  }

  async getProjectById(projectId) {
    const res = await api.get('api/projects/' + projectId);
    AppState.activeProject = new Project(res.data);
  }

  async getSprintsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints');
    AppState.sprints = res.data.map(sprint => new Sprint(sprint));
  }

  async getTasksByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/tasks');
    AppState.tasks = res.data.map(task => new Task(task));
  }

  async getNotesByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/notes');
    AppState.notes = res.data.map(note => new Note(note));
  }

  async createProject(projectObj) {
    const res = await api.post('api/projects/', projectObj);
    AppState.activeProject = new Project(res.data);
  }

  async updateProject(projectObj) {
    const res = await api.put('api/projects/' + projectObj.id, projectObj);
    AppState.activeProject = new Project(res.data);
  }

  async deleteProject() {
    const res = await api.delete('api/projects/' + AppState.activeProject.id,);
    logger.log('Project deleted.', res.data);
  }


  async setActiveProject(projectObj) {
    AppState.activeProject = projectObj;
    await this.getProjectById(projectObj.id);
  }

}

export const projectService = new ProjectService();