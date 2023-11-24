import { AppState } from "../AppState.js";
import { Sprint } from "../models/Sprint.js";
import { api } from "./AxiosService.js";

class SprintService {

  async getSprints() {
    const res = await api.get('api/sprints');
    AppState.sprints = res.data.map(sprint => new Sprint(sprint));
  }

  async createSprint(sprintData) {
    const res = await api.post('api/sprints', sprintData);
    AppState.sprints.push(new Sprint(res.data));
  }

}

export const sprintService = new SprintService();