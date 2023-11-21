import { AppState } from "../AppState.js";
import { Project } from "../models/Project.js";
import { api } from "./AxiosService.js";

class ProjectService {

  async getProjectsByAccountId() {
    const res = await api.get('api/projects/account')
    AppState.projects = res.data.map(proj => new Project(proj))
  }

  async getProjectById(projectId) {
    const res = await api.get('api/projects/' + projectId)
    AppState.activeProject = new Project(res.data)
  }


  async setActiveProject(projectObj) {
    AppState.activeProject = projectObj;
    await this.getProjectById(projectObj.id);
  }

}

export const projectService = new ProjectService();