import { AppState } from "../AppState.js";
import { Task } from "../models/Task.js";
import { api } from "./AxiosService.js";

class TaskService {

  async getTasks() {
    const res = await api.get('api/tasks');
    AppState.tasks = res.data.map(task => new Task(task));
  }

  async createTask(taskData) {
    const res = await api.post('api/tasks', taskData);
    AppState.tasks.push(new Task(res.data));
  }

}

export const taskService = new TaskService();