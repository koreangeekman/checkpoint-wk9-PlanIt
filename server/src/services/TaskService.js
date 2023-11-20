import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class TaskService {

  async getTasksByProjectId(projectId) {
    const notes = await dbContext.Tasks.find({ projectId })
      .populate('creator', 'name picture')
      .populate('project')
      .populate('sprint');
    return notes
  }

  async createTask(taskData) {
    const newTask = await dbContext.Tasks.create(taskData);
    await newTask.populate('creator', 'name picture');
    return newTask
  }

  async deleteTask(creatorId, _id) {
    const task = await dbContext.Tasks.findOne({ creatorId, _id });
    if (!task) { throw new BadRequest('Cannot find the specified task with your ID') }
    await task.delete();
    return task
  }

}

export const taskService = new TaskService();