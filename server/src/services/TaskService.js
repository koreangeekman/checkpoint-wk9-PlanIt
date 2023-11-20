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

  async createTaskWithProjectId(taskData) {
    const newTask = await dbContext.Tasks.create(taskData);
    await newTask.populate('creator', 'name picture');
    await newTask.populate('project');
    await newTask.populate('sprint');
    return newTask
  }

  async deleteTaskWithProjectId(creatorId, projectId, _id) {
    const task = await dbContext.Tasks.findOne({ creatorId, projectId, _id });
    if (!task) { throw new BadRequest('Cannot find the specified task with your ID') }
    await task.delete();
    return task
  }

}

export const taskService = new TaskService();