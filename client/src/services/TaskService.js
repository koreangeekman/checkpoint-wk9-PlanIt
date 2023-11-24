import { AppState } from "../AppState.js";
import { Task } from "../models/Task.js";
import { api } from "./AxiosService.js";

class TaskService {

  async getTasks() {
    const res = await api.get('api/tasks');
    AppState.tasks = res.data.map(task => new Task(task));
  }

  async createTask(taskData) {
    const res = await api.post('api/tasks/', taskData);
    AppState.tasks.push(new Task(res.data));
  }

  async deleteTask(taskId) {
    const res = await api.delete('api/tasks/' + taskId);
    AppState.tasks = AppState.tasks.filter(task => task.id != taskId);
  }

  async completeTask(taskObj) {
    const res = await api.put('api/tasks/' + taskObj.id, { isCompleted: true });
    taskObj.isCompleted = true;
  }

}

export const taskService = new TaskService();