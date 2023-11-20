import { AppState } from "../AppState.js";
import { Project } from "../models/Project.js";
import { api } from "./AxiosService.js";

class ProjectService {

  async getProjectsByAccountId() {
    const res = await api.get('api/projects')
    AppState.projects = res.data.map(proj => new Project(proj))
  }

}

export const projectService = new ProjectService();